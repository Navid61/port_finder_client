const js = require('@eslint/js');
const globals = require('globals');
const reactHooks = require('eslint-plugin-react-hooks');
const reactRefresh = require('eslint-plugin-react-refresh');
const typescriptEslintPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptEslintParser = require('@typescript-eslint/parser'); // Import the parser object

module.exports = [
  {
    files: ['**/*.{ts,tsx}'], // Match .ts and .tsx files
    languageOptions: {
      globals: globals.browser, // Add browser globals
      parser: typescriptEslintParser, // Pass the parser object here
      parserOptions: {
        project: ['./tsconfig.json','./tsconfig.app.json','tsconfig.node.json','./tsconfig.test.json'], // Path to your tsconfig.json
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslintPlugin, // TypeScript ESLint plugin object
      'react-hooks': reactHooks, // React hooks plugin object
      'react-refresh': reactRefresh, // React refresh plugin object
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Example TypeScript rule
      '@typescript-eslint/no-explicit-any': 'off', // Example rule
      'react-hooks/rules-of-hooks': 'error', // Enforce hooks rules
      'react-hooks/exhaustive-deps': 'warn', // Warn for missing dependencies
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
