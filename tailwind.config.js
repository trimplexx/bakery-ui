module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'yellow-orange': {
          '50': '#fff8eb',
          '100': '#ffebc6',
          '200': '#ffd688',
          '300': '#febb4b',
          '400': '#fea831',
          '500': '#f87d08',
          '600': '#dc5903',
          '700': '#b63a07',
          '800': '#942d0c',
          '900': '#79260e',
          '950': '#461002',
        },
      },
      height: {
        custom: 'calc(100vh - 144px)',
        adminCustom: 'calc(100vh - 120px)'
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
]
}