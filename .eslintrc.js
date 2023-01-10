/** @type {import('@types/eslint').Linter.BaseConfig} */

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  ecmaFeatures: {
    tsx: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
  ],
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['*.css', '*.config.js', '*.config.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    "@typescript-eslint/promise-function-async": "warn"
  }
}
