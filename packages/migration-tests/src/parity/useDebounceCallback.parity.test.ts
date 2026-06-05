import { renderHook, act } from '@testing-library/react'
import { useDebounceCallback as useOld } from 'usehooks-ts'
import { useDebounceCallback as useNew } from '@ts-hooks-kit/core'

describe('useDebounceCallback parity', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('both return a callable function', () => {
    const { result: oldR } = renderHook(() => useOld(() => {}, 500))
    const { result: newR } = renderHook(() => useNew(() => {}, 500))
    expect(typeof oldR.current).toBe('function')
    expect(typeof newR.current).toBe('function')
  })

  it('both have cancel method', () => {
    const { result: oldR } = renderHook(() => useOld(() => {}, 500))
    const { result: newR } = renderHook(() => useNew(() => {}, 500))
    expect(typeof oldR.current.cancel).toBe('function')
    expect(typeof newR.current.cancel).toBe('function')
  })

  it('both have flush method', () => {
    const { result: oldR } = renderHook(() => useOld(() => {}, 500))
    const { result: newR } = renderHook(() => useNew(() => {}, 500))
    expect(typeof oldR.current.flush).toBe('function')
    expect(typeof newR.current.flush).toBe('function')
  })

  it('both have isPending method', () => {
    const { result: oldR } = renderHook(() => useOld(() => {}, 500))
    const { result: newR } = renderHook(() => useNew(() => {}, 500))
    expect(typeof oldR.current.isPending).toBe('function')
    expect(typeof newR.current.isPending).toBe('function')
  })

  it('debounces callback similarly (timing-tolerant)', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()
    const { result: oldR } = renderHook(() => useOld(oldCb, 500))
    const { result: newR } = renderHook(() => useNew(newCb, 500))

    act(() => {
      oldR.current()
      newR.current()
    })

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(600)
    })

    expect(oldCb).toHaveBeenCalledTimes(1)
    expect(newCb).toHaveBeenCalledTimes(1)
  })

  it('cancel prevents invocation for both', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()
    const { result: oldR } = renderHook(() => useOld(oldCb, 500))
    const { result: newR } = renderHook(() => useNew(newCb, 500))

    act(() => {
      oldR.current()
      newR.current()
    })
    act(() => {
      oldR.current.cancel()
      newR.current.cancel()
    })
    act(() => {
      vi.advanceTimersByTime(600)
    })

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()
  })
})
