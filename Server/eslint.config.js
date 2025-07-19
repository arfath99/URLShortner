import js from '@eslint/js';
import globals from 'globals';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: { globals: globals.browser },
  },
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'reakit/Menu',
              importNames: ['useMenuState'],
              message:
                'Do not use useMenuState from reakit/Menu. Use useMenuState instead.',
            },
          ],
        },
      ],
      eqeqeq: 2,
      curly: 2,
      'no-console': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'spaced-comment': 'error',
      'object-shorthand': 'error',
      'no-mixed-operators': 'off',
      'no-useless-escape': 'off',
      'react/react-in-jsx-scope': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'export',
        },
      ],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true,
        },
      ],
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
    },
  },
]);
