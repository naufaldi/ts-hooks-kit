/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

/** The state type. */
export type State = Record<string, unknown>

/** The method type. */
type Method<S extends State> = (state: S, ...args: any[]) => Partial<S>

/** The methods object type. */
export type Methods<S extends State> = {
  [key: string]: Method<S>
}

/** The hook return type. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UseMethodsReturn<S extends State> = [S, Record<string, any>]

/**
 * Custom hook that manages state with method-based updates.
 * @param {S} initialState - The initial state.
 * @param {Methods<S>} methods - An object containing state mutation methods.
 * @returns {UseMethodsReturn<S>} A tuple containing the state and methods.
 * @public
 * @see [Documentation](https://react-use.vercel.app/useMethods)
 * @example
 * ```tsx
 * const [state, methods] = useMethods(
 *   { count: 0, text: '' },
 *   {
 *     increment: (state) => ({ count: state.count + 1 }),
 *     setText: (state, text: string) => ({ text }),
 *   }
 * );
 * ```
 */
export function useMethods<S extends State>(
  initialState: S,
  methods: Methods<S>
): UseMethodsReturn<S> {
  const [state, setState] = useState<S>(initialState)

  const wrappedMethods: Record<string, any> = {}
  for (const key of Object.keys(methods)) {
    wrappedMethods[key] = (...args: any[]) => {
      setState((currentState) => {
        const method = (methods as Record<string, Method<S>>)[key]
        const updates = method!(currentState, ...args)
        return { ...currentState, ...updates }
      })
    }
  }

  return [state, wrappedMethods]
}
