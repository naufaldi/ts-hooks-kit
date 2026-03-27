React hook for listening for clicks outside of a specified element (see `useRef`).

This can be useful for closing a modal, a dropdown menu etc.

Pass a **single** `RefObject` or an **array** of refs. A click counts as outside only when at least one ref has a non-null `current`; if every ref is still unmounted (`current === null`), the handler does not run. For multiple DOM roots (e.g. floating panel + trigger), pass both refs in an array instead of merging refs, unless you already use a `mergeRefs` helper that produces one callback ref.
