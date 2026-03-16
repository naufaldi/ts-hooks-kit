import { useState } from 'react'
import { useDebounceValue } from '@ts-hooks-kit/core'
import { useAsync } from '@ts-hooks-kit/core'

const LANGUAGES = [
  'JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java',
  'C++', 'C#', 'Ruby', 'Swift', 'Kotlin', 'PHP', 'Scala',
  'Haskell', 'Elixir', 'Clojure', 'Dart', 'Lua', 'R', 'Zig',
]

function searchLanguages(query: string): Promise<string[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!query.trim()) {
        resolve(LANGUAGES)
        return
      }
      const lower = query.toLowerCase()
      resolve(LANGUAGES.filter(lang => lang.toLowerCase().includes(lower)))
    }, 300)
  })
}

export default function SearchWithDebounce() {
  const [query, setQuery] = useState('')
  const [debouncedQuery] = useDebounceValue(query, 300)

  const { loading, value: results } = useAsync(
    () => searchLanguages(debouncedQuery),
    [debouncedQuery],
  )

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div>
        <label
          htmlFor="search-input"
          className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Search Programming Languages
        </label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Type to search..."
          className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:ring-indigo-800"
        />
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
        <span>Query: &quot;{query}&quot;</span>
        <span>|</span>
        <span>Debounced: &quot;{debouncedQuery}&quot;</span>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-700">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-sm text-gray-500">
            Searching...
          </div>
        ) : results && results.length > 0 ? (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700">
            {results.map(lang => (
              <li
                key={lang}
                className="px-4 py-2.5 text-sm text-gray-800 dark:text-gray-200"
              >
                {lang}
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 text-center text-sm text-gray-400">
            No languages found.
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400">
        {results?.length ?? 0} result{results?.length === 1 ? '' : 's'} found
      </p>
    </div>
  )
}
