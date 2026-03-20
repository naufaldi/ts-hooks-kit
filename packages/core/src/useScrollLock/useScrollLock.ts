import { useRef, useState } from 'react'

import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect'

/** Hook options. */
export type UseScrollLockOptions = {
  /**
   * Whether to lock the scroll initially.
   * @default true
   */
  autoLock?: boolean
  /**
   * The target element to lock the scroll (default is the body element).
   * @default document.body
   */
  lockTarget?: HTMLElement | string
  /**
   * Whether to prevent width reflow when locking the scroll.
   * @default true
   */
  widthReflow?: boolean
}

/** Hook return type. */
export type UseScrollLockReturn = {
  /** Whether the scroll is locked. */
  isLocked: boolean
  /** Lock the scroll. */
  lock: () => void
  /** Unlock the scroll. */
  unlock: () => void
}

export type OriginalStyle = {
  overflow: CSSStyleDeclaration['overflow']
  paddingRight: CSSStyleDeclaration['paddingRight']
}

const IS_SERVER = typeof window === 'undefined'

const scrollLockDepthByElement = new WeakMap<HTMLElement, number>()
const scrollLockOriginalStyles = new WeakMap<HTMLElement, OriginalStyle>()

/**
 * A custom hook that locks and unlocks scroll.
 * @param {UseScrollLockOptions} [options] - Options to configure the hook, by default it will lock the scroll automatically.
 * @returns {UseScrollLockReturn} - An object containing the lock and unlock functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-scroll-lock)
 * @example
 * ```tsx
 * // Lock the scroll when the modal is mounted, and unlock it when it's unmounted
 * useScrollLock()
 * ```
 * @example
 * ```tsx
 * // Manually lock and unlock the scroll
 * const { lock, unlock } = useScrollLock({ autoLock: false })
 *
 * return (
 *  <div>
 *   <button onClick={lock}>Lock</button>
 *   <button onClick={unlock}>Unlock</button>
 *  </div>
 * )
 * ```
 */
export function useScrollLock(options: UseScrollLockOptions = {}): UseScrollLockReturn {
  const { autoLock = true, lockTarget, widthReflow = true } = options
  const [isLocked, setIsLocked] = useState(false)
  const target = useRef<HTMLElement | null>(null)

  const lock = () => {
    const el = target.current
    if (!el || IS_SERVER) {
      return
    }

    const depth = scrollLockDepthByElement.get(el) ?? 0
    scrollLockDepthByElement.set(el, depth + 1)

    if (depth === 0) {
      scrollLockOriginalStyles.set(el, {
        overflow: el.style.overflow,
        paddingRight: el.style.paddingRight,
      })

      if (widthReflow) {
        const offsetWidth = el === document.body ? window.innerWidth : el.offsetWidth
        const currentPaddingRight = parseInt(window.getComputedStyle(el).paddingRight, 10) || 0

        const scrollbarWidth = offsetWidth - el.scrollWidth
        el.style.paddingRight = `${scrollbarWidth + currentPaddingRight}px`
      }

      el.style.overflow = 'hidden'
    }

    setIsLocked(true)
  }

  const unlock = () => {
    const el = target.current
    if (!el || IS_SERVER) {
      setIsLocked(false)
      return
    }

    const depth = scrollLockDepthByElement.get(el) ?? 0
    if (depth <= 0) {
      setIsLocked(false)
      return
    }

    const next = depth - 1
    scrollLockDepthByElement.set(el, next)

    if (next > 0) {
      setIsLocked(true)
      return
    }

    scrollLockDepthByElement.delete(el)
    const saved = scrollLockOriginalStyles.get(el)
    scrollLockOriginalStyles.delete(el)

    if (saved) {
      el.style.overflow = saved.overflow
      if (widthReflow) {
        el.style.paddingRight = saved.paddingRight
      }
    }

    setIsLocked(false)
  }

  useIsomorphicLayoutEffect(() => {
    if (IS_SERVER) return

    if (lockTarget) {
      target.current =
        typeof lockTarget === 'string' ? document.querySelector(lockTarget) : lockTarget
    }

    if (!target.current) {
      target.current = document.body
    }

    if (autoLock) {
      lock()
    }

    return () => {
      unlock()
    }
  }, [autoLock, lockTarget, widthReflow])

  return { isLocked, lock, unlock }
}
