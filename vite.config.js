import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { format } from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.jsx'),
      name: "tone-hunter",
      fileName: (format) => `tone-hunter.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom' : 'ReactDOM',
        },
      },
    },
  },
})
