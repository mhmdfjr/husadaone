import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'basic-black': '#0A181F',
        'basic-white': '#FAFAFA',
        'brand-base': '#2F7BFE',
        'brand-10': '#D5E5FF',
        'brand-20': '#BAD3FF',
        'brand-30': '#97BDFE',
        'brand-40': '#74A7FE',
        'brand-50': '#5291FE',
        'brand-60': '#2767D4',
        'brand-70': '#1F52A9',
        'brand-80': '#183E7F',
        'brand-90': '#102955',
        'brand-100': '#091933',
        'gray-medium': '#676C6F',
        'gray-medium-light': '#BFC3C4',
        'gray-light': '#E9EBED',
        'gray-super-light': '#F4F5F6',
        'alert-success': '#3BCE89',
        'alert-warning': '#FF950A',
        'alert-danger': '#E90C1B',
        'alert-info': '#2092E9'
    },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
