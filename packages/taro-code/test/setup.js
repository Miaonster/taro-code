// Jest setup file for react-test-renderer
// Mock Taro components for testing

// Mock @tarojs/components
jest.mock('@tarojs/components', () => ({
  Image: 'img',
  Canvas: 'canvas',
}))

// Mock @tarojs/taro
jest.mock('@tarojs/taro', () => ({
  createCanvasContext: jest.fn(() => ({
    drawImage: jest.fn(),
    draw: jest.fn(),
  })),
  canvasToTempFilePath: jest.fn(),
}))
