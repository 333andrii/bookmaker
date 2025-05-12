import globals from 'globals';
import tseslint from 'typescript-eslint';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import css from '@eslint/css';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
  tseslint.configs.recommended,
  { files: ['**/*.json'], plugins: { json }, language: 'json/json' },
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/commonmark',
  },
  { files: ['**/*.css'], plugins: { css }, language: 'css/css' },
]);
