import { renderHook } from '@testing-library/react'

import { useFirstMountState } from './useFirstMountState'

describe('useFirstMountState()', () => {
  it('should return true on first render', () => {
    const { result } = renderHook(() => useFirstMountState())

    expect(result.current).toBe(true)
  })

  it('should return false on subsequent renders', () => {
    const { result, rerender } = renderHook(() => useFirstMountState())

    expect(result.current).toBe(true)

    rerender()

    expect(result.current).toBe(false)
  })
})
