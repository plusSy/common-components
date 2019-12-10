module.exports = {
  root: true,
  env: {
      node: false
  },
  extends: ['plugin:vue/essential', '@ocj/ocj-vue'],
  rules: {},
  globals: {
      ocj: true,
      window: true,
      Vue: true,
      __webpack_public_path__: true
  },
  parserOptions: {
      parser: 'babel-eslint'
  }
};
