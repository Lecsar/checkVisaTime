module.exports = function (w) {
  return {
    files: ['src/**/*.ts'],
    tests: ['__tests__/**/*.test.ts'],

    env: {
      type: 'node',
    },

    testFramework: 'jest',
  };
};
