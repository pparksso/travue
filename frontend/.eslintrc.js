module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: [
          "Pagination",
          "Post",
          "Login",
          "Nav",
          "New",
          "Edit",
          "Heart",
          "Layout",
          "Skeleton",
        ],
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "prettier/prettier": ["error", {endOfLine: "auto"}],
  },
};
