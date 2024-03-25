module.exports = {
  parser: '@babel/eslint-parser',
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
  ],
  plugins: ['jest'],
  rules: {
    // add your custom rules here
  },
};
