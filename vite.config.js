// ============================================================
// AKA BMW ISGM — VITE CONFIGURATION
// Sprint 4: Build Optimization & PWA
// ============================================================

import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { visualizer } from 'vite-bundle-visualizer';

export default defineConfig({
  plugins: [
    basicSsl(),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],

  server: {
    port: 3000,
    https: true,
    open: true,
    host: '0.0.0.0',
    cors: true,
    hmr: {
      overlay: true
    }
  },

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      input: {
        main: 'index.html'
      },
      output: {
        manualChunks: {
          vendor: [
            'chart.js',
            'firebase/app',
            'firebase/auth',
            'firebase/firestore'
          ]
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    chunkSizeWarningLimit: 1000,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug', 'console.info']
      },
      mangle: {
        toplevel: true
      }
    }
  },

  resolve: {
    alias: {
      '@': '/src',
      '@components': '/js/components',
      '@services': '/js/services',
      '@utils': '/js/utils'
    }
  },

  optimizeDeps: {
    include: [
      'chart.js',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ],
    exclude: []
  },

  css: {
    devSourcemap: true,
    modules: {
      localsConvention: 'camelCase'
    }
  },

  define: {
    __APP_VERSION__: JSON.stringify('5.0.0'),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString())
  },

  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : []
  }
});