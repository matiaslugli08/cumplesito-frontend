import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Performance optimizations
  build: {
    // Enable minification
    minify: 'esbuild',
    // Enable source maps for production debugging (optional)
    sourcemap: false,
    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Optimize dependencies
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'lucide': ['lucide-react'],
        },
      },
    },
  },
  // Server configuration
  server: {
    port: 3000,
    strictPort: true,
    open: true,
  },
  // Preview configuration
  preview: {
    port: 3000,
  },
});
