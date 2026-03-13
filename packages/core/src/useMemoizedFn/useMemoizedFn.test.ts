import { renderHook } from '@testing-library/react'
import { useState } from 'react'

import { useMemoizedFn } from './useMemoizedFn'

describe('useMemoizedFn()', () => {
  it('should return a memoized function', () => {
    const fn = vi.fn()
    const { result, rerender } = renderHook(() => useMemoizedFn(fn))

    const firstRenderFn = result.current

    rerender()

    expect(result.current).toBe(firstRenderFn)
  })

  it('should call the latest function when invoked', () => {
    const callHistory: number[] = []

    const { result, rerender } = renderHook(
      ({ value }) => {
        const fn = () => {
          callHistory.push(value)
          return value
        }
        const memoizedFn = useMemoizedFn(fn)
        return { memoizedFn }
      },
      { initialProps: { value: 1 } },
    )

    // First render
    expect(result.current.memoizedFn()).toBe(1)
    expect(callHistory).toEqual([1])

    // Rerender with new value
    rerender({ value: 2 })

    // Should call the new function with value 2
    expect(result.current.memoizedFn()).toBe(2)
    expect(callHistory).toEqual([1, 2])
  })

  it('should maintain stable reference across renders', () => {
    const { result, rerender } = renderHook(() => {
      const [count, setCount] = useState(0)
      const memoizedFn = useMemoizedFn(() => count)
      return { count, setCount, memoizedFn }
    })

    const firstFn = result.current.memoizedFn

    rerender()
    const secondFn = result.current.memoizedFn

    rerender()
    const thirdFn = result.current.memoizedFn

    expect(firstFn).toBe(secondFn)
    expect(secondFn).toBe(thirdFn)
  })

  it('should pass arguments correctly', () => {
    const fn = vi.fn((a: number, b: number) => a + b)
    const { result } = renderHook(() => useMemoizedFn(fn))

    expect(result.current(2, 3)).toBe(5)
    expect(fn).toHaveBeenCalledWith(2, 3)
  })

  it('should work with void functions', () => {
    let called = false
    const fn = () => {
      called = true
    }
    const { result, rerender } = renderHook(() => useMemoizedFn(fn))

    const memoizedFn = result.current
    rerender()

    memoizedFn()
    expect(called).toBe(true)
  })
})
