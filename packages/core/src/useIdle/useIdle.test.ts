import { act, renderHook } from '@testing-library/react'

import { useIdle } from './useIdle'

describe('useIdle()', () => {
  it('should start as not idle', () => {
    const { result } = renderHook(() => useIdle(5000))

    expect(result.current.idle).toBe(false)
    expect(typeof result.current.lastActive).toBe('number')
  })

  it('should reset idle on activity', () => {
    const { result } = renderHook(() => useIdle(100))

    expect(result.current.idle).toBe(false)

    act(() => {
      document.dispatchEvent(new MouseEvent('mousemove'))
    })

    expect(result.current.idle).toBe(false)
  })

  it('should respect custom events', () => {
    const { result } = renderHook(() => useIdle(100, { events: ['mousedown'] }))

    act(() => {
      document.dispatchEvent(new MouseEvent('mousedown'))
    })

    expect(result.current.idle).toBe(false)
  })
})
