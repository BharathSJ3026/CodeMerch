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
        // Modern retro palette - warm, bold, no purple
        cream: '#F5F0E8',
        charcoal: '#1A1A1A',
        coal: '#0D0D0D',
        rust: '#D4552A',
        mustard: '#E8B84A',
        sage: '#7A8B6E',
        sand: '#C4B6A0',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        body: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        'giant': 'clamp(4rem, 15vw, 12rem)',
        'huge': 'clamp(3rem, 10vw, 8rem)',
        'large': 'clamp(2rem, 5vw, 4rem)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'md': '4px',
      },
      transitionTimingFunction: {
        'retro': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
export default config
