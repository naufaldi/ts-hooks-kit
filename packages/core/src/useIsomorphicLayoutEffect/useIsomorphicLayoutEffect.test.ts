import { useEffect, useLayoutEffect } from 'react'

import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

describe('useIsomorphicLayoutEffect()', () => {
  it('should be useLayoutEffect in a browser environment', () => {
    // jsdom provides window, so this should be useLayoutEffect
    expect(useIsomorphicLayoutEffect).toBe(useLayoutEffect)
  })

  it('should be a function', () => {
    expect(typeof useIsomorphicLayoutEffect).toBe('function')
  })
})
