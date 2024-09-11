/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      scale: {
        75: "0.75",
        100: "1",
      },
      translate: {
        "[-120%]": "-120%",
        "[120%]": "120%",
      },
      zIndex: {
        5: "5",
        10: "10",
      },
      colors: {
        nitro: "#8ACE00",
        silver: "C0C0C0",
      },
      imageRendering: {
        pixelated: {
          "image-rendering": "pixelated",
        },
        "crisp-edges": {
          "image-rendering": "crisp-edges",
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".image-rendering-pixelated": {
          "image-rendering": "pixelated",
        },
        ".image-rendering-crisp": {
          "image-rendering": "crisp-edges",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
