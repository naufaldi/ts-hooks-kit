Detect when the user is idle (no mouse, keyboard, or touch activity).

Pass a timeout in milliseconds. Returns:

- `idle` — whether the user has been inactive for the specified duration
- `lastActive` — timestamp of the last detected activity

Listens for `mousemove`, `mousedown`, `keydown`, `touchstart`, and `scroll` events. Useful for session timeouts, auto-save, or activity indicators.
