import React from 'react';
import TodoItem from './TodoItem';
import { useTodos } from '../context/TodoContext';
import { FaTasks } from 'react-icons/fa';

const TodoList = () => {
    const { todos, loading, error, toggleTodo, deleteTodo } = useTodos();

    return (
        <div className="bg-white rounded-lg shadow-md mt-4 overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-50 border-b">
                <FaTasks className="text-blue-500" />
                <h2 className="text-lg font-medium text-gray-800">Your Tasks</h2>
            </div>
            
            {loading ? (
                <div className="py-8 text-center text-gray-500">
                    <p>Loading tasks...</p>
                </div>
            ) : error ? (
                <div className="py-8 text-center text-red-500">
                    <p>{error}</p>
                </div>
            ) : todos.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                    <p>You have no tasks yet. Add one above to get started!</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {todos.map(todo => (
                        <TodoItem 
                            key={todo.id} 
                            todo={todo} 
                            onToggle={toggleTodo}
                            onDelete={deleteTodo} 
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodoList;