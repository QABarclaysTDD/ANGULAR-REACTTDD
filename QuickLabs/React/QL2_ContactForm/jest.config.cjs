module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '^.+\\.[t|j]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  // Add this to handle modern ES modules from react-router-dom
  transformIgnorePatterns: [
    'node_modules/(?!(react-router|react-router-dom|@remix-run)/)'
  ],
  // Additional globals that might be needed
  globals: {
    TextEncoder: TextEncoder,
    TextDecoder: TextDecoder,
  }
};