import { useCallback, useMemo, useState } from 'react'

/**
 * Options for the usePagination hook.
 */
export type UsePaginationOptions = {
  /** Total number of pages. */
  total: number
  /** Number of sibling pages to show on each side of current page. @default 1 */
  siblings?: number
  /** Number of boundary pages to show at start and end. @default 1 */
  boundaries?: number
  /** Initial active page. @default 1 */
  initialPage?: number
  /** Controlled active page (overrides internal state). */
  page?: number
  /** Callback when page changes (for controlled mode). */
  onChange?: (page: number) => void
}

/**
 * Represents the state and actions returned by usePagination hook.
 */
export type UsePaginationReturn = {
  /** The currently active page number. */
  activePage: number
  /** The pagination range (pages and separators). */
  range: (number | string)[]
  /** Set the active page. */
  setPage: (page: number) => void
  /** Navigate to the next page. */
  next: () => void
  /** Navigate to the previous page. */
  prev: () => void
  /** Whether the current page is the first page. */
  first: boolean
  /** Whether the current page is the last page. */
  last: boolean
}

const DOTS = 'dots'

/**
 * Custom hook for managing pagination logic.
 * Returns page navigation functions and a range array suitable for pagination UI.
 * @param {UsePaginationOptions} options - Pagination configuration options.
 * @returns {UsePaginationReturn} The pagination state and navigation functions.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-pagination)
 * @example
 * ```tsx
 * const { activePage, setPage, next, prev, range } = usePagination({
 *   total: 20,
 *   siblings: 1,
 *   boundaries: 1,
 * });
 *
 * // range = [1, 'dots', 4, 5, 6, 'dots', 20]
 * ```
 */
export function usePagination(
  options: UsePaginationOptions,
): UsePaginationReturn {
  const {
    total,
    siblings = 1,
    boundaries = 1,
    initialPage = 1,
    page: controlledPage,
    onChange,
  } = options

  const [internalPage, setInternalPage] = useState(initialPage)
  const activePage = controlledPage ?? internalPage

  const setPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, total))
      if (validPage !== activePage) {
        if (controlledPage === undefined) {
          setInternalPage(validPage)
        }
        onChange?.(validPage)
      }
    },
    [activePage, controlledPage, onChange, total],
  )

  const next = useCallback(() => {
    setPage(activePage + 1)
  }, [activePage, setPage])

  const prev = useCallback(() => {
    setPage(activePage - 1)
  }, [activePage, setPage])

  const isFirst = activePage === 1
  const isLast = activePage === total

  const range = useMemo(() => {
    const range: (number | string)[] = []

    // Calculate visible range
    const totalVisible = siblings * 2 + 3 + boundaries * 2

    if (totalVisible >= total) {
      // Show all pages
      for (let i = 1; i <= total; i++) {
        range.push(i)
      }
    } else {
      // Calculate left boundary
      const leftBoundaryEnd = boundaries
      for (let i = 1; i <= leftBoundaryEnd; i++) {
        range.push(i)
      }

      // Calculate middle section
      const leftSibling = Math.max(activePage - siblings, boundaries + 1)
      const rightSibling = Math.min(activePage + siblings, total - boundaries)

      const showLeftDots = leftSibling > boundaries + 1
      const showRightDots = rightSibling < total - boundaries

      if (showLeftDots) {
        range.push(DOTS)
      }

      for (let i = leftSibling; i <= rightSibling; i++) {
        range.push(i)
      }

      if (showRightDots) {
        range.push(DOTS)
      }

      // Calculate right boundary
      const rightBoundaryStart = total - boundaries + 1
      for (let i = rightBoundaryStart; i <= total; i++) {
        range.push(i)
      }
    }

    return range
  }, [activePage, boundaries, siblings, total])

  return {
    activePage,
    range,
    setPage,
    next,
    prev,
    first: isFirst,
    last: isLast,
  }
}

// Export DOTS constant for users who need it
export { DOTS }
