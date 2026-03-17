import { renderHook } from '@testing-library/react'
import { useInterval as useOld } from 'usehooks-ts'
import { useInterval as useNew } from '@ts-hooks-kit/core'

describe('useInterval parity', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('both call callback at same intervals', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    renderHook(() => useOld(oldCb, 1000))
    renderHook(() => useNew(newCb, 1000))

    vi.advanceTimersByTime(3000)

    expect(newCb).toHaveBeenCalledTimes(oldCb.mock.calls.length)
  })

  it('both pause when delay is null', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    renderHook(() => useOld(oldCb, null))
    renderHook(() => useNew(newCb, null))

    vi.advanceTimersByTime(3000)

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()
  })
})
