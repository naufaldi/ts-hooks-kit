export const knownDifferences = {
  useDebounceValue:
    'internal debounce impl instead of lodash — timing-tolerant comparison only',
  useDebounceCallback:
    'internal debounce impl instead of lodash — timing-tolerant comparison only',
  useBoolean: 'ts-hooks-kit adds input validation (throws on non-boolean)',
  useSessionStorage:
    'deserializer applies sanitizeJson guard against prototype pollution',
  useResizeObserver:
    'uses layout effect with rAF polling instead of plain useEffect for deferred ref binding',
} as const
