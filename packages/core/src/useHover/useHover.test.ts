import { act, fireEvent, renderHook } from '@testing-library/react'

import { useHover } from './useHover'

describe('useHover()', () => {
  const el = {
    current: document.createElement('div'),
  }

  it('result must be initially false', () => {
    const { result } = renderHook(() => useHover(el))
    expect(result.current).toBe(false)
  })

  it('value must be true when firing hover action on element', () => {
    const { result } = renderHook(() => useHover(el))

    expect(result.current).toBe(false)

    act(() => void fireEvent.mouseEnter(el.current))
    expect(result.current).toBe(true)
  })

  it('value must turn back into false when firing mouseleave action on element', () => {
    const { result } = renderHook(() => useHover(el))

    expect(result.current).toBe(false)

    act(() => void fireEvent.mouseEnter(el.current))
    expect(result.current).toBe(true)

    act(() => void fireEvent.mouseLeave(el.current))
    expect(result.current).toBe(false)
  })

  it('should reset to false when the element is removed from the DOM', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const ref = { current: el }

    const { result, rerender } = renderHook(() => useHover(ref))

    // Hover
    act(() => void fireEvent.mouseEnter(el))
    expect(result.current).toBe(true)

    // Remove element from DOM and null the ref
    document.body.removeChild(el)
    ref.current = null as unknown as HTMLDivElement

    // Trigger rerender so the hook sees the null ref
    rerender()

    expect(result.current).toBe(false)
  })
})
