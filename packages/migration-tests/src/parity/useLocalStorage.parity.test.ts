import { renderHook, act } from '@testing-library/react'
import { useLocalStorage as useOld } from 'usehooks-ts'
import { useLocalStorage as useNew } from '@ts-hooks-kit/core'

describe('useLocalStorage parity', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns same initial value', () => {
    const { result: oldR } = renderHook(() => useOld('key-old', 'default'))
    const { result: newR } = renderHook(() => useNew('key-new', 'default'))
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld('key-old', 'default'))
    const { result: newR } = renderHook(() => useNew('key-new', 'default'))
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('setValue produces same result', () => {
    const { result: oldR } = renderHook(() => useOld('key-old', 'initial'))
    const { result: newR } = renderHook(() => useNew('key-new', 'initial'))
    act(() => oldR.current[1]('updated'))
    act(() => newR.current[1]('updated'))
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('works with objects', () => {
    const initial = { name: 'test', count: 0 }
    const { result: oldR } = renderHook(() => useOld('obj-old', initial))
    const { result: newR } = renderHook(() => useNew('obj-new', initial))
    expect(newR.current[0]).toEqual(oldR.current[0])
  })
})
