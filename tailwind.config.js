/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'shake-light': 'shake-light 0.15s ease-in-out',
        'shake-heavy': 'shake-heavy 0.4s ease-in-out',
        'score-pop': 'score-pop 0.5s ease-out forwards',
        'heart-explode': 'heart-explode 0.4s ease-in forwards',
        'heart-pop-in': 'heart-pop-in 0.3s cubic-bezier(0.34,1.56,0.64,1)',
        'timer-pulse': 'timer-pulse 0.5s ease-in-out infinite',
        'combo-bounce': 'combo-bounce 0.2s ease-in-out',
        'combo-rotate': 'combo-rotate 0.3s ease-in-out',
        'title-explode': 'title-explode 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'banner-slide-in': 'banner-slide-in 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
