import { renderHook } from '@testing-library/react'

import { useRendersCount } from './useRendersCount'

describe('useRendersCount()', () => {
  it('should return 1 on first render', () => {
    const { result } = renderHook(() => useRendersCount())

    expect(result.current).toBe(1)
  })

  it('should increment on rerender', () => {
    const { result, rerender } = renderHook(() => useRendersCount())

    expect(result.current).toBe(1)

    rerender()

    expect(result.current).toBe(2)
  })

  it('should track multiple renders', () => {
    const { result, rerender } = renderHook(() => useRendersCount())

    rerender()
    rerender()
    rerender()

    expect(result.current).toBe(4)
  })
})
