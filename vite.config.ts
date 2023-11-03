import { defineConfig, UserConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(<UserConfig>{
  base: process.env.NODE_ENV === 'production' ? './' : '/',
  plugins: [vue(), eslint(), tailwindcss, autoprefixer, tsconfigPaths(), splitVendorChunkPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            if (id.includes("handsontable" || id.includes('@handsontable/vue3'))) {
              return "handsontable"
            }
            return "vendor"
          }
        }
      }
    }
  },
  server: {
  strictPort: true,
  hmr: {
    clientPort: 5173
  }
}
})
