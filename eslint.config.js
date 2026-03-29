import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Ignore common build folders
    ignores: ["**/dist/**", "**/node_modules/**", "**/playwright-report/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    // This part tells ESLint which files to look at
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: [
          "./tsconfig.json",
          "./frontend/tsconfig.json",
          "./backend/tsconfig.json",
          "./shared/tsconfig.json",
          "./tests/tsconfig.json",
        ],
      },
    },
    rules: {
      // Add any custom rules here
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }
);