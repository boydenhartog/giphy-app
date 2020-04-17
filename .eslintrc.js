module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/recommended",
    "plugin:prettier-vue/recommended",
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  plugins: ["@typescript-eslint", "vue"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  settings: {
    "prettier-vue": {
      SFCBlocks: {
        template: true,
        script: true,
        style: true,

        customBlocks: {
          docs: {
            lang: "markdown",
          },
          config: {
            lang: "json",
          },
          module: {
            lang: "js",
          },
          comments: false,
        },
      },
    },
    usePrettierrc: true,
  },
  rules: {
    "prettier-vue/prettier": [
      "error",
      {
        printWidth: 100,
        singleQuote: true,
        semi: false,
        trailingComma: "es5",
      },
    ],
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
