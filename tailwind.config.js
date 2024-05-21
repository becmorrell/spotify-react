/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        fontFamily: {
            inter: ['Inter', 'sans-serif'],
           },
      extend: {          
           fontSize: {
            'h1': '48px',
            'h2': '36px',
            'h3': '30px',
            'h4': '24px',
            'h5': '20px',
            'h6': '16px',
          },
        }
    },
    plugins: [],
  }