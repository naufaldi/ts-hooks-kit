Throttle function execution or value updates to limit how often they fire.

Two variants are available:

- `useThrottle(value, interval)` — returns a throttled version of the value that updates at most once per interval
- `useThrottleFn(fn, interval)` — returns a throttled callback function

Both support `leading` and `trailing` edge execution options.
