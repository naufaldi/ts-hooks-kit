import { renderHook } from '@testing-library/react'
import { useWindowSize as useOld } from 'usehooks-ts'
import { useWindowSize as useNew } from '@ts-hooks-kit/core'
import { assertSameShape } from '../helpers'

describe('useWindowSize parity', () => {
  it('has same API shape', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    assertSameShape(
      oldR.current as unknown as Record<string, unknown>,
      newR.current as unknown as Record<string, unknown>,
    )
  })

  it('returns same initial values', () => {
    const { result: oldR } = renderHook(() => useOld())
    const { result: newR } = renderHook(() => useNew())
    expect(newR.current.width).toBe(oldR.current.width)
    expect(newR.current.height).toBe(oldR.current.height)
  })
})
