import js from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // 1. Ignores must be in their own object at the top
    ignores: ["**/dist/**", "**/node_modules/**", "**/playwright-report/**"],
  },
  
  // 2. Base Recommended configs
  js.configs.recommended,
  ...tseslint.configs.recommended, // Note the "..." to spread the array
  
  {
    // 3. Your Specific Project Rules
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
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
      // PROMISE & ASYNC SAFETY (The Playwright Guard)
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      
      // GENERAL RULES
      "@typescript-eslint/no-unused-vars": "warn",
    },
  }
];