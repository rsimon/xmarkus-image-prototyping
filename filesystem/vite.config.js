import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(({ command, mode }) => ({
  base: '',
  plugins: [],
  server: {
    open: '/'
  }
}));