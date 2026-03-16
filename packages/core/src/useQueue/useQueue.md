Manage a FIFO (first-in, first-out) queue data structure reactively.

Returns a tuple of `[queue, actions]` where actions include:

- `add(item)` — enqueue an item at the end
- `remove()` — dequeue the first item
- `clear()` — empty the queue
- `first` — peek at the first item without removing it
- `last` — peek at the last item
- `size` — the current queue length
