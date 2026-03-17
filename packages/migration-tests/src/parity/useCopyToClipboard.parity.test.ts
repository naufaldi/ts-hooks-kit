import { renderHook } from '@testing-library/react'
import { useCopyToClipboard as useOld } from 'usehooks-ts'
import { useCopyToClipboard as useNew } from '@ts-hooks-kit/core'

describe('useCopyToClipboard parity', () => {
  it('returns same initial state', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('copy function has same type', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(typeof newR.current[1]).toBe(typeof oldR.current[1])
  })
})
