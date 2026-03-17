import { renderHook } from '@testing-library/react'
import { useEventListener as useOld } from 'usehooks-ts'
import { useEventListener as useNew } from '@ts-hooks-kit/core'

describe('useEventListener parity', () => {
  it('both attach window event listeners', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    renderHook(() => useOld('click', oldCb))
    renderHook(() => useNew('click', newCb))

    window.dispatchEvent(new Event('click'))

    expect(oldCb).toHaveBeenCalledTimes(1)
    expect(newCb).toHaveBeenCalledTimes(1)
  })

  it('both clean up on unmount', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    const { unmount: unmountOld } = renderHook(() => useOld('click', oldCb))
    const { unmount: unmountNew } = renderHook(() => useNew('click', newCb))

    unmountOld()
    unmountNew()

    window.dispatchEvent(new Event('click'))

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()
  })
})
