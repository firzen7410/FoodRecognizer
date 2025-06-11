import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 讓所有設備都能訪問
    port: 5000        // 你要開的 port，預設是 3000
  }
})
