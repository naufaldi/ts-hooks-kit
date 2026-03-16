import { useDarkMode } from '@ts-hooks-kit/core'
import { useLocalStorage } from '@ts-hooks-kit/core'

export default function DarkModeToggle() {
  const { isDarkMode, toggle, enable, disable } = useDarkMode({
    defaultValue: false,
    localStorageKey: 'dark-mode',
  })
  const [storedValue] = useLocalStorage<boolean>('dark-mode', false)

  return (
    <div
      className={`min-h-[320px] rounded-xl p-8 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      <div className="mx-auto max-w-sm space-y-6">
        <div className="text-center">
          <span className="text-5xl" role="img" aria-label={isDarkMode ? 'Moon' : 'Sun'}>
            {isDarkMode ? '\u{1F319}' : '\u{2600}\u{FE0F}'}
          </span>
          <h2 className="mt-3 text-2xl font-bold">
            {isDarkMode ? 'Dark' : 'Light'} Mode
          </h2>
        </div>

        <div className="flex justify-center gap-3">
          <button
            onClick={enable}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              isDarkMode
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Dark
          </button>
          <button
            onClick={toggle}
            className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
          >
            Toggle
          </button>
          <button
            onClick={disable}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              !isDarkMode
                ? 'bg-amber-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Light
          </button>
        </div>

        <div
          className={`rounded-lg p-4 text-sm font-mono ${
            isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-600'
          }`}
        >
          <p>localStorage[&quot;dark-mode&quot;]</p>
          <p className="mt-1 font-semibold">{JSON.stringify(storedValue)}</p>
        </div>
      </div>
    </div>
  )
}
