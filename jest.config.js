/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path')
const root = resolve(__dirname)
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  displayName: 'root-tests',

  clearMocks: true,

  coverageDirectory: 'tests/coverage',

  coverageProvider: 'v8',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>'
  }),

  preset: 'ts-jest',

  rootDir: root,

  testEnvironment: 'node',

  testMatch: ['<rootDir>/src/**/*.test.ts']
}
