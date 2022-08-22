'use strict';

import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  preset: 'ts-jest',
  roots: ['src'],
  testEnvironment: 'node',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  verbose: true,
};

module.exports = { ...config };
