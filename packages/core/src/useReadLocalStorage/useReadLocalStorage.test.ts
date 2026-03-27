import { renderHook } from '@testing-library/react'

import { useReadLocalStorage } from './useReadLocalStorage'

describe('useReadLocalStorage()', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null when key is missing', () => {
    const { result } = renderHook(() => useReadLocalStorage('test'))

    expect(result.current).toBe(null)
  })

  it('returns parsed value when key exists', () => {
    localStorage.setItem('theme', '"dark"')
    const { result } = renderHook(() => useReadLocalStorage<string>('theme'))

    expect(result.current).toBe('dark')
  })
})
