import { act, renderHook } from '@testing-library/react'

import { createGlobalState } from './createGlobalState'

describe('createGlobalState()', () => {
  it('should create a hook with initial state', () => {
    const useGlobalCounter = createGlobalState(0)

    const { result } = renderHook(() => useGlobalCounter())

    expect(result.current[0]).toBe(0)
  })

  it('should share state across multiple hook instances', () => {
    const useGlobalCounter = createGlobalState(0)

    const { result: result1 } = renderHook(() => useGlobalCounter())
    const { result: result2 } = renderHook(() => useGlobalCounter())

    act(() => {
      result1.current[1](5)
    })

    expect(result2.current[0]).toBe(5)
  })

  it('should allow setting state from any component', () => {
    const useGlobalText = createGlobalState('')

    const { result: result1 } = renderHook(() => useGlobalText())
    const { result: result2 } = renderHook(() => useGlobalText())

    act(() => {
      result2.current[1]('shared text')
    })

    expect(result1.current[0]).toBe('shared text')
  })

  it('should work with functional updates', () => {
    const useGlobalCounter = createGlobalState(10)

    const { result } = renderHook(() => useGlobalCounter())

    act(() => {
      result.current[1](prev => prev + 5)
    })

    expect(result.current[0]).toBe(15)
  })
})
