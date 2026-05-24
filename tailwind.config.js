/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          serif: ['Georgia', 'Merriweather', 'serif'],
          sans: ['Inter', 'system-ui', 'sans-serif'],
        },
        colors: {
          background: '#0F0F11', // Deep near-black slate
          paper: '#16161A',      // Slightly lighter slate for editor elements
          accent: '#D4AF37',     // Soft gold
          faintText: 'rgba(243, 244, 246, 0.04)', // 4% opacity active text for vanished segments
        },
      },
    },
    plugins: [],
  }