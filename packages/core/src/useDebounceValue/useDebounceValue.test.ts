import { act, renderHook } from '@testing-library/react'

import { useDebounceValue } from './useDebounceValue'

describe('useDebounceValue()', () => {
  vitest.useFakeTimers()

  it('should debounce the value update', () => {
    const { result } = renderHook(() => useDebounceValue('initial', 100))

    expect(result.current[0]).toBe('initial')

    act(() => {
      result.current[1]('update1')
      result.current[1]('update2')
      result.current[1]('update3')
    })

    expect(result.current[0]).toBe('initial')

    // Advance timers by more than delay
    act(() => {
      vitest.advanceTimersByTime(200)
    })

    expect(result.current[0]).toBe('update3')

    // Advance timers by more than delay again
    act(() => {
      vitest.advanceTimersByTime(200)
    })

    expect(result.current[0]).toBe('update3')
  })

  it('should default delay to 500ms when omitted', () => {
    const { result } = renderHook(() => useDebounceValue('initial'))

    act(() => {
      result.current[1]('updated')
    })

    // Should not update before 500ms
    act(() => {
      vitest.advanceTimersByTime(400)
    })
    expect(result.current[0]).toBe('initial')

    // Should update after 500ms
    act(() => {
      vitest.advanceTimersByTime(200)
    })
    expect(result.current[0]).toBe('updated')
  })

  it('should handle options', () => {
    const delay = 500
    const { result } = renderHook(() => useDebounceValue('initial', delay, { leading: true }))

    expect(result.current[0]).toBe('initial')

    act(() => {
      result.current[1]('updated')
    })

    // The debounced value should be updated immediately due to leading option
    expect(result.current[0]).toBe('updated')

    // Wait for the debounce interval to elapse
    vitest.advanceTimersByTime(delay)

    // The debounced value should not be updated again after the interval
    expect(result.current[0]).toBe('updated')
  })
})
