import js from '@eslint/js'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import reactHooks from 'eslint-plugin-react-hooks'
import importPlugin from 'eslint-plugin-import-x'

export default [
  {
    ignores: ['dist/', 'coverage/', 'node_modules/', '**/generated/', 'apps/docs/build/'],
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        HTMLElement: 'readonly',
        Element: 'readonly',
        Event: 'readonly',
        EventTarget: 'readonly',
        MediaQueryList: 'readonly',
        MediaQueryListEvent: 'readonly',
        Screen: 'readonly',
        Storage: 'readonly',
        ResizeObserver: 'readonly',
        ResizeObserverEntry: 'readonly',
        ResizeObserverSize: 'readonly',
        IntersectionObserver: 'readonly',
        IntersectionObserverEntry: 'readonly',
        IntersectionObserverInit: 'readonly',
        DOMRectReadOnly: 'readonly',
        MutationObserver: 'readonly',
        Node: 'readonly',
        NodeList: 'readonly',
        URL: 'readonly',
        RequestInit: 'readonly',
        Response: 'readonly',
        AbortController: 'readonly',
        GeolocationPosition: 'readonly',
        GeolocationPositionError: 'readonly',
        PermissionName: 'readonly',
        PermissionState: 'readonly',
        // Vitest globals
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        vitest: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
        test: 'readonly',
        expectTypeOf: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'react-hooks': reactHooks,
      'import-x': importPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Disable base rules that conflict with TypeScript
      'no-undef': 'off', // TypeScript handles this
      'no-unused-vars': 'off',
      'no-redeclare': 'off', // TypeScript overloads
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // Import hygiene (Vercel best practice: bundle-barrel-imports)
      'import-x/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-duplicates': 'error',
      'import-x/no-cycle': 'warn',

      // Downgrade new react-hooks rules to warn for gradual adoption
      'react-hooks/refs': 'warn',
      'react-hooks/purity': 'warn',
      'react-hooks/immutability': 'warn',
      'react-hooks/use-memo': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/preserve-manual-memoization': 'warn',
    },
  },
]
