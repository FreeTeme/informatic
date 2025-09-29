import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  base: '/',
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  plugins: [
    basicSsl(), // SSL плагин
    // Правильное объявление кастомного плагина для HTML
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(
          /<head>/,
          `<head>
            <script type="module" src="/js/router.js"></script>`
        )
      }
    }
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
    open: true
  }
})