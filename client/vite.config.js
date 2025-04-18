import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  envPrefix: 'VITE_',
  server: { 
    port: 3000,
    open: true,
    host: '0.0.0.0', // This allows accessing the server from outside the container
  }
});