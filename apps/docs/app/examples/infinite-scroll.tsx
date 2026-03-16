import { useState, useEffect, useCallback } from 'react'
import { useIntersectionObserver } from '@ts-hooks-kit/core'
import { useAsync } from '@ts-hooks-kit/core'

type Item = { id: number; title: string }

function fetchItems(page: number): Promise<Item[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      const items = Array.from({ length: 10 }, (_, i) => ({
        id: (page - 1) * 10 + i + 1,
        title: `Item #${(page - 1) * 10 + i + 1}`,
      }))
      resolve(items)
    }, 500)
  })
}

export default function InfiniteScroll() {
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<Item[]>([])
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0 })

  const { loading, value, error } = useAsync(() => fetchItems(page), [page])

  useEffect(() => {
    if (value && value.length > 0) {
      setItems(prev => {
        const existingIds = new Set(prev.map(item => item.id))
        const newItems = value.filter(item => !existingIds.has(item.id))
        return [...prev, ...newItems]
      })
    }
  }, [value])

  const handleLoadMore = useCallback(() => {
    if (isIntersecting && !loading) {
      setPage(prev => prev + 1)
    }
  }, [isIntersecting, loading])

  useEffect(() => {
    handleLoadMore()
  }, [handleLoadMore])

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-gray-100">
        Infinite Scroll ({items.length} items loaded)
      </h2>

      {error && (
        <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          Error: {error.message}
        </p>
      )}

      <div className="max-h-[400px] space-y-2 overflow-y-auto rounded-xl border border-gray-200 p-4 dark:border-gray-700">
        {items.map(item => (
          <div
            key={item.id}
            className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          >
            {item.title}
          </div>
        ))}

        <div ref={ref} className="flex justify-center py-4">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <svg
                className="h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Loading more...
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
