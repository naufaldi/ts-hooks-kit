import { act, renderHook } from '@testing-library/react'

import { useIntersectionObserver } from './useIntersectionObserver'

// Mock IntersectionObserver
let observerCallback: IntersectionObserverCallback
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()

class MockIntersectionObserver {
  thresholds: number[]
  observe = mockObserve
  disconnect = mockDisconnect
  unobserve = vi.fn()

  constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) {
    observerCallback = callback
    this.thresholds = Array.isArray(options?.threshold)
      ? options.threshold
      : [options?.threshold ?? 0]
  }
}

describe('useIntersectionObserver()', () => {
  beforeEach(() => {
    window.IntersectionObserver = MockIntersectionObserver as any
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return initial state', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    expect(result.current.isIntersecting).toBe(false)
    expect(result.current.entry).toBeUndefined()
    expect(typeof result.current.ref).toBe('function')
  })

  it('should support tuple destructuring', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    const [ref, isIntersecting, entry] = result.current
    expect(typeof ref).toBe('function')
    expect(isIntersecting).toBe(false)
    expect(entry).toBeUndefined()
  })

  it('should observe an element when ref is set', () => {
    const { result } = renderHook(() => useIntersectionObserver())

    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })

    expect(mockObserve).toHaveBeenCalledWith(el)
  })

  it('should disconnect on unmount', () => {
    const { result, unmount } = renderHook(() => useIntersectionObserver())

    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })

    unmount()
    expect(mockDisconnect).toHaveBeenCalled()
  })

  it('should use initialIsIntersecting option', () => {
    const { result } = renderHook(() =>
      useIntersectionObserver({ initialIsIntersecting: true }),
    )

    expect(result.current.isIntersecting).toBe(true)
  })

  it('should call onChange callback', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useIntersectionObserver({ onChange }),
    )

    const el = document.createElement('div')
    act(() => {
      result.current.ref(el)
    })

    const mockEntry = {
      isIntersecting: true,
      intersectionRatio: 1,
      target: el,
    } as unknown as IntersectionObserverEntry

    act(() => {
      observerCallback(
        [mockEntry],
        {} as unknown as IntersectionObserver,
      )
    })

    expect(onChange).toHaveBeenCalled()
  })
})
