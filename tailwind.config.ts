import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        carbon: {
          opportunity: '#22c55e',
          risk: '#ef4444',
          mixed: '#f59e0b',
          stable: '#6b7280',
        },
      },
    },
  },
  plugins: [],
}
export default config
