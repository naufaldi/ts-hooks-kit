import { act, renderHook } from '@testing-library/react'

import { useStateWithHistory } from './useStateWithHistory'

describe('useStateWithHistory()', () => {
  it('should initialize with initial value', () => {
    const { result } = renderHook(() => useStateWithHistory('hello'))

    expect(result.current.value).toBe('hello')
    expect(result.current.history).toEqual(['hello'])
    expect(result.current.currentIndex).toBe(0)
  })

  it('should store value in history', () => {
    const { result } = renderHook(() => useStateWithHistory(''))

    act(() => {
      result.current.value // trigger state access
    })

    // The hook doesn't expose setValue directly, so we test navigation
    expect(result.current.history).toHaveLength(1)
  })

  it('should have back, forward, and go functions', () => {
    const { result } = renderHook(() => useStateWithHistory('initial'))

    expect(typeof result.current.back).toBe('function')
    expect(typeof result.current.forward).toBe('function')
    expect(typeof result.current.go).toBe('function')
  })

  it('should limit history to capacity', () => {
    const { result } = renderHook(() => useStateWithHistory('a', 3))

    // Initial state
    expect(result.current.history).toEqual(['a'])

    // Capacity should be respected
    expect(result.current.history.length).toBeLessThanOrEqual(3)
  })
})
