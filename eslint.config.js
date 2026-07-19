import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import regexpPlugin from 'eslint-plugin-regexp';
import nodePlugin from 'eslint-plugin-n';
import { importX, createNodeResolver } from 'eslint-plugin-import-x';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import unicorn from 'eslint-plugin-unicorn';
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
    plugins: { n: nodePlugin },
    extends: ['n/mixed-esm-and-cjs'],
  },
  importX.flatConfigs.recommended,
  importX.flatConfigs.typescript,
  unicorn.configs['flat/recommended'],
  {
    settings: {
      'import-x/resolver-next': [createTypeScriptImportResolver(), createNodeResolver()],
    },
    rules: {
      'regexp/no-super-linear-backtracking': 'error',
      'n/file-extension-in-import': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/prefer-export-from': 'off',
      'unicorn/name-replacements': 'off',
      'import-x/no-named-as-default-member': 'off',
    },
  },
  {
    files: ['tsup.config.ts', 'eslint.config.js'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
]);
