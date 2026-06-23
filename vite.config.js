import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // 상대 경로 빌드 — 정적 호스팅(루트/서브경로/사내 서버 등) 어디에 올려도 동작.
  base: './',
  plugins: [react()],
  server: {
    port: 5180,
    host: true,
    strictPort: true,
  },
})
