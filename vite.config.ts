import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },

    plugins: [react()],

    optimizeDeps: {
      exclude: ['mapbox-gl'],
    },

    define: {
      'process.env.MEDUSA_BACKEND_URL': JSON.stringify(env.MEDUSA_BACKEND_URL),
      'process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY': JSON.stringify(env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY),
      'process.env.NEXT_PUBLIC_BASE_URL': JSON.stringify(env.NEXT_PUBLIC_BASE_URL),
    },

    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },

    build: {
      target: 'es2020', // ✅ FIXED HERE
      outDir: 'dist',
      sourcemap: mode !== 'production',
      minify: 'terser',

      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: true,
        },
      },

      commonjsOptions: {
        transformMixedEsModules: true,
      },

      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'query-vendor': ['@tanstack/react-query'],
            'medusa-vendor': ['@medusajs/js-sdk'],
          },

          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },

      chunkSizeWarningLimit: 1000,
    },
  };
});
