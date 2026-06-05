import { renderHook } from '@testing-library/react'
import { useIntersectionObserver as useOld } from 'usehooks-ts'
import { useIntersectionObserver as useNew } from '@ts-hooks-kit/core'

describe('useIntersectionObserver parity', () => {
  beforeEach(() => {
    const mockObserve = vi.fn()
    const mockDisconnect = vi.fn()
    const mockUnobserve = vi.fn()
    window.IntersectionObserver = vi.fn().mockImplementation(() => ({
      observe: mockObserve,
      disconnect: mockDisconnect,
      unobserve: mockUnobserve,
      thresholds: [0],
    })) as unknown as typeof IntersectionObserver
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('ref is a function', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(typeof oldR.current[0]).toBe('function')
    expect(typeof newR.current[0]).toBe('function')
  })

  it('initial isIntersecting is false', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(oldR.current[1]).toBe(false)
    expect(newR.current[1]).toBe(false)
  })

  it('initial entry is undefined', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(oldR.current[2]).toBeUndefined()
    expect(newR.current[2]).toBeUndefined()
  })
})
