import { act, renderHook } from '@testing-library/react'

import { useUnmount } from './useUnmount'

describe('useUnmount()', () => {
  it('should call the cleanup function on unmount', () => {
    const cleanupMock = vitest.fn()

    const { unmount } = renderHook(() => {
      useUnmount(cleanupMock)
    })

    expect(cleanupMock).not.toHaveBeenCalled()

    act(() => {
      unmount()
    })

    expect(cleanupMock).toHaveBeenCalled()
  })

  it('should use the latest callback when unmounted after rerender', () => {
    const first = vitest.fn()
    const second = vitest.fn()

    const { unmount, rerender } = renderHook(
      ({ fn }) => {
        useUnmount(fn)
      },
      { initialProps: { fn: first } },
    )

    rerender({ fn: second })

    act(() => {
      unmount()
    })

    expect(first).not.toHaveBeenCalled()
    expect(second).toHaveBeenCalledOnce()
  })
})
