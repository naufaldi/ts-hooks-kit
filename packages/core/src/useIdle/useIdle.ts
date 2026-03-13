import { useEffect, useRef, useState } from 'react'

/**
 * Options for the useIdle hook.
 */
export type UseIdleOptions = {
  /** Events that should reset the idle timer. */
  events?: (keyof WindowEventMap)[]
  /** Whether to start in idle state. */
  initialIdle?: boolean
}

/**
 * Represents the state returned by useIdle hook.
 */
export type IdleState = {
  /** Whether the user is currently idle. */
  idle: boolean
  /** The timestamp of the last user activity. */
  lastActive: number
}

/**
 * Default events that indicate user activity.
 */
const DEFAULT_EVENTS: (keyof WindowEventMap)[] = [
  'mousemove',
  'mousedown',
  'resize',
  'keydown',
  'touchstart',
  'wheel',
]

/**
 * Custom hook that tracks whether the user is idle (no activity for a specified time).
 * @param {number} timeout - The time in milliseconds of inactivity before considering the user idle.
 * @param {UseIdleOptions} [options] - Options for customizing the hook behavior.
 * @returns {IdleState} The current idle state and last activity timestamp.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-idle)
 * @example
 * ```tsx
 * const { idle, lastActive } = useIdle(5000);
 *
 * return (
 *   <div>
 *     <p>{idle ? 'User is idle' : 'User is active'}</p>
 *     <p>Last active: {new Date(lastActive).toLocaleString()}</p>
 *   </div>
 * );
 * ```
 */
export function useIdle(
  timeout: number,
  options: UseIdleOptions = {},
): IdleState {
  const { events = DEFAULT_EVENTS, initialIdle = false } = options

  const [state, setState] = useState<IdleState>({
    idle: initialIdle,
    lastActive: Date.now(),
  })

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const resetIdle = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      setState({
        idle: false,
        lastActive: Date.now(),
      })

      timerRef.current = setTimeout(() => {
        setState(prev => ({ ...prev, idle: true }))
      }, timeout)
    }

    events.forEach(event => {
      window.addEventListener(event, resetIdle)
    })

    // Initial timer
    timerRef.current = setTimeout(() => {
      setState(prev => ({ ...prev, idle: true }))
    }, timeout)

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetIdle)
      })
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [timeout, events])

  return state
}
