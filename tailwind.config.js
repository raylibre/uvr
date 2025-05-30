/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B2C',
          dark: '#E55A1F',
          light: '#FF8B5A'
        },
        secondary: '#1A1A1A',
        gray: {
          100: '#F8F8F8',
          200: '#E9E9E9',
          300: '#DADADA',
          400: '#B7B7B7',
          500: '#949494',
          600: '#717171',
          700: '#4E4E4E',
          800: '#2B2B2B',
          900: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'display-1': ['3.5rem', { lineHeight: '1.2' }],
        'display-2': ['3rem', { lineHeight: '1.2' }],
        'h1': ['2.5rem', { lineHeight: '1.3' }],
        'h2': ['2rem', { lineHeight: '1.35' }],
        'h3': ['1.75rem', { lineHeight: '1.4' }],
        'h4': ['1.5rem', { lineHeight: '1.45' }],
        'h5': ['1.25rem', { lineHeight: '1.5' }],
        'h6': ['1rem', { lineHeight: '1.55' }]
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem'
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      },
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
}; 