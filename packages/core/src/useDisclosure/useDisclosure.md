Manage boolean disclosure state for modals, drawers, dropdowns, and other togglable UI elements.

Returns a tuple of `[opened, handlers]` where handlers include:

- `open()` — set state to open
- `close()` — set state to closed
- `toggle()` — flip the current state

Accepts an optional initial value (defaults to `false`) and optional `onOpen`/`onClose` callbacks.
