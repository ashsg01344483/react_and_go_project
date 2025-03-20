/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}"  // ← src 配下の全コンポーネントを対象にする
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
