const js = require('@eslint/js');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const cypressPlugin = require('eslint-plugin-cypress');

module.exports = [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        Cypress: 'readonly',
        cy: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        beforeEach: 'readonly',
        process: 'readonly',
        NodeJS: 'readonly',
        console: 'readonly',
        fetch: 'readonly',
        JQuery: 'readonly',
        HTMLElement: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      cypress: cypressPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...cypressPlugin.configs.recommended.rules,
      'cypress/no-unnecessary-waiting': 'off',
      'cypress/unsafe-to-chain-command': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off'
    }
  },
  {
    ignores: ['node_modules/**', 'results/**', 'cypress/videos/**', 'cypress/screenshots/**']
  }
];
