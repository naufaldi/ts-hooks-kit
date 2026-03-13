import { act, renderHook } from '@testing-library/react'

import { usePageLeave } from './usePageLeave'

describe('usePageLeave()', () => {
  it('should call handler when mouse leaves document', () => {
    const handler = vi.fn()
    renderHook(() => usePageLeave(handler))

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseleave'))
    })

    expect(handler).toHaveBeenCalled()
  })

  it('should not call handler on mouseenter', () => {
    const handler = vi.fn()
    renderHook(() => usePageLeave(handler))

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseenter'))
    })

    expect(handler).not.toHaveBeenCalled()
  })

  it('should remove listener on unmount', () => {
    const handler = vi.fn()
    const { unmount } = renderHook(() => usePageLeave(handler))

    unmount()

    act(() => {
      document.dispatchEvent(new MouseEvent('mouseleave'))
    })

    expect(handler).not.toHaveBeenCalled()
  })
})
