import type { Config } from '@jest/types';

// eslint-disable-next-line @typescript-eslint/require-await
export default async (): Promise<Config.InitialOptions> => ({
  displayName: 'ts-jest',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  testMatch: ['<rootDir>/tests/*.test.{js,ts}'],
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tests/tsconfig.json'
    }
  }
});
