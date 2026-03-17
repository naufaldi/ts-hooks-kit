import { renderHook } from '@testing-library/react'
import { useDarkMode as useOld } from 'usehooks-ts'
import { useDarkMode as useNew } from '@ts-hooks-kit/core'
import { assertSameShape } from '../helpers'

describe('useDarkMode parity', () => {
  beforeEach(() => {
    localStorage.clear()
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('has same API shape', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    assertSameShape(
      oldR.current as unknown as Record<string, unknown>,
      newR.current as unknown as Record<string, unknown>,
    )
  })

  it('returns same initial dark mode state', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current.isDarkMode).toBe(oldR.current.isDarkMode)
  })
})
