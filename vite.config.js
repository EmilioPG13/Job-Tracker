import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      context: 'globalThis',
      // Disable native optimizations
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
        tryCatchDeoptimization: false
      },
      // Use classic JS output
      output: {
        format: 'es',
        generatedCode: 'es2015'
      }
    },
    // Disable terser minification which may use native code
    minify: false
  }
})