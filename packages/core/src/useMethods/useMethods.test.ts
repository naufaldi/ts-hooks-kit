import { act, renderHook } from '@testing-library/react'

import { useMethods } from './useMethods'

type State = { count: number; text: string }

describe('useMethods()', () => {
  it('should initialize with initial state', () => {
    const { result } = renderHook(() =>
      useMethods<State>(
        { count: 0, text: '' },
        {}
      )
    )

    expect(result.current[0]).toEqual({ count: 0, text: '' })
  })

  it('should call method and update state', () => {
    const { result } = renderHook(() =>
      useMethods<{ count: number }>(
        { count: 0 },
        {
          increment: (state) => ({ count: state.count + 1 }),
        }
      )
    )

    act(() => {
      result.current[1].increment()
    })

    expect(result.current[0].count).toBe(1)
  })

  it('should handle multiple methods', () => {
    const { result } = renderHook(() =>
      useMethods<State>(
        { count: 0, text: '' },
        {
          increment: (state) => ({ count: state.count + 1 }),
          decrement: (state) => ({ count: state.count - 1 }),
          setText: (_state, text: string) => ({ text }),
        }
      )
    )

    act(() => {
      result.current[1].increment()
      result.current[1].increment()
      result.current[1].setText('hello')
    })

    expect(result.current[0]).toEqual({ count: 2, text: 'hello' })
  })

  it('should preserve state when updating with partial', () => {
    const { result } = renderHook(() =>
      useMethods<State>(
        { count: 0, text: 'initial' },
        {
          increment: (state) => ({ count: state.count + 1 }),
        }
      )
    )

    act(() => {
      result.current[1].increment()
    })

    expect(result.current[0].text).toBe('initial')
  })
})
