import { act, renderHook } from '@testing-library/react'

import { useResizeObserver } from './useResizeObserver'

// Capture observer callbacks
let observerCallback: ResizeObserverCallback

class MockResizeObserver {
  callback: ResizeObserverCallback
  observe = vi.fn()
  disconnect = vi.fn()
  unobserve = vi.fn()

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback
    observerCallback = callback
  }
}

function triggerResize(width: number, height: number) {
  const entry = {
    contentBoxSize: [{ inlineSize: width, blockSize: height }],
    borderBoxSize: [{ inlineSize: width, blockSize: height }],
    devicePixelContentBoxSize: [{ inlineSize: width, blockSize: height }],
    contentRect: { width, height } as DOMRectReadOnly,
    target: document.createElement('div'),
  } as unknown as ResizeObserverEntry

  act(() => {
    observerCallback([entry], {} as ResizeObserver)
  })
}

describe('useResizeObserver()', () => {
  beforeEach(() => {
    window.ResizeObserver = MockResizeObserver as any
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should return initial undefined sizes', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useResizeObserver({ ref }),
    )

    expect(result.current.width).toBeUndefined()
    expect(result.current.height).toBeUndefined()
  })

  it('should return the observed element sizes', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useResizeObserver({ ref }),
    )

    triggerResize(100, 100)

    expect(result.current.width).toBe(100)
    expect(result.current.height).toBe(100)
  })

  it('should update size when element is resized', () => {
    const ref = { current: document.createElement('div') }
    const { result } = renderHook(() =>
      useResizeObserver({ ref }),
    )

    triggerResize(100, 100)
    expect(result.current.width).toBe(100)

    triggerResize(300, 200)
    expect(result.current.width).toBe(300)
    expect(result.current.height).toBe(200)
  })

  it('should use onResize callback', () => {
    const ref = { current: document.createElement('div') }
    const onResize = vi.fn()
    renderHook(() =>
      useResizeObserver({ ref, onResize }),
    )

    triggerResize(200, 200)

    expect(onResize).toHaveBeenCalledWith({ width: 200, height: 200 })
  })
})
