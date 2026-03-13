import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Represents the state of an async operation.
 * @template T - The type of the resolved value.
 */
export type UseAsyncState<T> = {
  /** Whether the async operation is in progress. */
  loading: boolean
  /** The resolved value if the operation succeeded. */
  value: T | undefined
  /** The error if the operation failed. */
  error: Error | undefined
  /** Function to retry the async operation. */
  retry: () => void
}

/**
 * Custom hook that manages the state of an async function.
 * @template T - The type of the resolved value.
 * @param {() => Promise<T>} asyncFn - The async function to execute.
 * @param {unknown[]} [deps] - Dependencies that trigger re-execution when changed.
 * @returns {UseAsyncState<T>} The state of the async operation.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-async)
 * @example
 * ```tsx
 * const { value, error, loading, retry } = useAsync(async () => {
 *   const response = await fetch('/api/data');
 *   return response.json();
 * }, []);
 * ```
 */
export function useAsync<T>(
  asyncFn: () => Promise<T>,
  deps: unknown[] = [],
): UseAsyncState<T> {
  const [state, setState] = useState<{
    loading: boolean
    value: T | undefined
    error: Error | undefined
  }>({
    loading: true,
    value: undefined,
    error: undefined,
  })

  const asyncFnRef = useRef(asyncFn)
  const isMountedRef = useRef(true)

  // Keep asyncFnRef up to date
  useEffect(() => {
    asyncFnRef.current = asyncFn
  }, [asyncFn])

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: undefined }))

    try {
      const result = await asyncFnRef.current()
      if (isMountedRef.current) {
        setState({ loading: false, value: result, error: undefined })
      }
    } catch (err) {
      if (isMountedRef.current) {
        setState({
          loading: false,
          value: undefined,
          error: err instanceof Error ? err : new Error(String(err)),
        })
      }
    }
  }, deps)

  const retry = useCallback(() => {
    execute()
  }, [execute])

  useEffect(() => {
    isMountedRef.current = true
    execute()

    return () => {
      isMountedRef.current = false
    }
  }, [execute])

  return {
    loading: state.loading,
    value: state.value,
    error: state.error,
    retry,
  }
}
