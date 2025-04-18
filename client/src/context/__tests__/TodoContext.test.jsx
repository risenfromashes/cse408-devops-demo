import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { TodoProvider, useTodos } from '../TodoContext';
import api from '../../services/api';

// Create a test component that uses the TodoContext
const TestComponent = () => {
  const { todos, loading, error, addTodo, toggleTodo, deleteTodo } = useTodos();
  
  return (
    <div>
      {loading && <p data-testid="loading-indicator">Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {todos.map(todo => (
          <li key={todo.id} data-testid={`todo-${todo.id}`}>
            <span>{todo.title}</span>
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              data-testid={`toggle-${todo.id}`}
            />
            <button onClick={() => deleteTodo(todo.id)} data-testid={`delete-${todo.id}`}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={() => addTodo({ title: 'New Todo', completed: false })} data-testid="add-todo">
        Add Todo
      </button>
    </div>
  );
};

// Mock the API
vi.mock('../../services/api', () => ({
  default: {
    fetchTodos: vi.fn(),
    addTodo: vi.fn(),
    updateTodo: vi.fn(),
    deleteTodo: vi.fn()
  }
}));

describe('TodoContext', () => {
  const mockTodos = [
    { id: '1', title: 'Test Todo 1', completed: false },
    { id: '2', title: 'Test Todo 2', completed: true }
  ];
  
  beforeEach(() => {
    vi.resetAllMocks();
  });
  
  it('fetches and displays todos on initial load', async () => {
    // Create a promise that we can resolve manually to control the API timing
    let resolveFetchTodos;
    const fetchTodosPromise = new Promise(resolve => {
      resolveFetchTodos = () => resolve(mockTodos);
    });
    
    api.fetchTodos.mockReturnValue(fetchTodosPromise);
    
    render(
      <TodoProvider>
        <TestComponent />
      </TodoProvider>
    );
    
    // Check for loading state before resolving the fetch
    expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
    
    // Now resolve the fetch and wait for the todos to appear
    await act(async () => {
      resolveFetchTodos();
    });
    
    // After data loads, should show todos
    await waitFor(() => {
      expect(screen.getByTestId('todo-1')).toBeInTheDocument();
      expect(screen.getByTestId('todo-2')).toBeInTheDocument();
    });
    
    expect(api.fetchTodos).toHaveBeenCalledTimes(1);
  });
  
  it('handles error state correctly', async () => {
    const errorMsg = 'Failed to fetch';
    api.fetchTodos.mockRejectedValue(new Error(errorMsg));
    
    await act(async () => {
      render(
        <TodoProvider>
          <TestComponent />
        </TodoProvider>
      );
    });
    
    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMsg}`)).toBeInTheDocument();
    });
  });
  
  it('adds a new todo', async () => {
    const newTodo = { id: '3', title: 'New Todo', completed: false };
    api.fetchTodos.mockResolvedValue(mockTodos);
    api.addTodo.mockResolvedValue(newTodo);
    
    await act(async () => {
      render(
        <TodoProvider>
          <TestComponent />
        </TodoProvider>
      );
    });
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
    
    await act(async () => {
      screen.getByTestId('add-todo').click();
    });
    
    expect(api.addTodo).toHaveBeenCalledWith({ title: 'New Todo', completed: false });
    
    await waitFor(() => {
      expect(screen.getByTestId('todo-3')).toBeInTheDocument();
    });
  });
  
  it('toggles a todo', async () => {
    api.fetchTodos.mockResolvedValue(mockTodos);
    api.updateTodo.mockResolvedValue({ ...mockTodos[0], completed: true });
    
    await act(async () => {
      render(
        <TodoProvider>
          <TestComponent />
        </TodoProvider>
      );
    });
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
    
    await act(async () => {
      screen.getByTestId('toggle-1').click();
    });
    
    expect(api.updateTodo).toHaveBeenCalledWith('1', { 
      ...mockTodos[0], 
      completed: true 
    });
  });
  
  it('deletes a todo', async () => {
    api.fetchTodos.mockResolvedValue(mockTodos);
    api.deleteTodo.mockResolvedValue({ success: true });
    
    await act(async () => {
      render(
        <TodoProvider>
          <TestComponent />
        </TodoProvider>
      );
    });
    
    await waitFor(() => {
      expect(screen.queryByTestId('loading-indicator')).not.toBeInTheDocument();
    });
    
    await act(async () => {
      screen.getByTestId('delete-1').click();
    });
    
    expect(api.deleteTodo).toHaveBeenCalledWith('1');
    
    await waitFor(() => {
      expect(screen.queryByTestId('todo-1')).not.toBeInTheDocument();
    });
  });
});