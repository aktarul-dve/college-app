import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      '/api': {
        target: 'https://college-app-3.onrender.com', // আপনার ব্যাকএন্ড সার্ভারের ঠিকানা
        changeOrigin: true,
        secure: false,
      },
    },
  },

})
