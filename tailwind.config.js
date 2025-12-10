/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // 모바일에서 hover 효과 비활성화를 위한 설정
  future: {
    hoverOnlyWhenSupported: true,
  },
}
