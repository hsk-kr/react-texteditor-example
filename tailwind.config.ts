import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#14213d',
        secondary: '#fca311',
        tertiary: '#e5e5e5',
      },
      height: {
        screenUI: '100svh',
      },
    },
  },
  plugins: [],
};
export default config;
