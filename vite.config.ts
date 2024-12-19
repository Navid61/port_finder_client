import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the path module

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './src/setupTests.ts')], // Use path.resolve
  },
});