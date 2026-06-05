import { renderHook, act } from '@testing-library/react'
import { useStep as useOld } from 'usehooks-ts'
import { useStep as useNew } from '@ts-hooks-kit/core'

describe('useStep parity', () => {
  it('returns same initial step (1)', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('returns same tuple length', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    expect(newR.current.length).toBe(oldR.current.length)
  })

  it('actions have same keys', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    expect(Object.keys(newR.current[1]).sort()).toEqual(
      Object.keys(oldR.current[1]).sort(),
    )
  })

  it('goToNextStep produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    act(() => oldR.current[1].goToNextStep())
    act(() => newR.current[1].goToNextStep())
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('goToPrevStep produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    act(() => oldR.current[1].goToNextStep())
    act(() => newR.current[1].goToNextStep())
    act(() => oldR.current[1].goToPrevStep())
    act(() => newR.current[1].goToPrevStep())
    expect(newR.current[0]).toBe(oldR.current[0])
  })

  it('canGoToNextStep and canGoToPrevStep match', () => {
    const { result: oldR } = renderHook(() => useOld(3))
    const { result: newR } = renderHook(() => useNew(3))
    expect(newR.current[1].canGoToNextStep).toBe(oldR.current[1].canGoToNextStep)
    expect(newR.current[1].canGoToPrevStep).toBe(oldR.current[1].canGoToPrevStep)
  })

  it('reset produces same result', () => {
    const { result: oldR } = renderHook(() => useOld(5))
    const { result: newR } = renderHook(() => useNew(5))
    act(() => oldR.current[1].goToNextStep())
    act(() => newR.current[1].goToNextStep())
    act(() => oldR.current[1].reset())
    act(() => newR.current[1].reset())
    expect(newR.current[0]).toBe(oldR.current[0])
  })
})
