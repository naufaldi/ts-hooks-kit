import { act, renderHook } from '@testing-library/react'

import { useList } from './useList'

describe('useList()', () => {
  it('should initialize with empty array by default', () => {
    const { result } = renderHook(() => useList())

    expect(result.current[0]).toEqual([])
    expect(typeof result.current[1].set).toBe('function')
    expect(typeof result.current[1].push).toBe('function')
    expect(typeof result.current[1].updateAt).toBe('function')
    expect(typeof result.current[1].insertAt).toBe('function')
    expect(typeof result.current[1].removeAt).toBe('function')
    expect(typeof result.current[1].clear).toBe('function')
    expect(typeof result.current[1].reset).toBe('function')
  })

  it('should initialize with provided initial values', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))

    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should set new list', () => {
    const { result } = renderHook(() => useList<number>())

    act(() => {
      result.current[1].set([4, 5, 6])
    })

    expect(result.current[0]).toEqual([4, 5, 6])
  })

  it('should push value to end of list', () => {
    const { result } = renderHook(() => useList([1, 2]))

    act(() => {
      result.current[1].push(3)
    })

    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should push multiple values', () => {
    const { result } = renderHook(() => useList([1]))

    act(() => {
      result.current[1].push(2, 3, 4)
    })

    expect(result.current[0]).toEqual([1, 2, 3, 4])
  })

  it('should update value at specific index', () => {
    const { result } = renderHook(() => useList(['a', 'b', 'c']))

    act(() => {
      result.current[1].updateAt(1, 'x')
    })

    expect(result.current[0]).toEqual(['a', 'x', 'c'])
  })

  it('should insert value at specific index', () => {
    const { result } = renderHook(() => useList([1, 3]))

    act(() => {
      result.current[1].insertAt(1, 2)
    })

    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should remove value at specific index', () => {
    const { result } = renderHook(() => useList([1, 2, 3, 4]))

    act(() => {
      result.current[1].removeAt(1)
    })

    expect(result.current[0]).toEqual([1, 3, 4])
  })

  it('should clear all values', () => {
    const { result } = renderHook(() => useList([1, 2, 3]))

    act(() => {
      result.current[1].clear()
    })

    expect(result.current[0]).toEqual([])
  })

  it('should reset to initial state', () => {
    const { result } = renderHook(() => useList([1, 2]))

    act(() => {
      result.current[1].push(3)
      result.current[1].removeAt(0)
    })

    expect(result.current[0]).toEqual([2, 3])

    act(() => {
      result.current[1].reset()
    })

    expect(result.current[0]).toEqual([1, 2])
  })
})
