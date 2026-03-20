import type { RefObject } from 'react'

import { useEventListener } from '../useEventListener'

/** Supported event types. */
export type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout'

/**
 * Custom hook that handles clicks outside a specified element.
 * @template T - The type of the element's reference.
 * @param {RefObject<T | null> | RefObject<T | null>[]} ref - The React ref object(s) representing the element(s) to watch for outside clicks.
 * @param {(event: MouseEvent | TouchEvent | FocusEvent) => void} handler - The callback function to be executed when a click outside the element occurs.
 * @param {EventType} [eventType] - The mouse event type to listen for (optional, default is 'mousedown').
 * @param {?AddEventListenerOptions} [eventListenerOptions] - The options object to be passed to the `addEventListener` method (optional).
 * @returns {void}
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-on-click-outside)
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useOnClickOutside(ref, () => {
 *   // Outside the mounted element (ref.current must be non-null to define “inside”).
 * });
 * ```
 * @example
 * ```tsx
 * const a = useRef<HTMLDivElement>(null);
 * const b = useRef<HTMLDivElement>(null);
 * useOnClickOutside([a, b], () => {
 *   // Outside both regions; ignored while every ref’s current is null.
 * });
 * ```
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<T | null>[],
  handler: (event: MouseEvent | TouchEvent | FocusEvent) => void,
  eventType: EventType = 'mousedown',
  eventListenerOptions: AddEventListenerOptions = {},
): void {
  useEventListener(
    eventType,
    event => {
      const target = event.target as Node

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return
      }

      let isOutside: boolean
      if (Array.isArray(ref)) {
        const mounted = ref.filter((r): r is RefObject<T> & { current: T } => r.current != null)
        isOutside = mounted.length > 0 && mounted.every(r => !r.current.contains(target))
      } else {
        isOutside = Boolean(ref.current && !ref.current.contains(target))
      }

      if (isOutside) {
        handler(event)
      }
    },
    undefined,
    eventListenerOptions,
  )
}
