import { act, renderHook } from '@testing-library/react'

import { useSet } from './useSet'

describe('useSet()', () => {
  it('should initialize with empty set by default', () => {
    const { result } = renderHook(() => useSet())

    expect(result.current[0]).toBeInstanceOf(Set)
    expect(result.current[0].size).toBe(0)
    expect(typeof result.current[1].add).toBe('function')
    expect(typeof result.current[1].remove).toBe('function')
    expect(typeof result.current[1].toggle).toBe('function')
    expect(typeof result.current[1].has).toBe('function')
    expect(typeof result.current[1].clear).toBe('function')
    expect(typeof result.current[1].reset).toBe('function')
  })

  it('should initialize with provided initial values', () => {
    const { result } = renderHook(() => useSet(new Set(['a', 'b', 'c'])))

    expect(result.current[0].size).toBe(3)
    expect(result.current[1].has('a')).toBe(true)
    expect(result.current[1].has('b')).toBe(true)
    expect(result.current[1].has('c')).toBe(true)
  })

  it('should initialize with array of values', () => {
    const { result } = renderHook(() => useSet(['a', 'b', 'c']))

    expect(result.current[0].size).toBe(3)
    expect(result.current[1].has('a')).toBe(true)
    expect(result.current[1].has('b')).toBe(true)
    expect(result.current[1].has('c')).toBe(true)
  })

  it('should add value to set', () => {
    const { result } = renderHook(() => useSet<string>())

    act(() => {
      result.current[1].add('hello')
    })

    expect(result.current[0].has('hello')).toBe(true)
    expect(result.current[0].size).toBe(1)
  })

  it('should not add duplicate values', () => {
    const { result } = renderHook(() => useSet<string>())

    act(() => {
      result.current[1].add('hello')
      result.current[1].add('hello')
    })

    expect(result.current[0].size).toBe(1)
  })

  it('should remove value from set', () => {
    const { result } = renderHook(() => useSet(['a', 'b', 'c']))

    act(() => {
      result.current[1].remove('b')
    })

    expect(result.current[0].has('a')).toBe(true)
    expect(result.current[0].has('b')).toBe(false)
    expect(result.current[0].has('c')).toBe(true)
    expect(result.current[0].size).toBe(2)
  })

  it('should check if value exists in set', () => {
    const { result } = renderHook(() => useSet(['a', 'b']))

    expect(result.current[1].has('a')).toBe(true)
    expect(result.current[1].has('b')).toBe(true)
    expect(result.current[1].has('c')).toBe(false)
  })

  it('should toggle value in set', () => {
    const { result } = renderHook(() => useSet(['a']))

    // Toggle existing value should remove it
    act(() => {
      result.current[1].toggle('a')
    })
    expect(result.current[0].has('a')).toBe(false)
    expect(result.current[0].size).toBe(0)

    // Toggle non-existing value should add it
    act(() => {
      result.current[1].toggle('a')
    })
    expect(result.current[0].has('a')).toBe(true)
    expect(result.current[0].size).toBe(1)
  })

  it('should clear all values from set', () => {
    const { result } = renderHook(() => useSet(['a', 'b', 'c']))

    act(() => {
      result.current[1].clear()
    })

    expect(result.current[0].size).toBe(0)
    expect(result.current[1].has('a')).toBe(false)
  })

  it('should reset to initial state', () => {
    const { result } = renderHook(() => useSet(['a', 'b']))

    act(() => {
      result.current[1].add('c')
      result.current[1].remove('a')
    })

    expect(result.current[0].size).toBe(2)

    act(() => {
      result.current[1].reset()
    })

    expect(result.current[0].size).toBe(2)
    expect(result.current[0].has('a')).toBe(true)
    expect(result.current[0].has('b')).toBe(true)
    expect(result.current[0].has('c')).toBe(false)
  })

  it('should work with number values', () => {
    const { result } = renderHook(() => useSet<number>([1, 2, 3]))

    expect(result.current[1].has(1)).toBe(true)

    act(() => {
      result.current[1].add(4)
    })
    expect(result.current[0].size).toBe(4)

    act(() => {
      result.current[1].remove(2)
    })
    expect(result.current[0].size).toBe(3)
  })

  it('should work with object values', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const { result } = renderHook(() => useSet([obj1]))

    expect(result.current[1].has(obj1)).toBe(true)

    act(() => {
      result.current[1].add(obj2)
    })
    expect(result.current[0].size).toBe(2)

    act(() => {
      result.current[1].remove(obj1)
    })
    expect(result.current[0].size).toBe(1)
  })

  it('should maintain stable references for actions', () => {
    const { result, rerender } = renderHook(() => useSet<string>())

    const initialAdd = result.current[1].add
    const initialRemove = result.current[1].remove
    const initialToggle = result.current[1].toggle

    rerender()

    expect(result.current[1].add).toBe(initialAdd)
    expect(result.current[1].remove).toBe(initialRemove)
    expect(result.current[1].toggle).toBe(initialToggle)
  })
})
