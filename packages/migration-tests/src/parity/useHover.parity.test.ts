import { useRef } from 'react'
import { renderHook } from '@testing-library/react'
import { useHover as useOld } from 'usehooks-ts'
import { useHover as useNew } from '@ts-hooks-kit/core'

describe('useHover parity', () => {
  it('returns same initial value (false)', () => {
    const { result: oldR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useOld(ref)
    })
    const { result: newR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useNew(ref)
    })
    expect(newR.current).toBe(oldR.current)
  })

  it('returns same type', () => {
    const { result: oldR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useOld(ref)
    })
    const { result: newR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(document.createElement('div'))
      return useNew(ref)
    })
    expect(typeof newR.current).toBe(typeof oldR.current)
  })
})
