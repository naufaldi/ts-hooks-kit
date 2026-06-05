import { renderHook, act } from '@testing-library/react'
import { useMap as useOld } from 'usehooks-ts'
import { useMap as useNew } from '@ts-hooks-kit/core'

describe('useMap parity', () => {
  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld<string, number>())
    const { result: newR } = renderHook(() => useNew<string, number>())
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('returns same initial empty map size', () => {
    const { result: oldR } = renderHook(() => useOld<string, number>())
    const { result: newR } = renderHook(() => useNew<string, number>())
    expect(newR.current[0].size).toBe(oldR.current[0].size)
  })

  it('returns same initial map with entries', () => {
    const entries: [string, number][] = [['a', 1], ['b', 2]]
    const { result: oldR } = renderHook(() => useOld(entries))
    const { result: newR } = renderHook(() => useNew(entries))
    expect(newR.current[0].get('a')).toBe(oldR.current[0].get('a'))
    expect(newR.current[0].get('b')).toBe(oldR.current[0].get('b'))
  })

  it('actions have same keys', () => {
    const { result: oldR } = renderHook(() => useOld<string, number>())
    const { result: newR } = renderHook(() => useNew<string, number>())
    expect(Object.keys(newR.current[1]).sort()).toEqual(
      Object.keys(oldR.current[1]).sort(),
    )
  })

  it('set action produces same result', () => {
    const { result: oldR } = renderHook(() => useOld<string, number>())
    const { result: newR } = renderHook(() => useNew<string, number>())
    act(() => oldR.current[1].set('x', 10))
    act(() => newR.current[1].set('x', 10))
    expect(newR.current[0].get('x')).toBe(oldR.current[0].get('x'))
  })

  it('remove action produces same result', () => {
    const entries: [string, number][] = [['a', 1]]
    const { result: oldR } = renderHook(() => useOld(entries))
    const { result: newR } = renderHook(() => useNew(entries))
    act(() => oldR.current[1].remove('a'))
    act(() => newR.current[1].remove('a'))
    expect(newR.current[0].size).toBe(oldR.current[0].size)
  })

  it('reset produces same result', () => {
    const { result: oldR } = renderHook(() => useOld<string, number>())
    const { result: newR } = renderHook(() => useNew<string, number>())
    act(() => oldR.current[1].set('x', 1))
    act(() => newR.current[1].set('x', 1))
    act(() => oldR.current[1].reset())
    act(() => newR.current[1].reset())
    expect(newR.current[0].size).toBe(oldR.current[0].size)
  })
})
