import { useRef } from 'react'

/** The hook return type. */
export type UseRendersCountReturn = number

/**
 * Custom hook that returns the number of times a component has rendered.
 * @returns {UseRendersCountReturn} The render count.
 * @public
 * @see [Documentation](https://react-use.vercel.app/useRendersCount)
 * @example
 * ```tsx
 * const count = useRendersCount();
 * ```
 */
export function useRendersCount(): UseRendersCountReturn {
  const countRef = useRef(0)
  countRef.current += 1
  return countRef.current
}
