import { renderHook } from '@testing-library/react'
import { useDocumentTitle as useOld } from 'usehooks-ts'
import { useDocumentTitle as useNew } from '@ts-hooks-kit/core'

describe('useDocumentTitle parity', () => {
  const originalTitle = document.title

  afterEach(() => {
    document.title = originalTitle
  })

  it('both set document.title', () => {
    renderHook(() => useOld('Old Title'))
    expect(document.title).toBe('Old Title')

    renderHook(() => useNew('New Title'))
    expect(document.title).toBe('New Title')
  })

  it('both restore title on unmount when preserveTitleOnUnmount is false', () => {
    document.title = 'Initial'

    const { unmount: unmountOld } = renderHook(() =>
      useOld('Old Title', { preserveTitleOnUnmount: false }),
    )
    unmountOld()
    expect(document.title).toBe('Initial')

    document.title = 'Initial'

    const { unmount: unmountNew } = renderHook(() =>
      useNew('New Title', { preserveTitleOnUnmount: false }),
    )
    unmountNew()
    expect(document.title).toBe('Initial')
  })
})
