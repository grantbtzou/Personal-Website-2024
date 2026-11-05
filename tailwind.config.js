/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      // Graph game selections: the fill grows out from the centre of the node and the icon grows
      // with it. The back-out curve starts fast and overshoots slightly before settling, which gives
      // the pop. The fill's overshoot is clipped by the node's edge, while the icon's shows.
      keyframes: {
        "selection-grow": {
          from: { transform: "scale(0.15)" },
          to: { transform: "scale(1)" },
        },
      },
      animation: {
        "selection-fill": "selection-grow 380ms cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "selection-icon": "selection-grow 420ms cubic-bezier(0.34, 1.8, 0.64, 1) both",
      },
    },
  },
  plugins: [],
};
