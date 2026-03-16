import darkModeRaw from '../examples/dark-mode-toggle.tsx?raw'
import infiniteScrollRaw from '../examples/infinite-scroll.tsx?raw'
import searchDebounceRaw from '../examples/search-with-debounce.tsx?raw'
import responsiveLayoutRaw from '../examples/responsive-layout.tsx?raw'
import clipboardManagerRaw from '../examples/clipboard-manager.tsx?raw'

const sources: Record<string, string> = {
  'dark-mode-toggle': darkModeRaw,
  'infinite-scroll': infiniteScrollRaw,
  'search-with-debounce': searchDebounceRaw,
  'responsive-layout': responsiveLayoutRaw,
  'clipboard-manager': clipboardManagerRaw,
}

export function getExampleSource(slug: string): string {
  return sources[slug] ?? ''
}
