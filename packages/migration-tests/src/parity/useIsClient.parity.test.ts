import { renderHook } from '@testing-library/react'
import { useIsClient as useOld } from 'usehooks-ts'
import { useIsClient as useNew } from '@ts-hooks-kit/core'

describe('useIsClient parity', () => {
  it('returns same value', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current).toBe(oldR.current)
  })

  it('returns same type', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(typeof newR.current).toBe(typeof oldR.current)
  })
})
