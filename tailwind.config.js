/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Custom honey palette — see CLAUDE.md § 7
      colors: {
        honey: {
          50: '#FDF6E5',
          100: '#FBEBC4',
          300: '#F1C770',
          500: '#E8A93C',
          700: '#B8791F',
          900: '#7A4D10',
        },
        cream: {
          50: '#FBF5E9',
          100: '#F4E8D0',
          200: '#E8D7B0',
        },
        wax: {
          500: '#A57848',
          800: '#7A5230',
          900: '#2B1F12',
        },
        leaf: {
          500: '#6B8E4E',
          700: '#4F6B39',
        },
      },
      fontFamily: {
        // Loaded via Google Fonts in index.html
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      maxWidth: {
        prose: '65ch',
      },
    },
  },
  plugins: [],
};
