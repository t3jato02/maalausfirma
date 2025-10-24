import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['assets/favicon.ico'],
      manifest: {
        name: 'Teuvo Järvenpää Oy',
        short_name: 'TJ Oy',
        // Using relative URLs keeps PWA correct under GitHub Pages subpaths
        start_url: '.',
        scope: '.',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#2C5F8D',
        icons: [
          { src: 'assets/favicon.ico', sizes: '64x64 32x32 24x24 16x16', type: 'image/x-icon' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
        runtimeCaching: [
          {
            urlPattern: ({url}) => url.pathname.includes('/assets/'),
            handler: 'CacheFirst',
            options: {
              cacheName: 'assets-cache',
              expiration: { maxEntries: 200, maxAgeSeconds: 60 * 60 * 24 * 30 }
            }
          }
        ]
      }
    })
  ],
  server: { port: 5173 }
}))
