import { useEffect, useRef } from 'react'

/**
 * A hook that runs an effect only when dependencies change, skipping the initial mount.
 * This is useful for responding to prop or state changes without running on first render.
 *
 * @param {() => void | (() => void)} effect - The effect function to run.
 * @param {unknown[]} deps - The dependency array.
 *
 * @example
 * ```tsx
 * function Component({ value }) {
 *   useUpdateEffect(() => {
 *     console.log('Value changed:', value);
 *   }, [value]);
 *
 *   return <div>{value}</div>;
 * }
 * ```
 */
export function useUpdateEffect(
  effect: () => void | (() => void),
  deps: unknown[],
): void {
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }

    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
