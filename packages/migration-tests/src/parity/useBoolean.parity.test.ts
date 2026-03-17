import { renderHook, act } from '@testing-library/react'
import { useBoolean as useOld } from 'usehooks-ts'
import { useBoolean as useNew } from '@ts-hooks-kit/core'
import { assertSameShape, assertSameState } from '../helpers'

describe('useBoolean parity', () => {
  it('returns same initial state (false)', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    assertSameState(oldR.current, newR.current)
  })

  it('returns same initial state (true)', () => {
    const { result: oldR } = renderHook(() => useOld(true))
    const { result: newR } = renderHook(() => useNew(true))
    assertSameState(oldR.current, newR.current)
  })

  it('has same API shape', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    assertSameShape(oldR.current, newR.current)
  })

  it('toggle produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    act(() => oldR.current.toggle())
    act(() => newR.current.toggle())
    assertSameState(oldR.current, newR.current)
  })

  it('setTrue produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(false))
    const { result: newR } = renderHook(() => useNew(false))
    act(() => oldR.current.setTrue())
    act(() => newR.current.setTrue())
    assertSameState(oldR.current, newR.current)
  })

  it('setFalse produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(true))
    const { result: newR } = renderHook(() => useNew(true))
    act(() => oldR.current.setFalse())
    act(() => newR.current.setFalse())
    assertSameState(oldR.current, newR.current)
  })
})
