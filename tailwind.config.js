/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#071520',
          900: '#0B2233',
          800: '#12314A', // Cor principal Deep Navy
          700: '#1A4363',
          600: '#23577F',
          50: '#F0F5F9',
        },
        petroleum: {
          DEFAULT: '#176B7A', // Azul-petróleo
          hover: '#135865',
          light: '#23899B',
          50: '#F0F9FA',
          100: '#DDF3F5',
        },
        sage: {
          DEFAULT: '#55A89B', // Verde suave
          hover: '#458F83',
          light: '#72BCB1',
          50: '#F2FAF8',
          100: '#E0F3F0',
        },
        medical: {
          bg: '#F5F7F8', // Cinza muito claro
          card: '#FFFFFF',
          textMuted: '#475569',
          textDark: '#1E293B',
          border: '#E2E8F0',
          whatsapp: '#25D366',
          whatsappDark: '#1EBE5D'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 49, 74, 0.06)',
        'card': '0 10px 30px -5px rgba(18, 49, 74, 0.08)',
        'card-hover': '0 20px 40px -10px rgba(18, 49, 74, 0.12)',
        'glow-teal': '0 0 25px rgba(23, 107, 122, 0.35)',
        'glow-whatsapp': '0 0 20px rgba(37, 211, 102, 0.4)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
