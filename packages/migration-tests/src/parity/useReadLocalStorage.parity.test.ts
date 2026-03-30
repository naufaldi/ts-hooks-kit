import { renderHook } from '@testing-library/react'
import { useReadLocalStorage as useOld } from 'usehooks-ts'
import { useReadLocalStorage as useNew } from '@ts-hooks-kit/core'

describe('useReadLocalStorage parity', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('both return null when key not present', () => {
    const { result: oldR } = renderHook(() => useOld('missing-old'))
    const { result: newR } = renderHook(() => useNew('missing-new'))
    expect(oldR.current).toBeNull()
    expect(newR.current).toBeNull()
  })

  it('both return stored value', () => {
    localStorage.setItem('rls-old', JSON.stringify('hello'))
    localStorage.setItem('rls-new', JSON.stringify('hello'))

    const { result: oldR } = renderHook(() => useOld<string>('rls-old'))
    const { result: newR } = renderHook(() => useNew<string>('rls-new'))

    expect(oldR.current).toBe('hello')
    expect(newR.current).toBe('hello')
  })

  it('both return same type for objects', () => {
    const obj = { name: 'test', count: 42 }
    localStorage.setItem('obj-old', JSON.stringify(obj))
    localStorage.setItem('obj-new', JSON.stringify(obj))

    const { result: oldR } = renderHook(() =>
      useOld<typeof obj>('obj-old'),
    )
    const { result: newR } = renderHook(() =>
      useNew<typeof obj>('obj-new'),
    )

    expect(newR.current).toEqual(oldR.current)
  })
})
