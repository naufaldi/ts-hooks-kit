Create a stable function reference that always calls the latest version of the passed function, without needing a dependency array.

Unlike `useCallback`, the returned function reference never changes across re-renders, so it is safe to use in dependency arrays and as props without causing unnecessary re-renders.

The function always invokes the most recent closure, so it always has access to the latest state and props.
