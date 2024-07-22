module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "react-app",
    "prettier",
    "eslint:recommended",
    "plugin:react-hooks/recommended",
    "plugin:@tanstack/eslint-plugin-query/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  plugins: [
    "react-refresh",
    "prettier",
    "@tanstack/query",
    "simple-import-sort",
  ],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "prettier/prettier": "warn",
    "no-unused-vars": "warn",
    "simple-import-sort/imports": [1],
    "simple-import-sort/exports": [1],
    "react/jsx-sort-props": [
      1,
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: "last",
      },
    ],
    "import/no-anonymous-default-export": "off",
  },
};
