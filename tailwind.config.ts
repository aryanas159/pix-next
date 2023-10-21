import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  important: "#root",
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'white': '#fff',
      'blue': '#1fb6ff',
      'purple': '#42113C',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#202020 ',
      'gray': '#8492a6',
      'gray-light': '#eeeeee',
      'black': '#000',
      'red': "#ff0000",
      'color-1': "#04364A",
      'color-2': "#176B87",
      'color-3': "#64CCC5",
      'color-4': "#DAFFFB",
      'light': '#2A4494',
      'dark': '#022F40',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
      Poppins: ['Poppins', 'sans-serif'],
      Roboto: ['Roboto', 'sans-serif'],
      AROneSans: ['AR One Sans', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
export default config
