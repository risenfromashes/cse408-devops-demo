import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useTodos } from '../context/TodoContext';

const TodoForm = () => {
  const [title, setTitle] = useState('');
  const { addTodo } = useTodos();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        await addTodo({ title, completed: false });
        setTitle('');
      } catch (error) {
        console.error('Failed to add todo:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 bg-white rounded-lg shadow-sm p-2 border border-gray-200">
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-grow px-3 py-2 border-none focus:outline-none focus:ring-0"
        required
      />
      
      <button 
        type="submit" 
        className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 flex items-center justify-center"
        aria-label="Add task"
      >
        <FaPlus className="w-4 h-4" />
      </button>
    </form>
  );
};

export default TodoForm;