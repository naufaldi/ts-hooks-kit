import { useCallback, useMemo, useRef, useState } from 'react'

/**
 * Represents the actions available to interact with the queue state.
 * @template T - The type of elements in the queue.
 */
export type UseQueueActions<T> = {
  /** Add a value to the end of the queue. */
  add: (value: T) => void
  /** Remove and return the value from the front of the queue (FIFO). */
  remove: () => T | undefined
  /** Clear all values from the queue. */
  clear: () => void
  /** The first (front) value in the queue. */
  first: T | undefined
  /** The last (back) value in the queue. */
  last: T | undefined
  /** The number of elements in the queue. */
  size: number
}

/**
 * Represents the return type of the `useQueue` hook.
 * @template T - The type of elements in the queue.
 */
export type UseQueueReturn<T> = [T[], UseQueueActions<T>]

/**
 * Custom hook that manages a FIFO (First In, First Out) queue state with setter actions.
 * @template T - The type of elements in the queue.
 * @param {T[]} [initialValue] - The initial array of values for the queue (optional).
 * @returns {UseQueueReturn<T>} A tuple containing the queue state and actions to interact with the queue.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-queue)
 * @example
 * ```tsx
 * const [queue, queueActions] = useQueue<number>([1, 2, 3]);
 * // Access the `queue` array and use `queueActions` to add, remove, or clear values.
 * ```
 */
export function useQueue<T>(initialValue: T[] = []): UseQueueReturn<T> {
  const queueRef = useRef<T[]>(initialValue)
  const [, setTick] = useState(0)

  const update = useCallback(() => {
    setTick(t => t + 1)
  }, [])

  const add = useCallback((value: T) => {
    queueRef.current = [...queueRef.current, value]
    update()
  }, [update])

  const remove = useCallback(() => {
    if (queueRef.current.length === 0) return undefined
    const [first, ...rest] = queueRef.current
    queueRef.current = rest
    update()
    return first
  }, [update])

  const clear = useCallback(() => {
    queueRef.current = []
    update()
  }, [update])

  const actions = useMemo(
    () => ({
      add,
      remove,
      clear,
      get first() {
        return queueRef.current[0]
      },
      get last() {
        return queueRef.current[queueRef.current.length - 1]
      },
      get size() {
        return queueRef.current.length
      },
    }),
    [add, clear, remove],
  )

  return [queueRef.current, actions]
}
