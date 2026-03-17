import { renderHook, act } from '@testing-library/react'
import { useCounter as useOld } from 'usehooks-ts'
import { useCounter as useNew } from '@ts-hooks-kit/core'
import { assertSameShape, assertSameState } from '../helpers'

describe('useCounter parity', () => {
  it('returns same initial state', () => {
    const { result: oldR } = renderHook(() => useOld(0))
    const { result: newR } = renderHook(() => useNew(0))
    assertSameState(oldR.current, newR.current)
  })

  it('has same API shape', () => {
    const { result: oldR } = renderHook(() => useOld(0))
    const { result: newR } = renderHook(() => useNew(0))
    assertSameShape(oldR.current, newR.current)
  })

  it('increment produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(0))
    const { result: newR } = renderHook(() => useNew(0))
    act(() => oldR.current.increment())
    act(() => newR.current.increment())
    assertSameState(oldR.current, newR.current)
  })

  it('decrement produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    act(() => oldR.current.decrement())
    act(() => newR.current.decrement())
    assertSameState(oldR.current, newR.current)
  })

  it('reset produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(10))
    const { result: newR } = renderHook(() => useNew(10))
    act(() => oldR.current.increment())
    act(() => newR.current.increment())
    act(() => oldR.current.reset())
    act(() => newR.current.reset())
    assertSameState(oldR.current, newR.current)
  })
})
