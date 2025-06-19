import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          'bg-primary': '#111827',
          'bg-secondary': '#1F2937',
          'text-primary': '#F9FAFB',
          'text-secondary': '#D1D5DB',
          'border': '#374151',
          'accent': '#3B82F6',
          'accent-hover': '#2563EB',
        },
      },
    },
  },
  plugins: [],
}
export default config 