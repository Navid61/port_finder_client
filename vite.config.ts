import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "path"; // Change to use `import * as path`

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias '@' to the 'src' folder
    },
  },
});
