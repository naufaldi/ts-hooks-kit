import { useRef } from 'react'
import { renderHook } from '@testing-library/react'
import { useOnClickOutside as useOld } from 'usehooks-ts'
import { useOnClickOutside as useNew } from '@ts-hooks-kit/core'

describe('useOnClickOutside parity', () => {
  it('both call handler on outside click', () => {
    const element = document.createElement('div')
    document.body.appendChild(element)

    const oldCb = vi.fn()
    const newCb = vi.fn()

    renderHook(() => {
      const ref = useRef(element)
      useOld(ref, oldCb)
    })
    renderHook(() => {
      const ref = useRef(element)
      useNew(ref, newCb)
    })

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))

    expect(oldCb).toHaveBeenCalledTimes(1)
    expect(newCb).toHaveBeenCalledTimes(1)

    document.body.removeChild(element)
  })
})
