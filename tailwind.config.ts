import type { Config } from "tailwindcss";

export default {
  darkMode: 'class', // Add this line
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%, 75%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
        heartAnimation: {
          '0%': {
            opacity: "1",
            transform: 'translate(-50%, -50%) scale(1)',
          },
          '100%': {
            opacity: "0",
            transform: 'translate(-50%, -150%) scale(2)',
          },
        },
        toastIn: {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        toastOut: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(100%)' },
        },
      },

      animation: {
        shake: 'shake 0.5s',
        heartAnimation: 'heartAnimation 1s ease-out forwards',
        toastIn: 'toastIn 0.5s ease-in-out forwards',
        toastOut: 'toastOut 1s ease-in-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
