import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../TodoItem';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'Test Todo',
    completed: false
  };
  
  const mockToggle = vi.fn();
  const mockDelete = vi.fn();

  it('renders the todo item correctly', () => {
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('renders completed todo with line-through style', () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(<TodoItem todo={completedTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    expect(screen.getByText('Test Todo')).toHaveClass('line-through');
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('calls onToggle when checkbox is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    await user.click(screen.getByRole('checkbox'));
    expect(mockToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    render(<TodoItem todo={mockTodo} onToggle={mockToggle} onDelete={mockDelete} />);
    
    await user.click(screen.getByLabelText('Delete task'));
    expect(mockDelete).toHaveBeenCalledWith(mockTodo.id);
  });
});