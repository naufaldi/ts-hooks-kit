import { act, cleanup, renderHook } from '@testing-library/react'

import { useScript } from './useScript'

if (typeof CSS === 'undefined' || !CSS.escape) {
  globalThis.CSS = {
    ...globalThis.CSS,
    escape: (s: string) => s.replace(/([^\w-])/g, '\\$1'),
  } as typeof CSS
}

describe('useScript', () => {
  it('should handle script loading error', () => {
    const src = 'https://example.com/myscript.js'

    const { result } = renderHook(() => useScript(src))

    expect(result.current).toBe('loading')

    act(() => {
      // Simulate script error
      document.querySelector(`script[src="${src}"]`)?.dispatchEvent(new Event('error'))
    })

    expect(result.current).toBe('error')
  })

  it('should remove script on unmount', () => {
    const src = '/'

    // First load the script
    const { result } = renderHook(() => useScript(src, { removeOnUnmount: true }))

    expect(result.current).toBe('loading')

    // Make sure the document is loaded
    act(() => {
      document.querySelector(`script[src="${src}"]`)?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')

    // Remove the hook by unmounting and cleaning up the hook
    cleanup()

    // Check if the script is removed from the DOM
    expect(document.querySelector(`script[src="${src}"]`)).toBeNull()

    // Try loading the script again
    const { result: result2 } = renderHook(() => useScript(src, { removeOnUnmount: true }))

    expect(result2.current).toBe('loading')

    // Make sure the document is loaded
    act(() => {
      document.querySelector(`script[src="${src}"]`)?.dispatchEvent(new Event('load'))
    })

    expect(result2.current).toBe('ready')
  })

  it('should have a `id` attribute when given', () => {
    const src = '/'
    const id = 'my-script'

    const { result } = renderHook(() => useScript(src, { id }))

    // Make sure the document is loaded
    act(() => {
      document.querySelector(`script[src="${src}"]`)?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')

    expect(document.querySelector(`script[id="${id}"]`)).not.toBeNull()
    expect(document.querySelector(`script[src="${src}"]`)?.id).toBe(id)
  })

  it('should handle src with special CSS characters', () => {
    const src = 'https://example.com/script.js?a=1&b="2"'

    const { result } = renderHook(() => useScript(src))

    expect(result.current).toBe('loading')

    // Should find the script even though src contains quotes
    const scriptEl = document.querySelector(`script[src="${CSS.escape(src)}"]`)
    expect(scriptEl).not.toBeNull()

    act(() => {
      scriptEl?.dispatchEvent(new Event('load'))
    })

    expect(result.current).toBe('ready')
  })
})
