module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard',
    'plugin:flowtype/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  "rules": {
    "no-console": 1,
    "indent": ["error", 4],
    "semi": [2, "always"],
    "no-unused-vars": 0
  },
  "parser": "babel-eslint",
  "plugins": [
      "flowtype"
  ]
}
