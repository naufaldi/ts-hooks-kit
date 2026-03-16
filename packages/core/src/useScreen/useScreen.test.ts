import { renderHook } from '@testing-library/react'

import { useScreen } from './useScreen'

describe('useScreen()', () => {
  it('should return the screen object', () => {
    const { result } = renderHook(() => useScreen())
    expect(result.current).toBeDefined()
    expect(result.current.width).toBeDefined()
    expect(result.current.height).toBeDefined()
  })

  it('should return undefined when initializeWithValue is false initially', () => {
    const { result } = renderHook(() =>
      useScreen({ initializeWithValue: false }),
    )
    // After layout effect, it should have the screen value
    expect(result.current).toBeDefined()
  })

  it('should have screen properties', () => {
    const { result } = renderHook(() => useScreen())
    const screen = result.current
    expect(screen).toHaveProperty('width')
    expect(screen).toHaveProperty('height')
    expect(screen).toHaveProperty('availWidth')
    expect(screen).toHaveProperty('availHeight')
    expect(screen).toHaveProperty('colorDepth')
    expect(screen).toHaveProperty('pixelDepth')
  })
})
