/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  // Stop running tests after `n` failures
  bail: false,

  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: false,

  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",

  // A preset that is used as a base for Jest's configuration
  preset: "ts-jest",

  // The glob patterns Jest uses to detect test files
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/*.test.ts"
  ],
};
