import { renderHook } from '@testing-library/react'
import { useResizeObserver as useOld } from 'usehooks-ts'
import { useResizeObserver as useNew } from '@ts-hooks-kit/core'
import { useRef } from 'react'

describe('useResizeObserver parity', () => {
  beforeEach(() => {
    window.ResizeObserver = vi.fn().mockImplementation(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    })) as unknown as typeof ResizeObserver
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb(0)
      return 0
    })
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns same initial size shape', () => {
    const { result: oldR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useOld({ ref })
    })
    const { result: newR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useNew({ ref })
    })

    expect(oldR.current.width).toBeUndefined()
    expect(newR.current.width).toBeUndefined()
    expect(oldR.current.height).toBeUndefined()
    expect(newR.current.height).toBeUndefined()
  })

  it('returns same keys', () => {
    const { result: oldR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useOld({ ref })
    })
    const { result: newR } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      return useNew({ ref })
    })

    expect(Object.keys(newR.current).sort()).toEqual(
      Object.keys(oldR.current).sort(),
    )
  })
})
