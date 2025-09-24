module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
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
    '@typescript-eslint/ban-ts-comment': ['warn', { 'ts-ignore': 'allow-with-description' }],
    'no-underscore-dangle': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'function-paren-newline': 'off',
    'object-curly-newline': 'off',
  },
};
