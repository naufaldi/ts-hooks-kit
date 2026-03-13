import { useCallback, useState } from 'react'

/**
 * Represents the actions available to interact with the set state.
 * @template T - The type of elements in the set.
 */
export type UseSetActions<T> = {
  /** Add a value to the set. */
  add: (value: T) => void
  /** Remove a value from the set. */
  remove: (value: T) => void
  /** Toggle a value in the set (add if not present, remove if present). */
  toggle: (value: T) => void
  /** Check if a value exists in the set. */
  has: (value: T) => boolean
  /** Clear all values from the set. */
  clear: () => void
  /** Reset the set to its initial state. */
  reset: () => void
}

/**
 * Represents the return type of the `useSet` hook.
 * We hide some setters from the returned set to disable autocompletion.
 * @template T - The type of elements in the set.
 */
export type UseSetReturn<T> = [
  Omit<Set<T>, 'add' | 'clear' | 'delete'>,
  UseSetActions<T>,
]

/**
 * Custom hook that manages a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) state with setter actions.
 * @template T - The type of elements in the set.
 * @param {Set<T> | T[]} [initialValue] - The initial value of the set as a Set or an array of values (optional).
 * @returns {UseSetReturn<T>} A tuple containing the set state and actions to interact with the set.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-set)
 * @example
 * ```tsx
 * const [set, setActions] = useSet<string>(['hello']);
 * // Access the `set` state and use `setActions` to add, remove, toggle, or reset values.
 * ```
 */
export function useSet<T>(
  initialValue: Set<T> | T[] = [],
): UseSetReturn<T> {
  const initialSet = initialValue instanceof Set ? initialValue : new Set(initialValue)
  const [set, setSet] = useState(initialSet)

  const actions: UseSetActions<T> = {
    add: useCallback(value => {
      setSet(prev => {
        const copy = new Set(prev)
        copy.add(value)
        return copy
      })
    }, []),

    remove: useCallback(value => {
      setSet(prev => {
        const copy = new Set(prev)
        copy.delete(value)
        return copy
      })
    }, []),

    toggle: useCallback(value => {
      setSet(prev => {
        const copy = new Set(prev)
        if (copy.has(value)) {
          copy.delete(value)
        } else {
          copy.add(value)
        }
        return copy
      })
    }, []),

    has: useCallback(value => set.has(value), [set]),

    clear: useCallback(() => {
      setSet(() => new Set())
    }, []),

    reset: useCallback(() => {
      setSet(() => new Set(initialSet))
    }, []),
  }

  return [set, actions]
}
