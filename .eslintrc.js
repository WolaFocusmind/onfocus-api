module.exports = {
  env: {
    browser: false,
    commonjs: true,
    es2021: true,
  },
  plugins: [
    "security",
    "prefer-arrow",
  ],
  extends: [
    "airbnb-base",
    "plugin:security/recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    "prefer-arrow/prefer-arrow-functions": [
      "error",
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    "func-style": ["error", "expression"],
    strict: ["error", "global"],
    "no-trailing-spaces": [2, { skipBlankLines: true }],
    "eol-last": ["error", "always"],
    curly: ["error", "multi-line"],
    "lines-between-class-members": ["error", "always"],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "no-console": "error",
    "nonblock-statement-body-position": ["error", "beside"],
  },
};
