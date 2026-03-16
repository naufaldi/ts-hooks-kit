Manage async operations with built-in loading, error, and value state tracking.

Pass an async function and optional dependency array. The hook executes it immediately and provides:

- `value` — the resolved result (or `undefined` while loading)
- `error` — the caught error (or `undefined` on success)
- `loading` — whether the async function is currently executing
- `retry()` — re-execute the async function on demand

Useful for data fetching, API calls, or any async operation where you need reactive state.
