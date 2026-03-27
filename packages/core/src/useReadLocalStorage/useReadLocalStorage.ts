import { useCallback, useEffect, useState } from 'react'

import { useEventListener } from '../useEventListener'

import { readLocalStorageValue } from './readLocalStorageValue'

const IS_SERVER = typeof window === 'undefined'

/**
 * Represents the type for the options available when reading from local storage.
 * @template T - The type of the stored value.
 */
export type Options<T, InitializeWithValue extends boolean | undefined> = {
  /** Custom deserializer function to convert the stored string value to the desired type (optional). */
  deserializer?: (value: string) => T
  /** If `true` (default), the hook will initialize reading the local storage. In SSR, you should set it to `false`, returning `undefined` initially. */
  initializeWithValue: InitializeWithValue
}

// SSR version
export function useReadLocalStorage<T>(
  key: string,
  options: Options<T, false>,
): T | null | undefined
// CSR version
export function useReadLocalStorage<T>(key: string, options?: Partial<Options<T, true>>): T | null
/**
 * Custom hook that reads a value from [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), closely related to [`useLocalStorage()`](https://usehooks-ts.com/react-hook/use-local-storage).
 * @template T - The type of the stored value.
 * @param {string} key - The key associated with the value in local storage.
 * @param {Options<T>} [options] - Additional options for reading the value (optional).
 * @returns {T | null | undefined} The stored value, or null if the key is not present or an error occurs.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-read-local-storage)
 * @example
 * ```tsx
 * const storedData = useReadLocalStorage('myKey');
 * // Access the stored data from local storage.
 * ```
 * @example
 * ```ts
 * import { readLocalStorageValue } from '@ts-hooks-kit/core';
 * const value = readLocalStorageValue<MyType>('myKey');
 * ```
 */
export function useReadLocalStorage<T>(
  key: string,
  options: Partial<Options<T, boolean>> = {},
): T | null | undefined {
  let { initializeWithValue = true } = options
  if (IS_SERVER) {
    initializeWithValue = false
  }

  const readValue = useCallback(
    (): T | null | undefined => readLocalStorageValue<T>(key, options),
    [key, options],
  )

  const [storedValue, setStoredValue] = useState(() => {
    if (initializeWithValue) {
      return readValue()
    }
    return undefined
  })

  // Listen if localStorage changes
  useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent).key && (event as StorageEvent).key !== key) {
        return
      }
      setStoredValue(readValue())
    },
    [key, readValue],
  )

  // this only works for other documents, not the current one
  useEventListener('storage', handleStorageChange)

  // this is a custom event, triggered in writeValueToLocalStorage
  // See: useLocalStorage()
  useEventListener('local-storage', handleStorageChange)

  return storedValue
}
