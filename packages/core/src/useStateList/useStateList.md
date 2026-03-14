Navigate through a list of predefined states sequentially.

Pass an array of states. Returns:

- `state` — the current state value
- `currentIndex` — the index of the current state
- `next()` — advance to the next state
- `prev()` — go back to the previous state
- `setState(index)` — jump to a specific state by index
- `isFirst` / `isLast` — boundary indicators

Useful for wizards, step-by-step flows, or cycling through a fixed set of options.
