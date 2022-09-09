module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "prettier", "./.eslintrc-auto-import.json"],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off", // 去除组件只能多单词组成
    "no-unused-vars": ["error"],
    "prefer-const": "off",
    "vue/comment-directive": "off",
  },
};
