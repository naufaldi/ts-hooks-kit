import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'

import { useThrottle, useThrottleFn } from './useThrottle'

describe('useThrottleFn()', () => {
  it('should throttle function calls', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottleFn(fn, 100))

    // Call multiple times
    act(() => {
      result.current()
      result.current()
      result.current()
    })

    // Should only be called once immediately
    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('should pass arguments to throttled function', () => {
    const fn = vi.fn()
    const { result } = renderHook(() => useThrottleFn(fn, 100))

    act(() => {
      result.current('arg1', 42)
    })

    expect(fn).toHaveBeenCalledWith('arg1', 42)
  })

  it('should return throttled value', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0)
      const throttledCount = useThrottle(count, 100)
      return { count, setCount, throttledCount }
    })

    expect(result.current.throttledCount).toBe(0)

    act(() => {
      result.current.setCount(1)
    })

    // Throttled value updates immediately on first change
    expect(result.current.throttledCount).toBe(1)
  })
})

describe('useThrottle()', () => {
  it('should throttle value updates', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(0)
      const throttledValue = useThrottle(value, 100)
      return { value, setValue, throttledValue }
    })

    expect(result.current.throttledValue).toBe(0)

    act(() => {
      result.current.setValue(1)
    })

    // Value should update immediately on first change
    expect(result.current.throttledValue).toBe(1)
  })
})
