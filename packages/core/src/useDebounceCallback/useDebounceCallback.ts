import { useMemo, useRef } from 'react'

import { useUnmount } from '../useUnmount'
import { debounce } from '../utils'
import type { DebounceOptions, DebouncedFunction } from '../utils'

/** Functions to manage a debounced callback. */
export type ControlFunctions = {
  /** Cancels pending function invocations. */
  cancel: () => void
  /** Immediately invokes pending function invocations. */
  flush: () => void
  /**
   * Checks if there are any pending function invocations.
   * @returns `true` if there are pending invocations, otherwise `false`.
   */
  isPending: () => boolean
}

/**
 * Represents the state and control functions of a debounced callback.
 * Subsequent calls to the debounced function return the result of the last invocation.
 * Note: If there are no previous invocations, the result will be undefined.
 * Ensure proper handling in your code.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DebouncedState<T extends (...args: any) => ReturnType<T>> = ((
  ...args: Parameters<T>
) => ReturnType<T> | undefined) &
  ControlFunctions

/**
 * Custom hook that creates a debounced version of a callback function.
 * @template T - Type of the original callback function.
 * @param {T} func - The callback function to be debounced.
 * @param {number} delay - The delay in milliseconds before the callback is invoked (default is `500` milliseconds).
 * @param {DebounceOptions} [options] - Options to control the behavior of the debounced function.
 * @returns {DebouncedState<T>} A debounced version of the original callback along with control functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-debounce-callback)
 * @example
 * ```tsx
 * const debouncedCallback = useDebounceCallback(
 *   (searchTerm) => {
 *     // Perform search after user stops typing for 500 milliseconds
 *     searchApi(searchTerm);
 *   },
 *   500
 * );
 *
 * // Later in the component
 * debouncedCallback('react hooks'); // Will invoke the callback after 500 milliseconds of inactivity.
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounceCallback<T extends (...args: any) => ReturnType<T>>(
  func: T,
  delay = 500,
  options?: DebounceOptions,
): DebouncedState<T> {
  const funcRef = useRef(func)
  funcRef.current = func

  const leading = options?.leading ?? false
  const trailing = options?.trailing !== false
  const maxWait = options?.maxWait

  const activeDebounced = useRef<DebouncedFunction<T> | null>(null)

  const debounced = useMemo(() => {
    activeDebounced.current?.cancel()

    const d = debounce((...args: Parameters<T>) => funcRef.current(...args), delay, {
      leading,
      trailing,
      maxWait,
    })
    activeDebounced.current = d

    const wrappedFunc: DebouncedState<T> = (...args: Parameters<T>) => d(...args)

    wrappedFunc.cancel = () => {
      d.cancel()
    }

    wrappedFunc.isPending = () => d.isPending()

    wrappedFunc.flush = () => {
      return d.flush()
    }

    return wrappedFunc
  }, [delay, leading, trailing, maxWait])

  useUnmount(() => {
    activeDebounced.current?.cancel()
  })

  return debounced
}
