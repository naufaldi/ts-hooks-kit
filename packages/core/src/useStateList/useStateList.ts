import { useCallback, useRef, useState } from 'react'

/**
 * Represents the state and actions returned by useStateList hook.
 * @template T - The type of the state values.
 */
export type UseStateListReturn<T> = {
  /** The current state value. */
  state: T
  /** The current index in the state list. */
  currentIndex: number
  /** Whether the current state is the first in the list. */
  isFirst: boolean
  /** Whether the current state is the last in the list. */
  isLast: boolean
  /** Navigate to the previous state. */
  prev: () => void
  /** Navigate to the next state. */
  next: () => void
  /** Set the state by index. */
  setStateAt: (index: number) => void
  /** Set the state by value. */
  setState: (state: T) => void
}

/**
 * Custom hook for navigating through a list of states.
 * Useful for step-by-step flows, carousels, or multi-step forms.
 * @template T - The type of the state values.
 * @param {T[]} stateSet - The array of possible states.
 * @returns {UseStateListReturn<T>} The current state and navigation functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-state-list)
 * @example
 * ```tsx
 * const states = ['step1', 'step2', 'step3'];
 * const { state, next, prev, isFirst, isLast } = useStateList(states);
 *
 * return (
 *   <div>
 *     <p>Current: {state}</p>
 *     <button onClick={prev} disabled={isFirst}>Back</button>
 *     <button onClick={next} disabled={isLast}>Next</button>
 *   </div>
 * );
 * ```
 */
export function useStateList<T>(stateSet: T[]): UseStateListReturn<T> {
  if (stateSet.length === 0) {
    throw new Error('useStateList requires at least one state value')
  }

  const stateSetRef = useRef(stateSet)
  const [currentIndex, setCurrentIndex] = useState(0)

  const state = stateSetRef.current[currentIndex]!
  const isFirst = currentIndex === 0
  const isLast = currentIndex === stateSetRef.current.length - 1

  const prev = useCallback(() => {
    setCurrentIndex(index => (index > 0 ? index - 1 : index))
  }, [])

  const next = useCallback(() => {
    setCurrentIndex(index =>
      index < stateSetRef.current.length - 1 ? index + 1 : index,
    )
  }, [])

  const setStateAt = useCallback((index: number) => {
    if (index >= 0 && index < stateSetRef.current.length) {
      setCurrentIndex(index)
    }
  }, [])

  const setState = useCallback((newState: T) => {
    const index = stateSetRef.current.indexOf(newState)
    if (index !== -1) {
      setCurrentIndex(index)
    }
  }, [])

  return {
    state,
    currentIndex,
    isFirst,
    isLast,
    prev,
    next,
    setStateAt,
    setState,
  }
}
