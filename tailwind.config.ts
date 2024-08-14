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
        primary: 'rgb(var(--primary))',
        'primary-content': 'rgb(var(--primary-content))',
        'primary-dark': 'rgb(var(--primary-dark))',
        'primary-light': 'rgb(var(--primary-light))',

        secondary: 'rgb(var(--secondary))',
        'secondary-content': 'rgb(var(--secondary-content))',
        'secondary-dark': 'rgb(var(--secondary-dark))',
        'secondary-light': 'rgb(var(--secondary-light))',

        background: 'rgb(var(--background))',
        foreground: 'rgb(var(--foreground))',
        border: 'rgb(var(--border))',

        copy: 'rgb(var(--copy))',
        'copy-light': 'rgb(var(--copy-light))',
        'copy-lighter': 'rgb(var(--copy-lighter))',

        success: 'rgb(var(--success))',
        warning: 'rgb(var(--warning))',
        error: 'rgb(var(--error))',
        'success-content': 'rgb(var(--success-content))',
        'warning-content': 'rgb(var(--warning-content))',
        'error-content': 'rgb(var(--error-content))',
      },
    },
  },
  plugins: [],
}
export default config
