import { renderHook } from '@testing-library/react'

import { useAsync } from './useAsync'

describe('useAsync()', () => {
  it('should have initial loading state', () => {
    const asyncFn = async () => 'result'
    const { result } = renderHook(() => useAsync(asyncFn))

    expect(result.current.loading).toBe(true)
    expect(result.current.value).toBeUndefined()
    expect(result.current.error).toBeUndefined()
    expect(typeof result.current.retry).toBe('function')
  })

  it('should eventually resolve', async () => {
    const asyncFn = vi.fn().mockResolvedValue('success')
    const { result } = renderHook(() => useAsync(asyncFn))

    // Wait for promise to resolve
    await new Promise(resolve => setTimeout(resolve, 50))

    expect(asyncFn).toHaveBeenCalled()
  })

  it('should have retry function', () => {
    const asyncFn = async () => 'test'
    const { result } = renderHook(() => useAsync(asyncFn))

    expect(typeof result.current.retry).toBe('function')
  })
})
