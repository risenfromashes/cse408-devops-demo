import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

// Create the context
const TodoContext = createContext(null);

// Provider component that wraps the app and makes todo data available
export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const data = await api.fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(err.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todo) => {
    try {
      const newTodo = await api.addTodo(todo);
      setTodos((prev) => [...prev, newTodo]);
      return newTodo;
    } catch (err) {
      console.error('Error adding todo:', err);
      setError(err.message || 'Failed to add todo');
      throw err;
    }
  };

  const toggleTodo = async (id) => {
    try {
      const todoToUpdate = todos.find(todo => todo.id === id);
      if (!todoToUpdate) return;
      
      const updatedTodo = await api.updateTodo(id, {
        ...todoToUpdate,
        completed: !todoToUpdate.completed
      });
      
      setTodos(prev => 
        prev.map(todo => todo.id === id ? updatedTodo : todo)
      );
      
      return updatedTodo;
    } catch (err) {
      console.error('Error toggling todo:', err);
      setError(err.message || 'Failed to update todo');
      throw err;
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setError(err.message || 'Failed to delete todo');
      throw err;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const value = {
    todos,
    loading,
    error,
    addTodo,
    toggleTodo,
    deleteTodo,
    refetch: fetchTodos
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

// Custom hook to use the todo context
export function useTodos() {
  const context = useContext(TodoContext);
  if (context === null) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}