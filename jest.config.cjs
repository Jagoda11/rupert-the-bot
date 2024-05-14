// jest.config.cjs
module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  testPathIgnorePatterns: ['/node_modules/', '/.aws-sam/'],
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
