import { act, renderHook } from '@testing-library/react'

import { useMultiStateValidator } from './useMultiStateValidator'

describe('useMultiStateValidator()', () => {
  it('should validate multiple states', () => {
    const { result } = renderHook(() =>
      useMultiStateValidator(
        [1, 2, 3],
        (a, b, c) => a + b + c
      )
    )

    expect(result.current).toBe(6)
  })

  it('should revalidate when states change', () => {
    const { result, rerender } = renderHook(
      ({ values, validator }: { values: number[]; validator: (...args: number[]) => number }) =>
        useMultiStateValidator(values, validator),
      { initialProps: { values: [1, 2], validator: (a: number, b: number) => a * b } }
    )

    expect(result.current).toBe(2)

    rerender({ values: [3, 4], validator: (a: number, b: number) => a * b })

    expect(result.current).toBe(12)
  })

  it('should work with boolean validation', () => {
    const { result } = renderHook(() =>
      useMultiStateValidator(
        ['test@example.com', 'password123', 'password123'],
        (email, password, confirm) =>
          email.includes('@') && password.length >= 8 && password === confirm
      )
    )

    expect(result.current).toBe(true)
  })

  it('should work with single state', () => {
    const { result } = renderHook(() =>
      useMultiStateValidator(
        [42],
        (val) => val > 10
      )
    )

    expect(result.current).toBe(true)
  })
})
