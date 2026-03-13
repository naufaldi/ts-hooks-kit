import { useCallback, useRef, useState } from 'react'

/**
 * Custom hook that throttles a function, ensuring it is only called at most once per wait period.
 * @template T - The type of the function being throttled.
 * @param {T} fn - The function to throttle.
 * @param {number} wait - The number of milliseconds to throttle invocations to.
 * @returns {T} The throttled function.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-throttle-fn)
 * @example
 * ```tsx
 * const throttledSave = useThrottleFn(saveToDatabase, 1000);
 * // Calling throttledSave() multiple times rapidly will only execute saveToDatabase once per second
 * ```
 */
export function useThrottleFn<T extends (...args: any[]) => any>(
  fn: T,
  wait: number,
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastCalledRef = useRef<number>(0)

  const throttledFn = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      const remaining = wait - (now - lastCalledRef.current)

      if (remaining <= 0 || remaining > wait) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
        lastCalledRef.current = now
        return fn(...args)
      }
    },
    [fn, wait],
  ) as T

  return throttledFn
}

/**
 * Custom hook that throttles a value, ensuring updates occur at most once per wait period.
 * @template T - The type of the value being throttled.
 * @param {T} value - The value to throttle.
 * @param {number} wait - The number of milliseconds to throttle updates to.
 * @returns {T} The throttled value.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-throttle)
 * @example
 * ```tsx
 * const throttledSearchTerm = useThrottle(searchTerm, 300);
 * // throttledSearchTerm will only update 300ms after the last change to searchTerm
 * ```
 */
export function useThrottle<T>(value: T, wait: number): T {
  const [throttledValue, setThrottledValue] = useState<T>(value)
  const lastUpdatedRef = useRef<number>(0)
  const previousValueRef = useRef<T>(value)

  const now = Date.now()
  const remaining = wait - (now - lastUpdatedRef.current)

  // Update during render if enough time has passed
  if (remaining <= 0 || remaining > wait || previousValueRef.current !== value) {
    if (previousValueRef.current !== value) {
      setThrottledValue(value)
      lastUpdatedRef.current = now
      previousValueRef.current = value
    }
  }

  return throttledValue
}
