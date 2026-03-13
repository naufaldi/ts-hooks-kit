import { act, renderHook } from '@testing-library/react'

import { useStateList } from './useStateList'

describe('useStateList()', () => {
  const stateSet = ['first', 'second', 'third', 'fourth', 'fifth']

  it('should initialize with first state', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    expect(result.current.state).toBe('first')
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isFirst).toBe(true)
    expect(result.current.isLast).toBe(false)
  })

  it('should navigate to next state', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    act(() => {
      result.current.next()
    })

    expect(result.current.state).toBe('second')
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.isFirst).toBe(false)
  })

  it('should navigate to previous state', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    act(() => {
      result.current.next()
      result.current.next()
    })

    expect(result.current.state).toBe('third')

    act(() => {
      result.current.prev()
    })

    expect(result.current.state).toBe('second')
    expect(result.current.currentIndex).toBe(1)
  })

  it('should not go before first state', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    act(() => {
      result.current.prev()
    })

    expect(result.current.state).toBe('first')
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.isFirst).toBe(true)
  })

  it('should not go past last state', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    // Go to last
    act(() => {
      result.current.next()
      result.current.next()
      result.current.next()
      result.current.next()
    })

    expect(result.current.state).toBe('fifth')
    expect(result.current.isLast).toBe(true)

    // Try to go further
    act(() => {
      result.current.next()
    })

    expect(result.current.state).toBe('fifth')
    expect(result.current.currentIndex).toBe(4)
  })

  it('should set state by index', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    act(() => {
      result.current.setStateAt(3)
    })

    expect(result.current.state).toBe('fourth')
    expect(result.current.currentIndex).toBe(3)
  })

  it('should set state by value', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    act(() => {
      result.current.setState('third')
    })

    expect(result.current.state).toBe('third')
    expect(result.current.currentIndex).toBe(2)
  })

  it('should handle isFirst and isLast correctly', () => {
    const { result } = renderHook(() => useStateList(stateSet))

    expect(result.current.isFirst).toBe(true)
    expect(result.current.isLast).toBe(false)

    act(() => {
      result.current.setStateAt(4)
    })

    expect(result.current.isFirst).toBe(false)
    expect(result.current.isLast).toBe(true)
  })

  it('should handle single item list', () => {
    const { result } = renderHook(() => useStateList(['only']))

    expect(result.current.state).toBe('only')
    expect(result.current.isFirst).toBe(true)
    expect(result.current.isLast).toBe(true)

    act(() => {
      result.current.next()
    })

    expect(result.current.state).toBe('only')
  })

  it('should throw when initialized with empty list', () => {
    expect(() => renderHook(() => useStateList([]))).toThrow(
      'useStateList requires at least one state value',
    )
  })
})
