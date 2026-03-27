import { renderHook } from '@testing-library/react'
import { useRef } from 'react'

import { useOnClickOutside } from './useOnClickOutside'

function dispatchOutsideMousedown(target: EventTarget = document.body) {
  target.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
}

describe('useOnClickOutside()', () => {
  it('does not call handler when single ref has null current', () => {
    const handler = vi.fn()
    renderHook(() => {
      const ref = useRef<HTMLDivElement>(null)
      useOnClickOutside(ref, handler)
    })

    dispatchOutsideMousedown()

    expect(handler).not.toHaveBeenCalled()
  })

  it('calls handler when click is outside a mounted element (single ref)', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const handler = vi.fn()

    renderHook(() => {
      const ref = useRef(el)
      useOnClickOutside(ref, handler)
    })

    dispatchOutsideMousedown()

    expect(handler).toHaveBeenCalledTimes(1)
    document.body.removeChild(el)
  })

  it('does not call handler when click is inside the element', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const handler = vi.fn()

    renderHook(() => {
      const ref = useRef(el)
      useOnClickOutside(ref, handler)
    })

    dispatchOutsideMousedown(el)

    expect(handler).not.toHaveBeenCalled()
    document.body.removeChild(el)
  })

  it('calls handler when click is outside all mounted elements (ref array)', () => {
    const a = document.createElement('div')
    const b = document.createElement('div')
    document.body.append(a, b)
    const handler = vi.fn()

    renderHook(() => {
      const refA = useRef(a)
      const refB = useRef(b)
      useOnClickOutside([refA, refB], handler)
    })

    dispatchOutsideMousedown()

    expect(handler).toHaveBeenCalledTimes(1)
    a.remove()
    b.remove()
  })

  it('does not call handler when click is inside any element in the ref array', () => {
    const a = document.createElement('div')
    const b = document.createElement('div')
    document.body.append(a, b)
    const handler = vi.fn()

    renderHook(() => {
      const refA = useRef(a)
      const refB = useRef(b)
      useOnClickOutside([refA, refB], handler)
    })

    dispatchOutsideMousedown(a)
    expect(handler).not.toHaveBeenCalled()

    dispatchOutsideMousedown(b)
    expect(handler).not.toHaveBeenCalled()

    a.remove()
    b.remove()
  })

  it('does not call handler when every ref in the array has null current', () => {
    const handler = vi.fn()
    renderHook(() => {
      const refA = useRef<HTMLDivElement>(null)
      const refB = useRef<HTMLDivElement>(null)
      useOnClickOutside([refA, refB], handler)
    })

    dispatchOutsideMousedown()

    expect(handler).not.toHaveBeenCalled()
  })

  it('uses capture phase by default (events fire before stopPropagation)', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)
    const handler = vi.fn()

    renderHook(() => {
      const ref = useRef(el)
      useOnClickOutside(ref, handler)
    })

    // Create an outside element that stops propagation
    const outside = document.createElement('div')
    document.body.appendChild(outside)
    outside.addEventListener('mousedown', e => e.stopPropagation())

    // Dispatch on the outside element — capture phase should still catch it
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    expect(handler).toHaveBeenCalledTimes(1)

    el.remove()
    outside.remove()
  })
})
