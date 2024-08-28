/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/App.js', './src/components/Home.jsx', './src/pages/Login.jsx', './src/pages/Home.jsx', './src/components/PhoneMockup.jsx', "./src/pages/AddLinks.jsx",'./src/components/PhoneMockup.jsx', "./src/pages/Profile.jsx", "./src/components/PhoneMockup.jsx","./src/pages/Preview.jsx",],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        Inter: ['Poppins', 'sans-serif'],
        sharpie: ['Sharpie', 'sans-serif'],
        telma: ['Telma', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'], // Add your font here
        tektur: ['Tektur', 'sans-serif'], // Add your font here
        Jakarta: ['Plus Jakarta Sans'],
        Instrument: ['Instrument Sans'] // Add your font here
      },
    },
    screens: {
      xs: '380px',
      sm: '540px',
      md: '720px',
      lg: '920px',
      xl: '1040px',
    },
    colors: {
      primary: '#633CFF',  // Primary color
      secondary: '#BEADFF',  // Secondary color
      tertiary: '#EFEBFF',  // Tertiary color
      dark: '#333333',  // Dark shade
      black: '#000000',  // Dark shade
      gray: {
        DEFAULT: '#737373',  // Main gray color
        light: '#D9D9D9',    // Light gray
        lighter: '#FAFAFA',  // Lighter gray
      },
      white: '#FFFFFF',  // White
      danger: '#FF3939',  // Danger color (for alerts, warnings, etc.)
    },
    boxShadow: {
      'custom-purple': '0px 0px 32px 0px #633CFF40',
    },

  },
}