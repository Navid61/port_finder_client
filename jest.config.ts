import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // This is sufficient for TypeScript and JSX
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
     '^@/(.*)$': '<rootDir>/src/$1'
   
  },
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/dist/**",
    "!**/build/**",
    "!vite.config.ts",
    "!**/coverage/**"
  ],
  "coveragePathIgnorePatterns": [
    "/node_modules/",
    "jest-setup.ts",
    "vite-env.d.ts"
  ],
   transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
         tsconfig:'tsconfig.test.json',
         isolatedModules: true,
         
      },
    ],
  },

  
};

export default config;