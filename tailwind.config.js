/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        PoppinsThin: ["PoppinsThin", "sans-serif"],
        PoppinsExtraLight: ["PoppinsExtraLight", "sans-serif"],
        PoppinsLight: ["PoppinsLight", "sans-serif"],
        PoppinsRegular: ["PoppinsRegular", "sans-serif"],
        PoppinsMedium: ["PoppinsMedium", "sans-serif"],
        PoppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        PoppinsExtraBold: ["PoppinsExtraBold", "sans-serif"],
        PoppinsBlack: ["PoppinsBlack", "sans-serif"],
      },
    },
  },
  plugins: [],
};
