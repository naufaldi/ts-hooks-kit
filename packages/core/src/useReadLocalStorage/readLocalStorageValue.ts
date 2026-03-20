/**
 * Options for {@link readLocalStorageValue} and {@link deserializeReadLocalStorageString}.
 * @template T - The type of the stored value.
 * @public
 */
export type ReadLocalStorageValueOptions<T> = {
  /** Custom deserializer to convert the stored string to `T`. */
  deserializer?: (value: string) => T
}

/**
 * Parses a single localStorage string using the same rules as `useReadLocalStorage`.
 * @template T - The type of the stored value.
 * @param value - Raw string from `localStorage` (not the key).
 * @param options - Optional `deserializer`.
 * @returns Parsed value, `null` if JSON parse fails, or `undefined` when the stored literal is `'undefined'`.
 * @public
 */
export function deserializeReadLocalStorageString<T>(
  value: string,
  options: ReadLocalStorageValueOptions<T> = {},
): T | null | undefined {
  if (options.deserializer) {
    return options.deserializer(value)
  }
  if (value === 'undefined') {
    return undefined as unknown as T
  }

  try {
    return JSON.parse(value) as T
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return null
  }
}

/**
 * Reads and parses a value from `localStorage` by key, matching `useReadLocalStorage` semantics.
 * Use in tests or non-React code; on the server or when `window` is missing, returns `null`.
 * @template T - The type of the stored value.
 * @param key - `localStorage` key.
 * @param options - Optional `deserializer`.
 * @public
 */
export function readLocalStorageValue<T>(
  key: string,
  options: ReadLocalStorageValueOptions<T> = {},
): T | null | undefined {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(key)
    return raw ? deserializeReadLocalStorageString(raw, options) : null
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error)
    return null
  }
}
