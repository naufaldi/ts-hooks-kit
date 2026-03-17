import { useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

/** The mediator function type. */
export type Mediator<S> = (prev: S, next: S) => S

/** The hook return type. */
export type UseMediatedStateReturn<S> = [S, Dispatch<SetStateAction<S>>]

/**
 * Custom hook that manages state with a mediator function that transforms values.
 * @param {Mediator<S>} mediator - Function to transform the value before setting state.
 * @param {S} initialValue - The initial value.
 * @returns {UseMediatedStateReturn<S>} A tuple containing the state and setter.
 * @public
 * @see [Documentation](https://react-use.vercel.app/useMediatedState)
 * @example
 * ```tsx
 * const [value, setValue] = useMediatedState((prev, next) => next.toUpperCase(), '');
 * setValue('hello') // value becomes 'HELLO'
 * ```
 */
export function useMediatedState<S>(
  mediator: Mediator<S>,
  initialValue: S
): UseMediatedStateReturn<S> {
  const [state, setState] = useState(initialValue)

  const setMediatedState: Dispatch<SetStateAction<S>> = (next) => {
    const resolvedNext =
      typeof next === 'function'
        ? (next as (prev: S) => S)(state)
        : next

    setState(() => mediator(state, resolvedNext))
  }

  return [state, setMediatedState]
}
