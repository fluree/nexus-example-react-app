import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // proxy: {
    //   '/query': {
    //     target: 'https://data.flur.ee/fluree',
    //     changeOrigin: true,
    //   },
    //   '/transact': {
    //     target: 'https://data.flur.ee/fluree',
    //     changeOrigin: true,
    //   },
    // },
  },
});
