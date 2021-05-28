module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:import/errors', 'plugin:jest/recommended', 'prettier'],
  parser: 'babel-eslint',

  overrides: [
    {
      files: ['src/**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        quotes: ['error', 'single'],
        '@typescript-eslint/no-redeclare': ['error'],
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            vars: 'all',
            args: 'after-used',
            ignoreRestSiblings: false,
          },
        ],
        '@typescript-eslint/no-shadow': 'warn',
        'no-redeclare': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'off',
        'no-restricted-imports': [
          'error',
          {
            patterns: ['**/index', '**/index.js'],
          },
        ],
        curly: ['error', 'all'],
      },
      plugins: ['import', 'jest', '@typescript-eslint'],
    },
  ],
};
