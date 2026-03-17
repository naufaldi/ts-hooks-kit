import { renderHook, act } from '@testing-library/react'
import { useToggle as useOld } from 'usehooks-ts'
import { useToggle as useNew } from '@ts-hooks-kit/core'

describe('useToggle parity', () => {
  it('returns same initial state', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('toggle produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    act(() => oldR.current[1]())
    act(() => newR.current[1]())
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    expect(newR.current.length).toBe(oldR.current.length)
  })
})
