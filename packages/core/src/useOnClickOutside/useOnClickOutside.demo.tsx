import { useRef } from 'react'

import { useOnClickOutside } from './useOnClickOutside'

export default function Component() {
  const primaryRef = useRef<HTMLButtonElement>(null)
  const secondaryRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = () => {
    console.log('clicked outside both regions')
  }

  const handleClickInside = () => {
    console.log('clicked primary')
  }

  useOnClickOutside([primaryRef, secondaryRef], handleClickOutside)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <button
        ref={primaryRef}
        onClick={handleClickInside}
        style={{ width: 200, height: 80, background: 'cyan' }}
        type="button"
      >
        Primary (inside)
      </button>
      <div ref={secondaryRef} style={{ width: 200, height: 80, background: 'lightyellow' }}>
        Secondary region (inside)
      </div>
    </div>
  )
}
