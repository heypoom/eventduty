module.exports = wallaby => ({
  files: [
    'src/**/*.js',
    'src/**/*.ts',
    'src/**/*.tsx',
  ],

  tests: [
    'tests/**/*.js',
    'tests/**/*.ts',
    'tests/**/*.tsx',
  ],

  env: {
    type: 'node',
    runner: 'node',
  },

  testFramework: 'jest',

  compilers: {
    '**/*.ts?(x)': wallaby.compilers.typeScript({module: 'commonjs'}),
  },
})
