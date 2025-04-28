import React from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';
import { FaGithub } from 'react-icons/fa';

const App = () => {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10">
        <div className="container mx-auto max-w-2xl px-4 relative">
          {/* GitHub logo positioned at top right */}
          <div className="absolute top-0 right-0">
            <a 
              href="https://github.com/risenfromashes/cse408-devops-demo-project.git" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block text-gray-600 hover:text-blue-500 transition-colors"
              aria-label="GitHub Repository"
            >
              <FaGithub size={24} />
            </a>
          </div>

          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Task Manager for Everyone
            </span>
          </h1>
          
          <TodoForm />
          <TodoList />
          
          <div className="text-center mt-8 text-xs text-gray-500">
            <p>A modern task management SOFTWARE!</p>
          </div>
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;