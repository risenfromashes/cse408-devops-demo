import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../TodoList';
import { useTodos } from '../../context/TodoContext';

// Mock the TodoContext hook
vi.mock('../../context/TodoContext', () => ({
  useTodos: vi.fn()
}));

describe('TodoList', () => {
  it('displays loading state correctly', () => {
    useTodos.mockReturnValue({
      todos: [],
      loading: true,
      error: null,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn()
    });
    
    render(<TodoList />);
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });
  
  it('displays error state correctly', () => {
    const errorMessage = 'Failed to fetch todos';
    useTodos.mockReturnValue({
      todos: [],
      loading: false,
      error: errorMessage,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn()
    });
    
    render(<TodoList />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
  
  it('displays empty state correctly', () => {
    useTodos.mockReturnValue({
      todos: [],
      loading: false,
      error: null,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn()
    });
    
    render(<TodoList />);
    expect(screen.getByText(/you have no tasks yet/i)).toBeInTheDocument();
  });
  
  it('renders todo items when todos exist', () => {
    const mockTodos = [
      { id: '1', title: 'Task 1', completed: false },
      { id: '2', title: 'Task 2', completed: true }
    ];
    
    useTodos.mockReturnValue({
      todos: mockTodos,
      loading: false,
      error: null,
      toggleTodo: vi.fn(),
      deleteTodo: vi.fn()
    });
    
    render(<TodoList />);
    
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
});