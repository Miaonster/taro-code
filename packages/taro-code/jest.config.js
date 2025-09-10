// eslint-disable-next-line import/no-commonjs
module.exports = {
  verbose: true,
  moduleNameMapper: {
    '@tarojs/components': '@tarojs/components/dist/esm',
    '^.+\\.(css|scss|less)$': '<rootDir>/style-mock.js',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    '^.+\\.esm.js?$': 'ts-jest',
  },
  rootDir: __dirname,
  setupFiles: ['<rootDir>/test/setup'],
  globals: {
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    ENABLE_SIZE_APIS: true,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@taro)', '^.+\\.(css|sass|scss|less)$'],
}
