// Mock data service to simulate backend functionality
let mockTodos = [
  {
    id: '1',
    title: 'Complete project documentation',
    completed: false
  },
  {
    id: '2',
    title: 'Review pull requests',
    completed: true
  },
  {
    id: '3',
    title: 'Prepare presentation slides',
    completed: false
  }
];

// Helper to simulate network delay
const delay = (ms = 50) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchTodos = async () => {
  await delay();
  return [...mockTodos];
};

export const addTodo = async (todo) => {
  await delay();
  const newTodo = {
    ...todo,
    id: Date.now().toString()
  };
  mockTodos = [...mockTodos, newTodo];
  return newTodo;
};

export const updateTodo = async (id, updatedTodo) => {
  await delay();
  mockTodos = mockTodos.map(todo => 
    todo.id === id ? { ...todo, ...updatedTodo } : todo
  );
  return mockTodos.find(todo => todo.id === id);
};

export const deleteTodo = async (id) => {
  await delay();
  mockTodos = mockTodos.filter(todo => todo.id !== id);
  return { success: true };
};