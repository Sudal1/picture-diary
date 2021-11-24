module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "indent": ["warn"],
    "semi": ["warn"],
    "keyword-spacing": 0,
    "no-unused-vars": 1,
    "no-useless-escape": 0,
    "no-multi-spaces": 0,
    "no-trailing-spaces": 0,
    "no-multiple-empty-lines": 0,
    "space-before-function-paren": 0,
    "eol-last": 0
  }
}
