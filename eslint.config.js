import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import regexpPlugin from 'eslint-plugin-regexp';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { ignores: ['dist', 'build', 'node_modules', 'coverage', '**/*.d.ts'] },
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.node },
  },
  tseslint.configs.recommended,
  regexpPlugin.configs['flat/recommended'],
  {
    rules: {
      'regexp/no-super-linear-backtracking': 'error',
    },
  },
]);
