module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": "off",
    "prettier/prettier": ['error', {
      singleQuote: true,
      semi: true,
      useTabs: false,
      tabWidth: 2,
      trailingComma: 'all',
      printWidth: 120,
      bracketSpacing: true,
      arrowParens: 'avoid',
    }]
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
