import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // 后端地址
        // target: 'http://localhost:5000', // 后端地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 保留 /api 前缀
      },
    },
  },
});
