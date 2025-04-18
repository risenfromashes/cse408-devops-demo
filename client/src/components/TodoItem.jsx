import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="px-6 py-3 hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 min-w-0">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle && onToggle(todo.id)}
            className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
          />
          <div className="ml-3 flex-1 min-w-0">
            <p className={`text-base truncate ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
              {todo.title}
            </p>
          </div>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="ml-2 rounded-full p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
          aria-label="Delete task"
        >
          <FaRegTrashAlt className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;