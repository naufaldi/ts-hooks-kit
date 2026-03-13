import { act, renderHook } from '@testing-library/react'

import { useDisclosure } from './useDisclosure'

describe('useDisclosure()', () => {
  it('should initialize as closed by default', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current[0]).toBe(false)
    expect(typeof result.current[1].open).toBe('function')
    expect(typeof result.current[1].close).toBe('function')
    expect(typeof result.current[1].toggle).toBe('function')
  })

  it('should initialize with provided state', () => {
    const { result } = renderHook(() => useDisclosure(true))

    expect(result.current[0]).toBe(true)
  })

  it('should open', () => {
    const { result } = renderHook(() => useDisclosure())

    act(() => {
      result.current[1].open()
    })

    expect(result.current[0]).toBe(true)
  })

  it('should close', () => {
    const { result } = renderHook(() => useDisclosure(true))

    act(() => {
      result.current[1].close()
    })

    expect(result.current[0]).toBe(false)
  })

  it('should toggle', () => {
    const { result } = renderHook(() => useDisclosure())

    expect(result.current[0]).toBe(false)

    act(() => {
      result.current[1].toggle()
    })

    expect(result.current[0]).toBe(true)

    act(() => {
      result.current[1].toggle()
    })

    expect(result.current[0]).toBe(false)
  })

  it('should call onOpen callback', () => {
    const onOpen = vi.fn()
    const { result } = renderHook(() => useDisclosure(false, { onOpen }))

    act(() => {
      result.current[1].open()
    })

    expect(onOpen).toHaveBeenCalled()
  })

  it('should call onClose callback', () => {
    const onClose = vi.fn()
    const { result } = renderHook(() => useDisclosure(true, { onClose }))

    act(() => {
      result.current[1].close()
    })

    expect(onClose).toHaveBeenCalled()
  })

  it('should not open if already open', () => {
    const onOpen = vi.fn()
    const { result } = renderHook(() => useDisclosure(true, { onOpen }))

    act(() => {
      result.current[1].open()
    })

    expect(onOpen).not.toHaveBeenCalled()
  })

  it('should not close if already closed', () => {
    const onClose = vi.fn()
    const { result } = renderHook(() => useDisclosure(false, { onClose }))

    act(() => {
      result.current[1].close()
    })

    expect(onClose).not.toHaveBeenCalled()
  })
})
