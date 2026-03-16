A `useEffect` variant that skips execution on the initial mount.

The effect callback only fires on subsequent renders when dependencies change, not on the first render. Useful when you want to react to state changes but not the initial value.

Has the same API as `useEffect` — pass an effect function and a dependency array.
