import { act, renderHook } from '@testing-library/react'

import { useMediaQuery } from './useMediaQuery'

const listeners: Array<(e: { matches: boolean }) => void> = []

function createMockMatchMedia(matches: boolean) {
  return (query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: (fn: (e: { matches: boolean }) => void) => {
      listeners.push(fn)
    },
    removeListener: (fn: (e: { matches: boolean }) => void) => {
      const idx = listeners.indexOf(fn)
      if (idx !== -1) listeners.splice(idx, 1)
    },
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })
}

describe('useMediaQuery()', () => {
  beforeEach(() => {
    listeners.length = 0
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return true when media query matches', () => {
    window.matchMedia = createMockMatchMedia(true) as any
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(true)
  })

  it('should return false when media query does not match', () => {
    window.matchMedia = createMockMatchMedia(false) as any
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)
  })

  it('should use defaultValue when initializeWithValue is false', () => {
    window.matchMedia = createMockMatchMedia(true) as any
    const { result } = renderHook(() =>
      useMediaQuery('(min-width: 768px)', {
        defaultValue: false,
        initializeWithValue: false,
      }),
    )
    // After layout effect runs, it reads the actual value
    expect(result.current).toBe(true)
  })

  it('should respond to media query changes', () => {
    window.matchMedia = createMockMatchMedia(false) as any

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'))
    expect(result.current).toBe(false)

    // Simulate media query change
    window.matchMedia = createMockMatchMedia(true) as any
    act(() => {
      listeners.forEach(fn => fn({ matches: true }))
    })
    expect(result.current).toBe(true)
  })
})
