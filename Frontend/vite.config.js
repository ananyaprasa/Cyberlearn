import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    allowedHosts: [
      'streamless-taren-unsoothingly.ngrok-free.dev',
      'unreversed-frecklier-guy.ngrok-free.dev',
    ],
  },

  build: {
    // Warn only above 600 kB (post-split chunks should stay well under this)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks(id) {
          // ── React core ──────────────────────────────────────────
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'react-core';
          }

          // ── React Router ────────────────────────────────────────
          if (id.includes('node_modules/react-router') ||
              id.includes('node_modules/@remix-run/')) {
            return 'react-router';
          }

          // ── Shader / WebGL (heaviest dep — isolated for caching) ─
          if (id.includes('node_modules/@shadergradient/') ||
              id.includes('node_modules/shadergradient/') ||
              id.includes('node_modules/three/') ||
              id.includes('node_modules/@react-three/')) {
            return 'shader-vendor';
          }

          // ── Google OAuth ────────────────────────────────────────
          if (id.includes('node_modules/@react-oauth/') ||
              id.includes('node_modules/oauth')) {
            return 'auth-vendor';
          }

          // ── Animation / scroll utilities ────────────────────────
          if (id.includes('node_modules/gsap/') ||
              id.includes('node_modules/lenis/') ||
              id.includes('node_modules/canvas-confetti/')) {
            return 'animation-vendor';
          }

          // ── HTTP client ─────────────────────────────────────────
          if (id.includes('node_modules/axios/')) {
            return 'http-vendor';
          }
        },
      },
    },
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
