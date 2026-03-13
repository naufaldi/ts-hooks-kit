import { act, renderHook } from '@testing-library/react'

import { useUpdate } from './useUpdate'

describe('useUpdate()', () => {
  it('should return a function', () => {
    const { result } = renderHook(() => useUpdate())

    expect(typeof result.current).toBe('function')
  })

  it('should force re-render when called', () => {
    let renderCount = 0
    const { result } = renderHook(() => {
      renderCount++
      return useUpdate()
    })

    expect(renderCount).toBe(1)

    act(() => {
      result.current()
    })

    expect(renderCount).toBe(2)

    act(() => {
      result.current()
    })

    expect(renderCount).toBe(3)
  })

  it('should maintain same function reference across renders', () => {
    const { result, rerender } = renderHook(() => useUpdate())

    const firstUpdate = result.current
    rerender()
    const secondUpdate = result.current

    expect(firstUpdate).toBe(secondUpdate)
  })
})
