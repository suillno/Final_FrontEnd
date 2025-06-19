/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], // ✅ 꼭 수정
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Spoqa Han Sans Neo"', "sans-serif"], // 기본 sans 대체
      },
    },
  },
  plugins: [],
};
