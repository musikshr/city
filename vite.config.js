import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  // plugins: [react()],
  build: {
    outDir: 'dist',
  },
  plugins: [
    react(),
    createHtmlPlugin({
      inject: {
        data: {
          injectScript: `
            <script>
              const redirect = sessionStorage.redirect;
              delete sessionStorage.redirect;
              if (redirect && redirect !== location.pathname) {
                history.replaceState(null, null, redirect);
              }
            </script>
          `
        }
      }
    })
  ]
})
