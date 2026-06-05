import { renderHook } from '@testing-library/react'
import { useClickAnyWhere as useOld } from 'usehooks-ts'
import { useClickAnyWhere as useNew } from '@ts-hooks-kit/core'

describe('useClickAnyWhere parity', () => {
  it('both invoke handler on document click', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    renderHook(() => useOld(oldCb))
    renderHook(() => useNew(newCb))

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(oldCb).toHaveBeenCalledTimes(1)
    expect(newCb).toHaveBeenCalledTimes(1)
  })

  it('both clean up on unmount', () => {
    const oldCb = vi.fn()
    const newCb = vi.fn()

    const { unmount: unmountOld } = renderHook(() => useOld(oldCb))
    const { unmount: unmountNew } = renderHook(() => useNew(newCb))

    unmountOld()
    unmountNew()

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(oldCb).not.toHaveBeenCalled()
    expect(newCb).not.toHaveBeenCalled()
  })
})
