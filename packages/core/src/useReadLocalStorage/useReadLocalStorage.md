This React Hook allows you to read a value from localStorage by its key. It can be useful if you just want to read without passing a default value.
If the window object is not present (as in SSR), or if the value doesn't exist, `useReadLocalStorage()` will return `null`.

For the same parsing rules outside of React (unit tests, scripts, or imperative code), use the exported **`readLocalStorageValue`**. To parse a raw string exactly as the hook would (e.g. after `getItem` yourself), use **`deserializeReadLocalStorageString`**.

**Note:**

- If you use this hook in an SSR context, set the `initializeWithValue` option to `false`.
- If you want to be able to change the value, see [useLocalStorage()](/react-hook/use-local-storage).
