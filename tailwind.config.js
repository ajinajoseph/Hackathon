export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        secondary: '#0F172A',
        accent: '#14B8A6',
        surface: '#F8FAFC',
      },
      boxShadow: {
        soft: '0 15px 35px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
