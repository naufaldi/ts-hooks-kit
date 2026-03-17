import { renderHook } from '@testing-library/react'
import { useDebounceValue as useOld } from 'usehooks-ts'
import { useDebounceValue as useNew } from '@ts-hooks-kit/core'

describe('useDebounceValue parity', () => {
  it('returns same initial value', () => {
    const { result: oldR } = renderHook(() => useOld('hello', 500))
    const { result: newR } = renderHook(() => useNew('hello', 500))
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld('hello', 500))
    const { result: newR } = renderHook(() => useNew('hello', 500))
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('update function has same type', () => {
    const { result: oldR } = renderHook(() => useOld('hello', 500))
    const { result: newR } = renderHook(() => useNew('hello', 500))
    expect(typeof newR.current[1]).toBe(typeof oldR.current[1])
  })
})
