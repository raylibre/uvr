import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { VueMcp } from 'vite-plugin-vue-mcp'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueMcp()
  ],
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}); 