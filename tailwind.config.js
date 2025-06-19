module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['SF Pro', 'Inter', 'system-ui', 'sans-serif'],
        display: ['SF Pro Display', 'Lexend', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        // Add custom tracking values if needed
        wider: '0.075em',
        widest: '0.15em',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
