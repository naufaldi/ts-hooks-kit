import { act, renderHook } from '@testing-library/react'

import { useQueue } from './useQueue'

describe('useQueue()', () => {
  it('should initialize with empty queue by default', () => {
    const { result } = renderHook(() => useQueue())

    expect(result.current[0]).toEqual([])
    expect(typeof result.current[1].add).toBe('function')
    expect(typeof result.current[1].remove).toBe('function')
    expect(typeof result.current[1].clear).toBe('function')
    expect(result.current[1].first).toBeUndefined()
    expect(result.current[1].last).toBeUndefined()
    expect(result.current[1].size).toBe(0)
  })

  it('should initialize with provided initial values', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]))

    expect(result.current[0]).toEqual([1, 2, 3])
    expect(result.current[1].first).toBe(1)
    expect(result.current[1].last).toBe(3)
    expect(result.current[1].size).toBe(3)
  })

  it('should add value to end of queue', () => {
    const { result } = renderHook(() => useQueue<number>())

    act(() => {
      result.current[1].add(1)
    })
    expect(result.current[0]).toEqual([1])

    act(() => {
      result.current[1].add(2)
    })
    expect(result.current[0]).toEqual([1, 2])

    act(() => {
      result.current[1].add(3)
    })
    expect(result.current[0]).toEqual([1, 2, 3])
  })

  it('should remove value from front of queue (FIFO)', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]))

    act(() => {
      const removed = result.current[1].remove()
      expect(removed).toBe(1)
    })

    expect(result.current[0]).toEqual([2, 3])
    expect(result.current[1].first).toBe(2)
    expect(result.current[1].last).toBe(3)
  })

  it('should return undefined when removing from empty queue', () => {
    const { result } = renderHook(() => useQueue<number>())

    act(() => {
      const removed = result.current[1].remove()
      expect(removed).toBeUndefined()
    })

    expect(result.current[0]).toEqual([])
  })

  it('should clear all values from queue', () => {
    const { result } = renderHook(() => useQueue([1, 2, 3]))

    act(() => {
      result.current[1].clear()
    })

    expect(result.current[0]).toEqual([])
    expect(result.current[1].size).toBe(0)
    expect(result.current[1].first).toBeUndefined()
    expect(result.current[1].last).toBeUndefined()
  })

  it('should work with string values', () => {
    const { result } = renderHook(() => useQueue(['a', 'b']))

    expect(result.current[1].first).toBe('a')
    expect(result.current[1].last).toBe('b')

    act(() => {
      result.current[1].add('c')
    })
    expect(result.current[0]).toEqual(['a', 'b', 'c'])

    let removed: string | undefined
    act(() => {
      removed = result.current[1].remove()
    })
    expect(removed).toBe('a')
    expect(result.current[0]).toEqual(['b', 'c'])
  })

  it('should work with object values', () => {
    const obj1 = { id: 1 }
    const obj2 = { id: 2 }
    const obj3 = { id: 3 }

    const { result } = renderHook(() => useQueue([obj1, obj2]))

    expect(result.current[1].size).toBe(2)

    act(() => {
      result.current[1].add(obj3)
    })
    expect(result.current[0]).toEqual([obj1, obj2, obj3])

    act(() => {
      const removed = result.current[1].remove()
      expect(removed).toBe(obj1)
    })
    expect(result.current[0]).toEqual([obj2, obj3])
  })

  it('should handle multiple add and remove operations', () => {
    const { result } = renderHook(() => useQueue<number>())

    // Add items
    act(() => result.current[1].add(1))
    act(() => result.current[1].add(2))
    act(() => result.current[1].add(3))
    expect(result.current[0]).toEqual([1, 2, 3])

    // Remove items
    act(() => result.current[1].remove())
    expect(result.current[0]).toEqual([2, 3])

    // Add more
    act(() => result.current[1].add(4))
    expect(result.current[0]).toEqual([2, 3, 4])

    // Remove more
    act(() => result.current[1].remove())
    act(() => result.current[1].remove())
    expect(result.current[0]).toEqual([4])

    // Add again
    act(() => result.current[1].add(5))
    expect(result.current[0]).toEqual([4, 5])
  })

  it('should maintain stable references for actions', () => {
    const { result, rerender } = renderHook(() => useQueue<number>())

    const initialAdd = result.current[1].add
    const initialRemove = result.current[1].remove
    const initialClear = result.current[1].clear

    rerender()

    expect(result.current[1].add).toBe(initialAdd)
    expect(result.current[1].remove).toBe(initialRemove)
    expect(result.current[1].clear).toBe(initialClear)
  })

  it('should return undefined for first and last on empty queue', () => {
    const { result } = renderHook(() => useQueue<number>())

    expect(result.current[1].first).toBeUndefined()
    expect(result.current[1].last).toBeUndefined()
  })

  it('should return same value for first and last when queue has one item', () => {
    const { result } = renderHook(() => useQueue([42]))

    expect(result.current[1].first).toBe(42)
    expect(result.current[1].last).toBe(42)
    expect(result.current[1].first).toBe(result.current[1].last)
  })
})
