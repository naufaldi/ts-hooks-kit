import { renderHook } from '@testing-library/react'
import { useMediaQuery as useOld } from 'usehooks-ts'
import { useMediaQuery as useNew } from '@ts-hooks-kit/core'

describe('useMediaQuery parity', () => {
  beforeEach(() => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query === '(min-width: 768px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }))
  })

  it('returns same value for matching query', () => {
    const { result: oldR } = renderHook(() => useOld('(min-width: 768px)'))
    const { result: newR } = renderHook(() => useNew('(min-width: 768px)'))
    expect(newR.current).toBe(oldR.current)
  })

  it('returns same value for non-matching query', () => {
    const { result: oldR } = renderHook(() => useOld('(min-width: 1200px)'))
    const { result: newR } = renderHook(() => useNew('(min-width: 1200px)'))
    expect(newR.current).toBe(oldR.current)
  })

  it('returns same type', () => {
    const { result: oldR } = renderHook(() => useOld('(min-width: 768px)'))
    const { result: newR } = renderHook(() => useNew('(min-width: 768px)'))
    expect(typeof newR.current).toBe(typeof oldR.current)
  })
})
