/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#98C1D9', //dark sky blue
          secondary: '#F5CAC3',//Bdazzled Blue
          accent: '#EE6C4D', //Burnt Sienna
          neutral: '#F7EDE2', //lilen
          "base-100": '#F7F3F7',
          info: '#F6BD60', //maximum yellow red
          success: '#0D6E52',
          warning: '#E7A223',
          error: '#E03829',
        },
      }
    ]
  },

  theme: {
    extend: {
    },
  },
  plugins: [require("daisyui")],
}
