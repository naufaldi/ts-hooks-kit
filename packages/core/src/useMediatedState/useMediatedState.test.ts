import { act, renderHook } from '@testing-library/react'

import { useMediatedState } from './useMediatedState'

describe('useMediatedState()', () => {
  it('should initialize with initial value', () => {
    const { result } = renderHook(() =>
      useMediatedState((_prev, next) => next, 0)
    )

    expect(result.current[0]).toBe(0)
  })

  it('should apply mediator on state change', () => {
    const { result } = renderHook(() =>
      useMediatedState((_prev, next) => next * 2, 5)
    )

    act(() => {
      result.current[1](10)
    })

    expect(result.current[0]).toBe(20)
  })

  it('should have access to previous state in mediator', () => {
    const { result } = renderHook(() =>
      useMediatedState((prev, next) => prev + next, 0)
    )

    act(() => {
      result.current[1](5)
    })
    expect(result.current[0]).toBe(5)

    act(() => {
      result.current[1](3)
    })
    expect(result.current[0]).toBe(8)
  })

  it('should work with functional update', () => {
    const { result } = renderHook(() =>
      useMediatedState((prev, next) => prev + next, 0)
    )

    act(() => {
      result.current[1](prev => prev + 10)
    })

    expect(result.current[0]).toBe(10)
  })

  it('should work with string mediator', () => {
    const { result } = renderHook(() =>
      useMediatedState((_prev, next) => next.toUpperCase(), '')
    )

    act(() => {
      result.current[1]('hello')
    })

    expect(result.current[0]).toBe('HELLO')
  })
})
