import { useState } from 'react'

import type { Dispatch, SetStateAction } from 'react'

type Listener = () => void

interface Store<S> {
  getState: () => S
  setState: Dispatch<SetStateAction<S>>
  subscribe: (listener: Listener) => () => void
}

function createStore<S>(initialState: S): Store<S> {
  let state = initialState
  const listeners = new Set<Listener>()

  return {
    getState: () => state,
    setState: (next) => {
      const resolvedNext =
        typeof next === 'function'
          ? (next as (prev: S) => S)(state)
          : next

      state = resolvedNext
      listeners.forEach(listener => listener())
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

/**
 * Factory function that creates a global state hook.
 * @param {S} initialState - The initial state.
 * @returns {() => [S, Dispatch<SetStateAction<S>>]} A hook that returns shared state.
 * @public
 * @see [Documentation](https://react-use.vercel.app/createGlobalState)
 * @example
 * ```tsx
 * const useGlobalCounter = createGlobalState(0);
 *
 * // In component A
 * const [count, setCount] = useGlobalCounter();
 *
 * // In component B (same state)
 * const [count, setCount] = useGlobalCounter();
 * ```
 */
export function createGlobalState<S>(
  initialState: S
): () => [S, Dispatch<SetStateAction<S>>] {
  const store: Store<S> = createStore(initialState)

  return function useGlobalState(): [S, Dispatch<SetStateAction<S>>] {
    const [snapshot, setSnapshot] = useState<S>(() => store.getState())

    useState(() => store.subscribe(() => {
      setSnapshot(store.getState())
    }))

    return [snapshot, store.setState]
  }
}
