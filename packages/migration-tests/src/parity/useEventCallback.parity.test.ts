import { renderHook } from '@testing-library/react'
import { useEventCallback as useOld } from 'usehooks-ts'
import { useEventCallback as useNew } from '@ts-hooks-kit/core'

describe('useEventCallback parity', () => {
  it('both return a function', () => {
    const fn = () => 42
    const { result: oldR } = renderHook(() => useOld(fn))
    const { result: newR } = renderHook(() => useNew(fn))
    expect(typeof oldR.current).toBe('function')
    expect(typeof newR.current).toBe('function')
  })

  it('returned function invokes the latest callback', () => {
    const fn = vi.fn(() => 'result')
    const { result: oldR } = renderHook(() => useOld(fn))
    const { result: newR } = renderHook(() => useNew(fn))

    expect(oldR.current()).toBe('result')
    expect(newR.current()).toBe('result')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  it('returned function is stable across re-renders', () => {
    const { result: oldR, rerender: rerenderOld } = renderHook(() =>
      useOld(() => {}),
    )
    const { result: newR, rerender: rerenderNew } = renderHook(() =>
      useNew(() => {}),
    )

    const oldRef = oldR.current
    const newRef = newR.current

    rerenderOld()
    rerenderNew()

    expect(oldR.current).toBe(oldRef)
    expect(newR.current).toBe(newRef)
  })
})
