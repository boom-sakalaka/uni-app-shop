const { defaultPreset, createPreset } = require('tailwindcss-miniprogram-preset');
// tailwind.config.js
module.exports = {
  presets: [
    defaultPreset,
    createPreset({
      rem2rpx: false,
    }),
  ],
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  separator: '__', // 兼容小程序，将 : 替换成 __
  theme: {
    extend: {
      height: {
        750: '750rpx',
      },
      width: {
        750: '750rpx',
      },
    },
  },
  variants: {},
  plugins: [],
  corePlugins: {
    // 兼容小程序，将带有 * 选择器的插件禁用
    preflight: false,
    space: false,
    divideColor: false,
    divideOpacity: false,
    divideStyle: false,
    divideWidth: false,
  },
};
