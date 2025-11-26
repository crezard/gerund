import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react()],
    define: {
      // Force API_KEY to be a string to prevent "process is not defined"
      'process.env.API_KEY': JSON.stringify(env.API_KEY || '')
    }
  };
});