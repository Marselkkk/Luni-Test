import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
      routeFileIgnorePrefix: '-',
      quoteStyle: 'double',
    }),
  ],
  server: {
    port: 3002,
    proxy: {
      '/api': {
        target: 'http://localhost:8082',
        changeOrigin: true,
        ws: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          tanstack: ['@tanstack/react-query', '@tanstack/react-router', '@tanstack/store'],
          telegram: ['@telegram-apps/sdk-react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': '/src',
      '@app': '/src/app',
      '@pages': '/src/pages',
      '@features': '/src/features',
      '@entities': '/src/entities',
      '@shared': '/src/shared',
    },
  },
  css: {
    postcss: './postcss.config.js',
  },
})
