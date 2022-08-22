'use strict';

/**
 * @type {import('eslint'.Linter.Config)}
 */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname, sourceType: 'module' },
  plugins: ['@typescript-eslint/eslint-plugin', 'no-loops', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'error',
    'no-loops/no-loops': 'error',
    quotes: ['error', 'single'],
    '@typescript-eslint/no-floating-promises': 'warn',
  },
  ignorePatterns: ['node_modules', 'dist', 'coverage', '.eslintrc.js', '**/*.config.js', '**/*.config.ts'],
};

module.exports = { ...config };
