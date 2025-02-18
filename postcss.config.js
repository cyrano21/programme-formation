module.exports = {
  plugins: {
    'tailwindcss/nesting': {},
    'tailwindcss': {},
    'autoprefixer': {
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead',
        'not ie <= 11'
      ],
      grid: 'autoplace',
      flexbox: 'no-2009'
    },
    'postcss-preset-env': {
      stage: 3,
      features: {
        'custom-properties': false,
        'appearance': true
      }
    }
  }
}
