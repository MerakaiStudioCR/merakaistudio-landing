import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      include: [
        'src/domains/**/adapters/**',
        'src/shared/lib/*',
        'src/shared/api/lib/*',
        'src/components/ui/**/utils.ts',
        'src/components/ui/**/utils/*.ts'
      ],
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.ts',
        '**/types/**',
        '**/test/**',
        '**/e2e/**',
        'src/shared/lib/debug.ts'
      ],
      thresholds: {
        functions: 73,
        lines: 74,
        branches: 50,
        statements: 70
      }
    }
  }
})
