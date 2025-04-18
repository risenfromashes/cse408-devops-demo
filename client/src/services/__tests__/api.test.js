import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios');

// Mock the mockApi module
vi.mock('../mockApi', () => ({
  fetchTodos: vi.fn(),
  addTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn()
}));

// Import the mocked module
import * as mockApi from '../mockApi';

// Create a clean testing environment
describe('API Service', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });
  
  describe('when using mock API', () => {
    beforeEach(() => {
      // Set environment to use mock API
      vi.stubEnv('VITE_USE_MOCK_API', 'true');
      vi.stubEnv('MODE', 'development');
      
      // Setup return values for mocked functions
      mockApi.fetchTodos.mockResolvedValue([{ id: '1', title: 'Test', completed: false }]);
      mockApi.addTodo.mockResolvedValue({ id: '2', title: 'New Todo', completed: false });
      mockApi.updateTodo.mockResolvedValue({ id: '1', title: 'Updated', completed: true });
      mockApi.deleteTodo.mockResolvedValue({ success: true });
    });
    
    afterEach(() => {
      vi.unstubAllEnvs();
    });
    
    it('uses mockApi for data operations', async () => {
      // Import the API module after environment setup
      const { default: api } = await import('../api');
      
      // Test fetchTodos
      await api.fetchTodos();
      expect(mockApi.fetchTodos).toHaveBeenCalled();
      
      // Test addTodo
      const newTodo = { title: 'New Todo', completed: false };
      await api.addTodo(newTodo);
      expect(mockApi.addTodo).toHaveBeenCalledWith(newTodo);
      
      // Test updateTodo
      await api.updateTodo('1', { title: 'Updated', completed: true });
      expect(mockApi.updateTodo).toHaveBeenCalledWith('1', { title: 'Updated', completed: true });
      
      // Test deleteTodo
      await api.deleteTodo('1');
      expect(mockApi.deleteTodo).toHaveBeenCalledWith('1');
      
      // Axios should not be called
      expect(axios.get).not.toHaveBeenCalled();
      expect(axios.post).not.toHaveBeenCalled();
      expect(axios.put).not.toHaveBeenCalled();
      expect(axios.delete).not.toHaveBeenCalled();
    });
  });
  
  describe('when using real API', () => {
    const API_URL = 'http://localhost:5000/api/todos';
    
    beforeEach(() => {
      // Set environment to use real API
      vi.stubEnv('VITE_USE_MOCK_API', 'false');
      vi.stubEnv('VITE_API_URL', API_URL);
      
      // Mock axios responses
      axios.get.mockResolvedValue({ data: [{ id: 1, title: 'Test', completed: false }] });
      axios.post.mockResolvedValue({ data: { id: 1, title: 'New Todo', completed: false } });
      axios.put.mockResolvedValue({ data: { id: 1, title: 'Updated', completed: true } });
      axios.delete.mockResolvedValue({ data: { success: true } });
    });
    
    afterEach(() => {
      vi.unstubAllEnvs();
    });
    
    it('uses axios for data operations', async () => {
      // Import the API module after environment setup
      const { default: api } = await import('../api');
      
      // Test fetchTodos
      await api.fetchTodos();
      expect(axios.get).toHaveBeenCalledWith(API_URL);
      
      // Test addTodo
      const newTodo = { title: 'New Todo', completed: false };
      await api.addTodo(newTodo);
      expect(axios.post).toHaveBeenCalledWith(API_URL, newTodo);
      
      // Test updateTodo
      await api.updateTodo(1, { title: 'Updated', completed: true });
      expect(axios.put).toHaveBeenCalledWith(`${API_URL}/1`, { title: 'Updated', completed: true });
      
      // Test deleteTodo
      await api.deleteTodo(1);
      expect(axios.delete).toHaveBeenCalledWith(`${API_URL}/1`);
    });
  });
});