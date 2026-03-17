import { renderHook } from '@testing-library/react'
import { useIsMounted as useOld } from 'usehooks-ts'
import { useIsMounted as useNew } from '@ts-hooks-kit/core'

describe('useIsMounted parity', () => {
  it('returns same type (function)', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(typeof newR.current).toBe(typeof oldR.current)
  })

  it('returns same value when mounted', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current()).toBe(oldR.current())
  })

  it('returns same value after unmount', () => {
    const { result: oldR, unmount: unmountOld } = renderHook(() => useOld())
    const { result: newR, unmount: unmountNew } = renderHook(() => useNew())
    unmountOld()
    unmountNew()
    expect(newR.current()).toBe(oldR.current())
  })
})
