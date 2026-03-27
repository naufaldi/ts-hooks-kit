import { act, renderHook } from '@testing-library/react'

import { mockMatchMedia, mockStorage } from '../../tests/mocks'

import { useDarkMode } from './useDarkMode'

mockStorage('localStorage')

describe('useDarkMode()', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('should initiate correctly', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useDarkMode())
    expect(typeof result.current.isDarkMode).toBe('boolean')
    expect(typeof result.current.disable).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
    expect(typeof result.current.enable).toBe('function')
    expect(typeof result.current.set).toBe('function')
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should have a default value', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should toggle dark mode', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(true)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(false)
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should enable dark mode (1)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(true)
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should enable dark mode (2)', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(false)
    act(() => {
      result.current.enable()
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should disable dark mode (1)', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(true)
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should disable dark mode (2)', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(false)
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
  })

  it('should set dark mode', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() => useDarkMode())
    act(() => {
      result.current.set(false)
    })
    expect(result.current.isDarkMode).toBe(false)
    act(() => {
      result.current.set(true)
    })
    expect(result.current.isDarkMode).toBe(true)
  })

  it('should accept a custom localStorage key', () => {
    mockMatchMedia(false)
    const { result } = renderHook(() => useDarkMode({ localStorageKey: 'custom-key' }))

    expect(result.current.isDarkMode).toBe(false)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDarkMode).toBe(true)
    expect(window.localStorage.getItem('custom-key')).toBe(JSON.stringify(true))
  })

  it('should accept a custom default value', () => {
    mockMatchMedia(true)
    const { result } = renderHook(() =>
      useDarkMode({ defaultValue: true, initializeWithValue: false }),
    )

    expect(result.current.isDarkMode).toBe(true)

    act(() => {
      result.current.toggle()
    })

    expect(result.current.isDarkMode).toBe(false)
  })

  it('should preserve user preference across remount when OS differs', () => {
    mockMatchMedia(true) // OS prefers dark
    const { result, unmount } = renderHook(() => useDarkMode())
    expect(result.current.isDarkMode).toBe(true)

    // User explicitly disables dark mode
    act(() => {
      result.current.disable()
    })
    expect(result.current.isDarkMode).toBe(false)
    expect(window.localStorage.getItem('usehooks-ts-dark-mode')).toBe('false')

    // Simulate HMR: unmount and remount
    unmount()
    mockMatchMedia(true) // OS still prefers dark
    const { result: result2 } = renderHook(() => useDarkMode())

    // Should preserve the user's choice (false), NOT reset to OS (true)
    expect(result2.current.isDarkMode).toBe(false)
  })
})
