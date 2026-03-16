Enhanced array state management with a rich set of mutation helpers.

Returns a tuple of `[list, actions]` where actions include:

- `set(newList)` — replace the entire list
- `push(...items)` — append items to the end
- `updateAt(index, item)` — replace an item at a specific index
- `insertAt(index, item)` — insert an item at a specific index
- `removeAt(index)` — remove an item at a specific index
- `clear()` — empty the list
- `reset()` — restore the initial list

All operations return a new array reference to trigger re-renders.
