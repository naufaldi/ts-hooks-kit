import { act, renderHook } from '@testing-library/react'

import { useNetwork } from './useNetwork'

describe('useNetwork()', () => {
  const mockOnline = (online: boolean) => {
    Object.defineProperty(navigator, 'onLine', {
      writable: true,
      configurable: true,
      value: online,
    })
  }

  it('should return initial online status', () => {
    mockOnline(true)
    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(true)
    expect(result.current.effectiveType).toBeUndefined()
    expect(result.current.downlink).toBeUndefined()
  })

  it('should return offline status', () => {
    mockOnline(false)
    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(false)
  })

  it('should update on online event', () => {
    mockOnline(false)
    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(false)

    mockOnline(true)
    act(() => {
      window.dispatchEvent(new Event('online'))
    })

    expect(result.current.online).toBe(true)
  })

  it('should update on offline event', () => {
    mockOnline(true)
    const { result } = renderHook(() => useNetwork())

    expect(result.current.online).toBe(true)

    mockOnline(false)
    act(() => {
      window.dispatchEvent(new Event('offline'))
    })

    expect(result.current.online).toBe(false)
  })
})
