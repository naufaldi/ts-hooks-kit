import { useRef } from 'react'

/** The hook return type. */
export type UseFirstMountStateReturn = boolean

/**
 * Custom hook that returns true on the first render, false thereafter.
 * @returns {UseFirstMountStateReturn} True if this is the first mount.
 * @public
 * @see [Documentation](https://react-use.vercel.app/useFirstMountState)
 * @example
 * ```tsx
 * const isFirst = useFirstMountState();
 * ```
 */
export function useFirstMountState(): UseFirstMountStateReturn {
  const isFirst = useRef(true)

  if (isFirst.current) {
    isFirst.current = false
    return true
  }

  return false
}
