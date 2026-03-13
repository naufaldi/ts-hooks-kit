import { renderHook } from '@testing-library/react'

import { usePermission } from './usePermission'

const mockQuery = vi.fn()

describe('usePermission()', () => {
  beforeEach(() => {
    // @ts-ignore
    global.navigator.permissions = { query: mockQuery }
    vi.clearAllMocks()
  })

  afterEach(() => {
    // @ts-ignore
    delete global.navigator.permissions
  })

  it('should exist and export', () => {
    expect(typeof usePermission).toBe('function')
  })

  it('should return initial state', () => {
    mockQuery.mockReturnValue(new Promise(() => {})) // Never resolves

    const { result } = renderHook(() => usePermission('camera'))

    // Should have initial state before async resolves
    expect(result.current.state).toBe('prompt')
    expect(result.current.supported).toBe(true)
  })

  it('should handle unsupported permissions API', () => {
    // @ts-ignore
    delete global.navigator.permissions

    const { result } = renderHook(() => usePermission('camera'))

    expect(result.current.state).toBe('unsupported')
    expect(result.current.supported).toBe(false)
  })
})
