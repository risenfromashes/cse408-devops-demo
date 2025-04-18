import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../TodoForm';
import { TodoProvider, useTodos } from '../../context/TodoContext';

// Mock the TodoContext
vi.mock('../../context/TodoContext', () => {
  const addTodo = vi.fn();
  return {
    useTodos: () => ({
      addTodo
    }),
    TodoProvider: ({ children }) => <div>{children}</div>
  };
});

describe('TodoForm', () => {
  let user;
  
  beforeEach(() => {
    user = userEvent.setup();
    // Reset mock function before each test
    useTodos().addTodo.mockReset();
  });
  
  it('renders the form correctly', () => {
    render(<TodoForm />);
    
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  
  it('updates input value when typing', async () => {
    render(<TodoForm />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    await user.type(input, 'New todo item');
    
    expect(input).toHaveValue('New todo item');
  });
  
  it('calls addTodo when form is submitted with non-empty input', async () => {
    render(<TodoForm />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    await user.type(input, 'New todo item');
    await user.click(screen.getByRole('button'));
    
    expect(useTodos().addTodo).toHaveBeenCalledWith({
      title: 'New todo item',
      completed: false
    });
    expect(input).toHaveValue(''); // Input should be cleared after submission
  });
  
  it('does not call addTodo when form is submitted with empty input', async () => {
    render(<TodoForm />);
    
    await user.click(screen.getByRole('button'));
    
    expect(useTodos().addTodo).not.toHaveBeenCalled();
  });
});