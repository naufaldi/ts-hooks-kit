import { act, renderHook } from '@testing-library/react'

import { useDebounceCallback } from './useDebounceCallback'

describe('useDebounceCallback()', () => {
  vitest.useFakeTimers()

  it('should debounce the callback', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() => useDebounceCallback(debouncedCallback, delay))

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()

    // Fast forward time by 500 milliseconds
    vitest.advanceTimersByTime(delay)

    // The callback should be invoked after the debounce interval
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
  })

  it('should handle options', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() =>
      useDebounceCallback(debouncedCallback, delay, { leading: true }),
    )

    act(() => {
      result.current('argument')
    })

    // The callback should be invoked immediately due to leading option
    expect(debouncedCallback).toHaveBeenCalledWith('argument')

    // Fast forward time by 500 milliseconds
    vitest.advanceTimersByTime(delay)

    // The callback should not be invoked again after the interval
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
  })

  it('should debounce the callback function', () => {
    const callback = vitest.fn()
    const { result } = renderHook(() => useDebounceCallback(callback, 100))

    act(() => {
      result.current('test1')
      result.current('test2')
      result.current('test3')
    })

    expect(callback).not.toBeCalled()

    // Fast forward time
    vitest.advanceTimersByTime(200)

    expect(callback).toBeCalledTimes(1)
    expect(callback).toBeCalledWith('test3')
  })

  it('should cancel the debounced callback', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() => useDebounceCallback(debouncedCallback, delay))

    act(() => {
      result.current('argument')
      result.current.cancel()
    })

    // Fast forward time
    vitest.advanceTimersByTime(200)

    // The callback should not be invoked after cancellation
    expect(debouncedCallback).not.toHaveBeenCalled()
  })

  it('should flush the debounced callback', () => {
    const delay = 500
    const debouncedCallback = vitest.fn()
    const { result } = renderHook(() => useDebounceCallback(debouncedCallback, delay))

    act(() => {
      result.current('argument')
    })

    // The callback should not be invoked immediately
    expect(debouncedCallback).not.toHaveBeenCalled()

    // Flush the debounced callback
    act(() => {
      result.current.flush()
    })

    // The callback should be invoked immediately after flushing
    expect(debouncedCallback).toHaveBeenCalled()
  })

  it('should debounce when options object is a new literal each render', () => {
    const debouncedCallback = vitest.fn()
    const { result, rerender } = renderHook(() =>
      useDebounceCallback(debouncedCallback, 100, { leading: false, trailing: true }),
    )

    act(() => {
      result.current('a')
    })
    rerender()
    act(() => {
      result.current('b')
    })

    expect(debouncedCallback).not.toHaveBeenCalled()
    vitest.advanceTimersByTime(100)
    expect(debouncedCallback).toHaveBeenCalledTimes(1)
    expect(debouncedCallback).toHaveBeenCalledWith('b')
  })

  it('should report isPending false after cancel', () => {
    const { result } = renderHook(() => useDebounceCallback(vitest.fn(), 100))

    act(() => {
      result.current('x')
      expect(result.current.isPending()).toBe(true)
      result.current.cancel()
      expect(result.current.isPending()).toBe(false)
    })
  })
})
