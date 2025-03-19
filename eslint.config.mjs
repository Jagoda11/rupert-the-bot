import babelParser from '@babel/eslint-parser';
import importPlugin from 'eslint-plugin-import';
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    files: ['**/*.js'],
    ignores: [
      'node_modules',
      '**/node_modules/**',
      'dist',
      'package-lock.json',
      '*.min.js',
      'coverage',
      'build',
      'public',
      '*.md',
      '.vscode',
    ],
    languageOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
      parser: babelParser,
      globals: {
        // This replaces `environment`
        browser: 'readonly',
        commonjs: 'readonly',
        es2021: 'readonly',
        node: 'readonly',
        jest: 'readonly',
      },
    },
    plugins: {
      import: importPlugin,
      jest: jestPlugin,
    },
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
  },
];
