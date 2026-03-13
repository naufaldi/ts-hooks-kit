import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'

import { useUpdateEffect } from './useUpdateEffect'

describe('useUpdateEffect()', () => {
  it('should not run on initial mount', () => {
    const effect = vi.fn()

    renderHook(() => {
      useUpdateEffect(effect, [])
    })

    expect(effect).not.toHaveBeenCalled()
  })

  it('should run on dependency change', () => {
    const effect = vi.fn()

    const { rerender } = renderHook(
      ({ count }) => {
        useUpdateEffect(effect, [count])
        return count
      },
      { initialProps: { count: 0 } },
    )

    expect(effect).not.toHaveBeenCalled()

    rerender({ count: 1 })

    expect(effect).toHaveBeenCalledTimes(1)
  })

  it('should not run when dependencies do not change', () => {
    const effect = vi.fn()

    const { rerender } = renderHook(
      ({ count }) => {
        useUpdateEffect(effect, [count])
        return count
      },
      { initialProps: { count: 0 } },
    )

    rerender({ count: 0 })
    rerender({ count: 0 })

    expect(effect).not.toHaveBeenCalled()
  })

  it('should run cleanup function on unmount', () => {
    const cleanup = vi.fn()
    const effect = vi.fn().mockReturnValue(cleanup)

    const { rerender, unmount } = renderHook(
      ({ count }) => {
        useUpdateEffect(effect, [count])
        return count
      },
      { initialProps: { count: 0 } },
    )

    rerender({ count: 1 })
    expect(effect).toHaveBeenCalledTimes(1)
    expect(cleanup).not.toHaveBeenCalled()

    unmount()
    expect(cleanup).toHaveBeenCalledTimes(1)
  })

  it('should run cleanup before next effect', () => {
    const cleanup = vi.fn()
    const effect = vi.fn().mockReturnValue(cleanup)

    const { rerender } = renderHook(
      ({ count }) => {
        useUpdateEffect(effect, [count])
        return count
      },
      { initialProps: { count: 0 } },
    )

    rerender({ count: 1 })
    expect(effect).toHaveBeenCalledTimes(1)
    expect(cleanup).not.toHaveBeenCalled()

    rerender({ count: 2 })
    expect(cleanup).toHaveBeenCalledTimes(1)
    expect(effect).toHaveBeenCalledTimes(2)
  })

  it('should work with useState', () => {
    const effect = vi.fn()

    const { result } = renderHook(() => {
      const [count, setCount] = useState(0)
      useUpdateEffect(() => {
        effect(count)
      }, [count])
      return { count, setCount }
    })

    expect(effect).not.toHaveBeenCalled()

    act(() => {
      result.current.setCount(1)
    })

    expect(effect).toHaveBeenCalledWith(1)
  })
})
