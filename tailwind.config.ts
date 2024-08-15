import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(var(--primary))',
        'primary-content': 'rgba(var(--primary-content))',
        'primary-dark': 'rgba(var(--primary-dark))',
        'primary-light': 'rgba(var(--primary-light))',

        secondary: 'rgba(var(--secondary))',
        'secondary-content': 'rgba(var(--secondary-content))',
        'secondary-dark': 'rgba(var(--secondary-dark))',
        'secondary-light': 'rgba(var(--secondary-light))',

        background: 'rgba(var(--background))',
        foreground: 'rgba(var(--foreground))',
        border: 'rgba(var(--border))',

        copy: 'rgba(var(--copy))',
        'copy-light': 'rgba(var(--copy-light))',
        'copy-lighter': 'rgba(var(--copy-lighter))',

        success: 'rgba(var(--success))',
        warning: 'rgba(var(--warning))',
        error: 'rgba(var(--error))',
        'success-content': 'rgba(var(--success-content))',
        'warning-content': 'rgba(var(--warning-content))',
        'error-content': 'rgba(var(--error-content))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
export default config
