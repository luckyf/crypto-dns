'use strict';

/**
 * @type {import('prettier').Config}
 */
const config = {
  endOfLine: 'lf',
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
};

module.exports = { ...config };
