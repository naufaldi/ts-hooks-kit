import { useEffect, useRef } from 'react'

/**
 * Returns the previous value of a variable from the last render.
 * On the first render, returns `undefined` or the provided initial value.
 *
 * @template T - The type of the value being tracked
 * @param value - The current value to track
 * @returns The value from the previous render
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0)
 *   const prevCount = usePrevious(count)
 *
 *   return (
 *     <div>
 *       <p>Now: {count}, before: {prevCount}</p>
 *       <button onClick={() => setCount(c => c + 1)}>Increment</button>
 *     </div>
 *   )
 * }
 * ```
 */
export function usePrevious<T>(value: T): T | undefined
export function usePrevious<T, I>(value: T, initialValue: I): T | I
export function usePrevious<T>(value: T, initialValue?: T): T | undefined {
  const ref = useRef<T | undefined>(initialValue)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
