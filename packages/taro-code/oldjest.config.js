// eslint-disable-next-line import/no-commonjs
module.exports = {
  // verbose: true,
  // preset: 'taro-testing-library'
  // moduleFileExtensions: ['js', 'jsx', 'json'],
  // rootDir: __dirname,
  // testMatch: [
  //   '<rootDir>/src/**/*.test.js'
  // ],
  transform: {
    '\\.[jt]sx?$': 'babel-jest'
  },
  // transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@tarojs/components': '@tarojs/components/dist/index.cjs.js'
  }
}
