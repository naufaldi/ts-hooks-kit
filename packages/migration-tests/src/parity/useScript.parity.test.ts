import { renderHook } from '@testing-library/react'
import { useScript as useOld } from 'usehooks-ts'
import { useScript as useNew } from '@ts-hooks-kit/core'

describe('useScript parity', () => {
  beforeEach(() => {
    document.querySelectorAll('script[data-testid]').forEach(el => el.remove())
    if (!globalThis.CSS?.escape) {
      globalThis.CSS = { escape: (s: string) => s } as typeof CSS
    }
  })

  it('returns same status for null src', () => {
    const { result: oldR } = renderHook(() => useOld(null))
    const { result: newR } = renderHook(() => useNew(null))
    expect(oldR.current).toBe('idle')
    expect(newR.current).toBe('idle')
  })

  it('returns same initial loading status', () => {
    const { result: oldR } = renderHook(() =>
      useOld('https://example.com/old.js'),
    )
    const { result: newR } = renderHook(() =>
      useNew('https://example.com/new.js'),
    )
    expect(oldR.current).toBe('loading')
    expect(newR.current).toBe('loading')
  })

  it('both return same status type', () => {
    const { result: oldR } = renderHook(() =>
      useOld('https://example.com/old2.js'),
    )
    const { result: newR } = renderHook(() =>
      useNew('https://example.com/new2.js'),
    )
    expect(typeof oldR.current).toBe(typeof newR.current)
  })
})
