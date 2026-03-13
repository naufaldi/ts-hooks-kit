import { act, renderHook } from '@testing-library/react'

import { usePagination } from './usePagination'

describe('usePagination()', () => {
  it('should have correct initial state', () => {
    const { result } = renderHook(() => usePagination({ total: 10 }))

    expect(result.current.activePage).toBe(1)
    expect(result.current.first).toBe(true)
    expect(result.current.last).toBe(false)
    expect(typeof result.current.setPage).toBe('function')
    expect(typeof result.current.next).toBe('function')
    expect(typeof result.current.prev).toBe('function')
  })

  it('should navigate to specific page', () => {
    const { result } = renderHook(() => usePagination({ total: 10 }))

    act(() => {
      result.current.setPage(5)
    })

    expect(result.current.activePage).toBe(5)
    expect(result.current.first).toBe(false)
    expect(result.current.last).toBe(false)
  })

  it('should navigate to next page', () => {
    const { result } = renderHook(() => usePagination({ total: 10 }))

    act(() => {
      result.current.next()
    })

    expect(result.current.activePage).toBe(2)
  })

  it('should navigate to previous page', () => {
    const { result } = renderHook(() => usePagination({ total: 10, initialPage: 5 }))

    expect(result.current.activePage).toBe(5)

    act(() => {
      result.current.prev()
    })

    expect(result.current.activePage).toBe(4)
  })

  it('should not go below page 1', () => {
    const { result } = renderHook(() => usePagination({ total: 10 }))

    act(() => {
      result.current.prev()
    })

    expect(result.current.activePage).toBe(1)
    expect(result.current.first).toBe(true)
  })

  it('should not go above total pages', () => {
    const { result } = renderHook(() => usePagination({ total: 5 }))

    act(() => {
      result.current.setPage(5)
    })

    expect(result.current.activePage).toBe(5)
    expect(result.current.last).toBe(true)

    act(() => {
      result.current.next()
    })

    expect(result.current.activePage).toBe(5)
    expect(result.current.last).toBe(true)
  })

  it('should respect siblings option for range', () => {
    const { result } = renderHook(() =>
      usePagination({ total: 20, siblings: 1, initialPage: 10 }),
    )

    // Range should include siblings around current page
    const range = result.current.range
    expect(range).toContain(10)
    expect(range).toContain(9)
    expect(range).toContain(11)
  })

  it('should handle boundaries option', () => {
    const { result } = renderHook(() =>
      usePagination({ total: 20, boundaries: 2, initialPage: 10 }),
    )

    const range = result.current.range
    expect(range).toContain(1)
    expect(range).toContain(2)
    expect(range).toContain(19)
    expect(range).toContain(20)
  })

  it('should work with controlled state', () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      usePagination({ total: 10, page: 3, onChange }),
    )

    expect(result.current.activePage).toBe(3)

    act(() => {
      result.current.next()
    })

    expect(onChange).toHaveBeenCalledWith(4)
  })
})
