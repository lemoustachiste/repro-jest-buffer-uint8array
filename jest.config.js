module.exports = {
  modulePaths: [
    '<rootDir>/src/'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.((j|t)s)$': 'ts-jest'
  },
  globals: {
    Uint8Array: Uint8Array,
    ArrayBuffer: ArrayBuffer
  }
};
