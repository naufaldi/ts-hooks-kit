import { useEffect } from 'react'

/**
 * Custom hook that invokes a callback when the user's mouse leaves the page.
 * @param {() => void} handler - The callback function to invoke when the mouse leaves the page.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-page-leave)
 * @example
 * ```tsx
 * usePageLeave(() => {
 *   console.log('User is leaving the page');
 *   // Show "Don't leave!" modal or save draft
 * });
 * ```
 */
export function usePageLeave(handler: () => void): void {
  useEffect(() => {
    if (!handler) return

    const handleMouseLeave = () => {
      handler()
    }

    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handler])
}
