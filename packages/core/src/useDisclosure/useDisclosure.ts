import { useCallback, useState } from 'react'

/**
 * Options for the useDisclosure hook.
 */
export type UseDisclosureOptions = {
  /** Callback fired when disclosure opens. */
  onOpen?: () => void
  /** Callback fired when disclosure closes. */
  onClose?: () => void
}

/**
 * Represents the actions returned by useDisclosure hook.
 */
export type UseDisclosureActions = {
  /** Open the disclosure. */
  open: () => void
  /** Close the disclosure. */
  close: () => void
  /** Toggle the disclosure state. */
  toggle: () => void
}

/**
 * Represents the return type of the `useDisclosure` hook.
 */
export type UseDisclosureReturn = [boolean, UseDisclosureActions]

/**
 * Custom hook for managing boolean disclosure state (modals, popovers, drawers, etc.).
 * @param {boolean} [initialState=false] - The initial open state.
 * @param {UseDisclosureOptions} [options] - Optional callbacks for open/close events.
 * @returns {UseDisclosureReturn} A tuple containing the open state and control actions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-disclosure)
 * @example
 * ```tsx
 * const [opened, { open, close, toggle }] = useDisclosure(false, {
 *   onOpen: () => console.log('Opened'),
 *   onClose: () => console.log('Closed'),
 * });
 *
 * return (
 *   <>
 *     <button onClick={open}>Open Modal</button>
 *     <Modal opened={opened} onClose={close}>
 *       <button onClick={close}>Close</button>
 *     </Modal>
 *   </>
 * );
 * ```
 */
export function useDisclosure(
  initialState: boolean = false,
  options: UseDisclosureOptions = {},
): UseDisclosureReturn {
  const { onOpen, onClose } = options
  const [opened, setOpened] = useState(initialState)

  const open = useCallback(() => {
    setOpened(isOpen => {
      if (!isOpen) {
        onOpen?.()
        return true
      }
      return isOpen
    })
  }, [onOpen])

  const close = useCallback(() => {
    setOpened(isOpen => {
      if (isOpen) {
        onClose?.()
        return false
      }
      return isOpen
    })
  }, [onClose])

  const toggle = useCallback(() => {
    setOpened(isOpen => {
      if (isOpen) {
        onClose?.()
      } else {
        onOpen?.()
      }
      return !isOpen
    })
  }, [onClose, onOpen])

  return [opened, { open, close, toggle }]
}
