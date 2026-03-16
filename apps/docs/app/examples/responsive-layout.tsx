import { useMediaQuery } from '@ts-hooks-kit/core'
import { useWindowSize } from '@ts-hooks-kit/core'

const CARDS = [
  { label: 'Primary', color: 'bg-indigo-500' },
  { label: 'Secondary', color: 'bg-emerald-500' },
  { label: 'Accent', color: 'bg-amber-500' },
]

export default function ResponsiveLayout() {
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const { width, height } = useWindowSize()

  const breakpoint = width !== undefined
    ? width >= 1280
      ? 'xl'
      : width >= 1024
        ? 'lg'
        : width >= 768
          ? 'md'
          : width >= 640
            ? 'sm'
            : 'xs'
    : '...'

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <div className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-mono text-gray-700 dark:bg-gray-800 dark:text-gray-300">
          {width ?? '...'} x {height ?? '...'} px
        </div>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white ${
            isDesktop ? 'bg-indigo-600' : 'bg-rose-500'
          }`}
        >
          {breakpoint}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {isDesktop ? 'Desktop layout' : 'Mobile layout'}
        </span>
      </div>

      <div
        className={`gap-4 ${
          isDesktop ? 'grid grid-cols-3' : 'flex flex-col'
        }`}
      >
        {CARDS.map(card => (
          <div
            key={card.label}
            className={`${card.color} flex h-32 items-center justify-center rounded-xl text-lg font-bold text-white shadow-md`}
          >
            {card.label}
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 dark:text-gray-500">
        Resize your browser window to see the layout adapt. Cards stack vertically
        below 768px and display side-by-side on wider viewports.
      </p>
    </div>
  )
}
