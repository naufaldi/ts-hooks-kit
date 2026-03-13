import { useCallback, useRef, useState } from 'react'

/**
 * Represents the actions available to interact with the list state.
 * @template T - The type of elements in the list.
 */
export type UseListActions<T> = {
  /** Set a new list. */
  set: (list: T[]) => void
  /** Add value(s) to the end of the list. */
  push: (...values: T[]) => void
  /** Update value at a specific index. */
  updateAt: (index: number, value: T) => void
  /** Insert value at a specific index. */
  insertAt: (index: number, value: T) => void
  /** Remove value at a specific index. */
  removeAt: (index: number) => void
  /** Clear all values from the list. */
  clear: () => void
  /** Reset the list to its initial state. */
  reset: () => void
}

/**
 * Represents the return type of the `useList` hook.
 * @template T - The type of elements in the list.
 */
export type UseListReturn<T> = [T[], UseListActions<T>]

/**
 * Custom hook that manages a list state with setter actions.
 * @template T - The type of elements in the list.
 * @param {T[]} [initialValue] - The initial array of values for the list (optional).
 * @returns {UseListReturn<T>} A tuple containing the list state and actions to interact with the list.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-list)
 * @example
 * ```tsx
 * const [list, listActions] = useList<number>([1, 2, 3]);
 * // Access the `list` array and use `listActions` to push, updateAt, removeAt, or reset values.
 * ```
 */
export function useList<T>(initialValue: T[] = []): UseListReturn<T> {
  const initialListRef = useRef(initialValue)
  const [list, setList] = useState<T[]>(initialValue)

  const set = useCallback((newList: T[]) => {
    setList(newList)
  }, [])

  const push = useCallback((...values: T[]) => {
    setList(prev => [...prev, ...values])
  }, [])

  const updateAt = useCallback((index: number, value: T) => {
    setList(prev => {
      if (index < 0 || index >= prev.length) return prev
      const copy = [...prev]
      copy[index] = value
      return copy
    })
  }, [])

  const insertAt = useCallback((index: number, value: T) => {
    setList(prev => {
      if (index < 0 || index > prev.length) return prev
      const copy = [...prev]
      copy.splice(index, 0, value)
      return copy
    })
  }, [])

  const removeAt = useCallback((index: number) => {
    setList(prev => {
      if (index < 0 || index >= prev.length) return prev
      const copy = [...prev]
      copy.splice(index, 1)
      return copy
    })
  }, [])

  const clear = useCallback(() => {
    setList([])
  }, [])

  const reset = useCallback(() => {
    setList([...initialListRef.current])
  }, [])

  const actions: UseListActions<T> = {
    set,
    push,
    updateAt,
    insertAt,
    removeAt,
    clear,
    reset,
  }

  return [list, actions]
}
