import { defineConfig } from '@vue/cli-service';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  transpileDependencies: true,
  plugins: [vue()]
}); 