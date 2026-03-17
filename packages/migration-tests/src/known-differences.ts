export const knownDifferences = {
  useDebounceValue:
    'internal debounce impl instead of lodash — timing-tolerant comparison only',
  useDebounceCallback:
    'internal debounce impl instead of lodash — timing-tolerant comparison only',
  useBoolean: 'ts-hooks-kit adds input validation (throws on non-boolean)',
} as const
