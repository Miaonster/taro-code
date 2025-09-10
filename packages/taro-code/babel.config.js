// eslint-disable-next-line import/no-commonjs
module.exports = {
  presets: [['taro', { framework: 'react', ts: true }], '@babel/preset-typescript'],
  plugins: ['@babel/plugin-transform-private-methods'],
}
