'use strict'

module.exports = {
  exclude: [
    'libs/**',
    'node_modules/**',
    'models/**',
    'helpers/**',
    'middlewares/**',
    'routes/**',
    'app.js',
    'envVariables.js',
    'coverage',
    'self-coverage',
    'test/**',
    'test/fixtures/coverage.js',
    'test/build/*',
    'test/src/*',
    'test/nyc.js',
    'test/process-args.js',
    'test/fixtures/_generateCoverage.js'
  ],
  branches: 100,
  functions: 100,
  lines: 100,
  statements: 100
}
