import { renderHook } from '@testing-library/react'
import { useScreen as useOld } from 'usehooks-ts'
import { useScreen as useNew } from '@ts-hooks-kit/core'

describe('useScreen parity', () => {
  it('both return a defined value', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(oldR.current).toBeDefined()
    expect(newR.current).toBeDefined()
  })

  it('both return same screen width', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current?.width).toBe(oldR.current?.width)
  })

  it('both return same screen height', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current?.height).toBe(oldR.current?.height)
  })

  it('both return objects with same keys', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    if (oldR.current && newR.current) {
      expect(Object.keys(newR.current).sort()).toEqual(
        Object.keys(oldR.current).sort(),
      )
    }
  })
})
