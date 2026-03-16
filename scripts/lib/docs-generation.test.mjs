import test from 'node:test'
import assert from 'node:assert/strict'

import {
  composeHookMarkdown,
  extractJsDocSummary,
  getHookTypedocData,
} from './docs-generation.mjs'

test('extractJsDocSummary reads only hook JSDoc summary before export', () => {
  const source = `
/**
 * Represents the state of an async operation.
 */
export type UseAsyncState<T> = {
  /** Whether the async operation is in progress. */
  loading: boolean
}

/**
 * Custom hook that manages the state of an async function.
 * @template T - The type of the resolved value.
 * @example
 * \`\`\`tsx
 * const value = useAsync(asyncFn)
 * \`\`\`
 */
export function useAsync<T>() {}
  `

  assert.equal(
    extractJsDocSummary(source, 'useAsync'),
    'Custom hook that manages the state of an async function.',
  )
})

test('getHookTypedocData extracts signature, returns, and type aliases', () => {
  const typedoc = {
    children: [
      {
        name: 'useBoolean/useBoolean',
        groups: [
          { title: 'Functions', children: [2] },
          { title: 'Type Aliases', children: [22] },
        ],
        children: [
          {
            id: 2,
            name: 'useBoolean',
            signatures: [
              {
                name: 'useBoolean',
                comment: {
                  blockTags: [
                    {
                      tag: '@returns',
                      content: [{ kind: 'text', text: 'Boolean state controls.' }],
                    },
                  ],
                },
                parameters: [
                  {
                    name: 'defaultValue',
                    flags: { isOptional: true },
                    type: { type: 'intrinsic', name: 'boolean' },
                  },
                ],
                type: { type: 'reference', name: 'UseBooleanReturn' },
              },
            ],
          },
          {
            id: 22,
            name: 'UseBooleanReturn',
            comment: {
              summary: [{ kind: 'text', text: 'Return shape for useBoolean.' }],
            },
          },
        ],
      },
    ],
  }

  const result = getHookTypedocData(typedoc, 'useBoolean')
  assert.equal(result.apiSignature, 'function useBoolean(defaultValue?: boolean): UseBooleanReturn')
  assert.equal(result.returnsDescription, 'Boolean state controls.')
  assert.deepEqual(result.typeAliases, [
    { name: 'UseBooleanReturn', summary: 'Return shape for useBoolean.' },
  ])
})

test('composeHookMarkdown emits complete sections in order', () => {
  const markdown = composeHookMarkdown({
    hookName: 'useBoolean',
    slug: 'use-boolean',
    summary: 'Custom hook that handles boolean state.',
    introMarkdown: 'A simple abstraction to play with a boolean.',
    demoSource: "import { useBoolean } from '@ts-hooks-kit/core'\n\nconst x = useBoolean(false)",
    hookSource: 'export function useBoolean() { return null }',
    typedocData: {
      apiSignature: 'function useBoolean(defaultValue?: boolean): UseBooleanReturn',
      returnsDescription: 'Boolean state controls.',
      typeAliases: [{ name: 'UseBooleanReturn', summary: 'Return shape for useBoolean.' }],
    },
  })

  const usageIndex = markdown.indexOf('## Usage')
  const apiIndex = markdown.indexOf('## API')
  const returnsIndex = markdown.indexOf('## Returns')
  const aliasesIndex = markdown.indexOf('## Type Aliases')
  const hookIndex = markdown.indexOf('## Hook')

  assert.ok(usageIndex >= 0)
  assert.ok(apiIndex > usageIndex)
  assert.ok(returnsIndex > apiIndex)
  assert.ok(aliasesIndex > returnsIndex)
  assert.ok(hookIndex > aliasesIndex)
  assert.ok(markdown.includes('function useBoolean(defaultValue?: boolean): UseBooleanReturn'))
})

test('composeHookMarkdown omits type aliases section when empty', () => {
  const markdown = composeHookMarkdown({
    hookName: 'useAsync',
    slug: 'use-async',
    summary: 'Async helper hook.',
    introMarkdown: '',
    demoSource: '',
    hookSource: 'export function useAsync() { return null }',
    typedocData: {
      apiSignature: 'function useAsync(): UseAsyncState',
      returnsDescription: 'Current async state and controls.',
      typeAliases: [],
    },
  })

  assert.ok(!markdown.includes('## Type Aliases'))
  assert.ok(markdown.includes('## Usage'))
})
