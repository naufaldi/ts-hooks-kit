import { renderHook, act } from '@testing-library/react'
import { useSessionStorage as useOld } from 'usehooks-ts'
import { useSessionStorage as useNew } from '@ts-hooks-kit/core'

describe('useSessionStorage parity', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('returns same initial value', () => {
    const { result: oldR } = renderHook(() =>
      useOld('ss-old', 'default'),
    )
    const { result: newR } = renderHook(() =>
      useNew('ss-new', 'default'),
    )
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() =>
      useOld('ss-old', 'default'),
    )
    const { result: newR } = renderHook(() =>
      useNew('ss-new', 'default'),
    )
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('setValue produces same result', () => {
    const { result: oldR } = renderHook(() =>
      useOld('ss-old', 'initial'),
    )
    const { result: newR } = renderHook(() =>
      useNew('ss-new', 'initial'),
    )
    act(() => oldR.current[1]('updated'))
    act(() => newR.current[1]('updated'))
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('works with objects', () => {
    const initial = { name: 'test', count: 0 }
    const { result: oldR } = renderHook(() =>
      useOld('obj-old', initial),
    )
    const { result: newR } = renderHook(() =>
      useNew('obj-new', initial),
    )
    expect(newR.current[0]).toEqual(oldR.current[0])
  })
})
