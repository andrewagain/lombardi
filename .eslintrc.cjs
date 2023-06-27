module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  plugins: ["react-refresh", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "warn",
    "react-refresh/only-export-components": "warn",

    // 3rd-party modules often force us to use 'any'
    "@typescript-eslint/no-explicit-any": "off",

    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@/app/theme/colors",
            message:
              "To support dark mode, use semantic-tokens.ts instead of colors.ts.",
          },
        ],
      },
    ],
  },
}
