/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 浅色主题
        light: {
          bg: '#ffffff',
          text: '#374151',
          border: '#e5e7eb',
          accent: '#2563eb',
          hover: '#1d4ed8',
          editorBg: '#ffffff',
          editorLine: '#f3f4f6',
        },
        // 深色主题
        dark: {
          bg: '#1e293b',
          text: '#e2e8f0',
          border: '#334155',
          accent: '#3b82f6',
          hover: '#2563eb',
          editorBg: '#0f172a',
          editorLine: '#1e293b',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      height: {
        'header': '50px',
        'footer': '30px',
      },
    },
  },
  plugins: [],
}
