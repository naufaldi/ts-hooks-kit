import { useCallback, useState } from 'react'

/**
 * Custom hook that returns a function to force a component re-render.
 * @returns {() => void} A function that, when called, will force the component to re-render.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-update)
 * @example
 * ```tsx
 * const update = useUpdate();
 *
 * return (
 *   <div>
 *     <p>Current time: {Date.now()}</p>
 *     <button onClick={update}>Update</button>
 *   </div>
 * );
 * ```
 */
export function useUpdate(): () => void {
  const [, setTick] = useState(0)

  const update = useCallback(() => {
    setTick(tick => tick + 1)
  }, [])

  return update
}
