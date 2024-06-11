/** @type {import("tailwindcss").Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      minHeight: {
        'placeholder-container': '25vh'
      },
      spacing: {
        /* 半屏模块的最高高度 */
        'half-screen-dialog': '70vh'
      },
      colors: {
        /* 主色 */
        primary: '#FF5A1E',
        /* 涨 */
        rise: '#0ECC90',
        /* 跌 */
        fall: '#DE4348',
        /* 链接 */
        link: '#57AEFE',
        /* 警告 */
        warning: '#FB8A00',
        /* 错误 */
        error: '#F44336',
        /* 蒙版 */
        mask: 'rgba(0,0,0,.6)',
        /* 背景色 */
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        bg2: 'rgb(var(--color-bg2) / <alpha-value>)',
        bg3: 'rgb(var(--color-divider) / <alpha-value>)',
        bg5: 'rgb(var(--color-btn-secondary) / <alpha-value>)',
        bg7: 'rgb(var(--color-popup-bg) / <alpha-value>)',
        /* 分割线 */
        divider: 'rgb(var(--color-divider) / <alpha-value>)',
        /* 三级标题问题 */
        text1: 'rgb(var(--color-text1) / <alpha-value>)',
        text2: 'rgb(var(--color-text2) / <alpha-value>)',
        text3: 'rgb(var(--color-text3) / <alpha-value>)',
        /* 按钮次级颜色 */
        'btn-secondary': 'rgb(var(--color-btn-secondary) / <alpha-value>)',
        /* 弹窗背景 */
        'popup-bg': 'rgb(var(--color-popup-bg) / <alpha-value>)',
        /* 弹窗的输入框背景 */
        'popup-input-bg': 'rgb(var(--color-divider) / <alpha-value>)',
        /* 总是白色 */
        'always-white': '#fff'
      },
      fontSize: {
        h1: [
          '34px',
          {
            lineHeight: '44px',
            fontWeight: 700
          }
        ],
        h2: [
          '28px',
          {
            lineHeight: '36px',
            fontWeight: 700
          }
        ],
        s1: [
          '24px',
          {
            lineHeight: '31px',
            fontWeight: 600
          }
        ],
        s2: [
          '18px',
          {
            lineHeight: '23px',
            fontWeight: 600
          }
        ],
        s3: [
          '16px',
          {
            lineHeight: '21px',
            fontWeight: 600
          }
        ],
        s4: [
          '14px',
          {
            lineHeight: '18px',
            fontWeight: 600
          }
        ],
        f1: [
          '16px',
          {
            lineHeight: '21px',
            fontWeight: 400
          }
        ],
        f2: [
          '14px',
          {
            lineHeight: '18px',
            fontWeight: 400
          }
        ],
        f3: [
          '12px',
          {
            lineHeight: '16px',
            fontWeight: 400
          }
        ],
        f4: [
          '10px',
          {
            lineHeight: '13px',
            fontWeight: 400
          }
        ]
      },
      zIndex: {
        /* scroll area */
        'scroll-area': 5,
        /* 导航栏 */
        navbar: 10,
        /* modal 弹窗 */
        dialog: 50,
        /* 下拉菜单，小 Tips */
        dropdown: 100,
        /* 全屏 Loading */
        backdrop: 800,
        /* Toast, 通知 */
        toast: 900
      },
      keyframes: {
        fadeOut: {
          '50%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      animation: {
        fadeOut: 'fadeOut 4s forwards',
      },
    }
  },
  plugins: []
};
