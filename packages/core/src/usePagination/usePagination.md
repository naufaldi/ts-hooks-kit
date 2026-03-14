Generate pagination logic with page range calculation.

Pass `totalItems`, `pageSize`, and optional `siblings` count. Returns:

- `activePage` — the current page number
- `range` — an array of page numbers and `DOTS` separators for rendering
- `setPage(page)` — navigate to a specific page
- `next()` / `prev()` — navigate forward or backward
- `first()` / `last()` — jump to the first or last page

The `DOTS` constant is exported alongside the hook for use in pagination UI components.
