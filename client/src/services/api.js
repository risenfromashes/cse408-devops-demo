import axios from 'axios';
import * as mockApi from './mockApi';

// By default, use mock API for local development unless explicitly set to false
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false' && import.meta.env.MODE === 'development';

console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
// API base URL handling
let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/todos';


// Log which API mode is being used and the API URL for debugging
console.log(`Using ${USE_MOCK_API ? 'mock' : 'real'} API`);
console.log(`API URL: ${API_URL}`);

// Real API implementation using axios
const realApi = {
    fetchTodos: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    addTodo: async (todo) => {
        const response = await axios.post(API_URL, todo);
        return response.data;
    },

    updateTodo: async (id, updatedTodo) => {
        const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
        return response.data;
    },

    deleteTodo: async (id) => {
        await axios.delete(`${API_URL}/${id}`);
        return { success: true };
    }
};

// Export either mock or real API based on environment
const api = USE_MOCK_API ? mockApi : realApi;
export default api;