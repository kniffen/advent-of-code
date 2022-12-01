/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  forceExit: true,
  verbose: true,
  clearMocks: true,
  testMatch: [
    "**/?(*.)+(test).ts"
  ],
}