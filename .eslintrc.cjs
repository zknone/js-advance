module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json',
  },
  overrides: [
    {
      files: ['*.config.ts'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
          },
        ],
      },
    },
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'plugin:prettier/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
  ],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-throw-literal': 'warn',
    '@typescript-eslint/lines-between-class-members': ['warn', 'always'],
    'import/prefer-default-export': 'off',
    'no-restricted-globals': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'no-nested-ternary': 'off',
    'operator-linebreak': 'off',
  },
};
