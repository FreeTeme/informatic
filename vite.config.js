import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    port: 5173,
    open: true,
    // Для SPA роутинга
    historyApiFallback: true
  },
  plugins: [
    // Плагин для обработки HTML
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
  ]
})