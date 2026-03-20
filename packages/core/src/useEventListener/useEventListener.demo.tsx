import { useRef } from 'react'

import { useEventListener } from './useEventListener'

export default function Component() {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const documentRef = useRef<Document>(document)

  const onScroll = (event: WindowEventMap['scroll']) => {
    console.log('window scrolled!', event.type)
  }

  const onClick = (event: HTMLElementEventMap['click']) => {
    console.log('button clicked!', event.currentTarget)
  }

  const onVisibilityChange = (event: DocumentEventMap['visibilitychange']) => {
    console.log('doc visibility changed!', {
      isVisible: !document.hidden,
      event,
    })
  }

  useEventListener('scroll', onScroll)

  useEventListener('visibilitychange', onVisibilityChange, documentRef)

  useEventListener('click', onClick, buttonRef)

  return (
    <div style={{ minHeight: '200vh' }}>
      <button ref={buttonRef} type="button">
        Click me
      </button>
    </div>
  )
}
