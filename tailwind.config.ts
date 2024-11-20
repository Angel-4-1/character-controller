import type { Config } from 'tailwindcss'

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["PoppinsRegular", "Poppins", "Arial"]
    },
    extend: {},
  },
  plugins: [],
} satisfies Config

