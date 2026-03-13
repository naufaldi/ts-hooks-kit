import { useCallback, useRef } from 'react'

/**
 * Custom hook that returns a memoized version of a function that never changes reference.
 * The returned function will always call the latest version of the callback, but its
 * identity (reference) will remain stable across renders.
 *
 * This is useful when you need to pass a callback to a dependency array or child component
 * without causing unnecessary re-renders.
 *
 * @template T - The type of the function being memoized.
 * @param {T} fn - The function to memoize.
 * @returns {T} A memoized function with stable reference.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-memoized-fn)
 * @example
 * ```tsx
 * const stableCallback = useMemoizedFn((value) => {
 *   console.log(value);
 * });
 *
 * // stableCallback can be safely used in useEffect deps without causing infinite loops
 * useEffect(() => {
 *   stableCallback(someValue);
 * }, [stableCallback]);
 * ```
 */
export function useMemoizedFn<T extends (...args: any[]) => any>(fn: T): T {
  const fnRef = useRef(fn)

  // Keep the ref up to date
  fnRef.current = fn

  // Return a stable function that calls the latest fn
  const memoizedFn = useCallback((...args: Parameters<T>): ReturnType<T> => {
    return fnRef.current(...args)
  }, [])

  return memoizedFn as T
}
