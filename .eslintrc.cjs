module.exports = {
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
    'plugin:jest/recommended',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['import', 'jest'],
  rules: {
    'no-shadow': 'error',
    eqeqeq: ['error', 'always'],
    curly: ['error', 'all'],
    'no-unused-vars': 'warn',
    'no-redeclare': 'error',
    'no-console': 'warn',
    'prefer-const': 'error',
    'no-var': 'error',
  },
};
