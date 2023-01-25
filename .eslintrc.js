module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
          ['@components', './src/components'],
          ['@pages', './src/pages'],
          ['@styles', './src/styles'],
          ['@utils', './src/utils'],
          ['@constants', './src/constants'],
          ['@features', './src/features'],
          ['@lib', './src/lib'],
          ['@hooks', './src/hooks'],
        ],
        extensions: ['.js', '.jsx', '.json'],
      },
    },
  },
  rules: {
    'react/prefer-stateless-function': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'import/no-cycle': 0,
    'no-nested-ternary': 0,
    'react/forbid-prop-types': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
  },
}
