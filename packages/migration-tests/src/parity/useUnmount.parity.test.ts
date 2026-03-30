import { renderHook } from '@testing-library/react'
import { useUnmount as useOld } from 'usehooks-ts'
import { useUnmount as useNew } from '@ts-hooks-kit/core'

describe('useUnmount parity', () => {
  it('both call cleanup on unmount', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    const { unmount: unmountOld } = renderHook(() => useOld(oldCb))
    const { unmount: unmountNew } = renderHook(() => useNew(newCb))

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()

    unmountOld()
    unmountNew()

    expect(oldCb).toHaveBeenCalledTimes(1)
    expect(newCb).toHaveBeenCalledTimes(1)
  })

  it('neither calls cleanup while mounted', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    renderHook(() => useOld(oldCb))
    renderHook(() => useNew(newCb))

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()
  })
})
