import { renderHook, act } from '@testing-library/react'
import { useCountdown as useOld } from 'usehooks-ts'
import { useCountdown as useNew } from '@ts-hooks-kit/core'

describe('useCountdown parity', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns same initial count', () => {
    const { result: oldR } = renderHook(() =>
      useOld({ countStart: 10 }),
    )
    const { result: newR } = renderHook(() =>
      useNew({ countStart: 10 }),
    )
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() =>
      useOld({ countStart: 10 }),
    )
    const { result: newR } = renderHook(() =>
      useNew({ countStart: 10 }),
    )
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('controllers have same keys', () => {
    const { result: oldR } = renderHook(() =>
      useOld({ countStart: 10 }),
    )
    const { result: newR } = renderHook(() =>
      useNew({ countStart: 10 }),
    )
    expect(Object.keys(newR.current[1]).sort()).toEqual(
      Object.keys(oldR.current[1]).sort(),
    )
  })

  it('startCountdown + advance produces same count', () => {
    const { result: oldR } = renderHook(() =>
      useOld({ countStart: 10, intervalMs: 1000 }),
    )
    const { result: newR } = renderHook(() =>
      useNew({ countStart: 10, intervalMs: 1000 }),
    )

    act(() => oldR.current[1].startCountdown())
    act(() => newR.current[1].startCountdown())

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('resetCountdown resets both', () => {
    const { result: oldR } = renderHook(() =>
      useOld({ countStart: 10, intervalMs: 1000 }),
    )
    const { result: newR } = renderHook(() =>
      useNew({ countStart: 10, intervalMs: 1000 }),
    )

    act(() => oldR.current[1].startCountdown())
    act(() => newR.current[1].startCountdown())
    act(() => {
      vi.advanceTimersByTime(2000)
    })
    act(() => oldR.current[1].resetCountdown())
    act(() => newR.current[1].resetCountdown())

    expect(newR.current[0]).toBe(oldR.current[0])
    expect(newR.current[0]).toBe(10)
  })
})
