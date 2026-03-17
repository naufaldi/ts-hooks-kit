import { useCallback, useState } from 'react'

/** The hook return type. */
export type UseStateWithHistoryReturn<T> = {
  /** The current value. */
  value: T
  /** Array of previous values. */
  history: T[]
  /** Function to go back to previous value. */
  back: () => void
  /** Function to go forward to next value. */
  forward: () => void
  /** Function to go to specific index in history. */
  go: (index: number) => void
  /** Current history index. */
  currentIndex: number
}

/**
 * Custom hook that stores previous state values and provides navigation.
 * @param {T} initialValue - The initial value.
 * @param {number} [capacity=10] - Maximum number of history entries to store.
 * @returns {UseStateWithHistoryReturn<T>} An object containing value, history, and navigation functions.
 * @public
 * @see [Documentation](https://react-use.vercel.app/useStateWithHistory)
 * @example
 * ```tsx
 * const { value, history, back, forward, go } = useStateWithHistory('hello', 10);
 * ```
 */
export function useStateWithHistory<T>(
  initialValue: T,
  capacity = 10
): UseStateWithHistoryReturn<T> {
  const [history, setHistory] = useState<T[]>([initialValue])
  const [currentIndex, setCurrentIndex] = useState(0)

  const value = history[currentIndex] as T

  const back = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1))
  }, [])

  const forward = useCallback(() => {
    setCurrentIndex(prev => Math.min(history.length - 1, prev + 1))
  }, [history.length])

  const go = useCallback((index: number) => {
    const clampedIndex = Math.max(0, Math.min(history.length - 1, index))
    setCurrentIndex(clampedIndex)
  }, [history.length])

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(value)
          : newValue

      setHistory(prev => {
        const newHistory = prev.slice(0, currentIndex + 1)
        newHistory.push(resolvedValue)
        if (newHistory.length > capacity) {
          newHistory.shift()
          return newHistory
        }
        return newHistory
      })
      setCurrentIndex(prev => Math.min(prev + 1, capacity - 1))
    },
    [value, currentIndex, capacity]
  )

  return {
    value,
    history,
    back,
    forward,
    go,
    currentIndex,
  }
}
