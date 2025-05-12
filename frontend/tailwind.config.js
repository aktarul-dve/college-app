/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary : '#ffff',
        ban_bg : '#002147',
        secondary: {
          100:'#8d98ff',
          200: '#636bff',
        }
      },
      fontFamily: {
        solaiman: ['SolaimanLipi', 'sans-serif'], // Regular font
       
      },
      
    },
  },
  plugins: [],
};
