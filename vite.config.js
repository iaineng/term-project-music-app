import { defineConfig } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import { join } from 'path'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    vuePlugin({
      reactivityTransform: true,
    }),
    UnoCSS()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: id => {
          if (id.includes('node_modules/vant')) {
            return 'vant'
          }
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
})