/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "sans-serif"],
    },
    extend: {
      //colors of project
      colors: {
        primary: "#05B6D3",
        secondary: "EF863E",
        tertiary: "#05D356",
      },
      backgroundImage: {
        'login-bg-img': "url('/src/assets/images/loginBG.png')",
        'signup-bg-img': "url('/src/assets/images/signupbg.jpg')",
      }
    },
  },
  plugins: [],
}

