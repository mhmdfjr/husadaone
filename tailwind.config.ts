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
      fontSize: {
        'h1': ['68px', { lineHeight: '120%', fontWeight: '500' }],
        'h1-bold': ['68px', { lineHeight: '120%', fontWeight: '700' }],
        'h2': ['58px', { lineHeight: '120%', fontWeight: '500' }],
        'h2-bold': ['58px', { lineHeight: '120%', fontWeight: '700' }],
        'h3': ['48px', { lineHeight: '120%', fontWeight: '500' }],
        'h3-bold': ['48px', { lineHeight: '120%', fontWeight: '700' }],
        'h4': ['40px', { lineHeight: '120%', fontWeight: '500' }],
        'h4-bold': ['40px', { lineHeight: '120%', fontWeight: '700' }],
        'h5': ['32px', { lineHeight: '120%', fontWeight: '500' }],
        'h5-bold': ['32px', { lineHeight: '120%', fontWeight: '700' }],
        'h6': ['28px', { lineHeight: '120%', fontWeight: '500' }],
        'h6-regular': ['28px', { lineHeight: '120%', fontWeight: '400' }],
        'h6-bold': ['28px', { lineHeight: '120%', fontWeight: '700' }],
        'h7': ['24px', { lineHeight: '120%', fontWeight: '500' }],
        'h7-regular': ['24px', { lineHeight: '120%', fontWeight: '400' }],
        'h7-bold': ['24px', { lineHeight: '120%', fontWeight: '700' }],
        'h8': ['18px', { lineHeight: '120%', fontWeight: '500' }],
        'h8-regular': ['18px', { lineHeight: '120%', fontWeight: '400' }],
        'h8-bold': ['18px', { lineHeight: '120%', fontWeight: '700' }],
        'body': ['16px', { lineHeight: '120%', fontWeight: '500' }],
        'body-regular': ['16px', { lineHeight: '120%', fontWeight: '400' }],
        'body-bold': ['16px', { lineHeight: '120%', fontWeight: '700' }],
        'body-sm': ['14px', { lineHeight: '120%', fontWeight: '500' }],
        'body-sm-regular': ['14px', { lineHeight: '120%', fontWeight: '400' }],
        'body-sm-bold': ['14px', { lineHeight: '120%', fontWeight: '700' }],
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
        'sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
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
