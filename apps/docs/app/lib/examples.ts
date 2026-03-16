export type ExampleMeta = {
  slug: string
  title: string
  description: string
  hooks: string[]
}

export const EXAMPLES: ExampleMeta[] = [
  {
    slug: 'dark-mode-toggle',
    title: 'Dark Mode Toggle',
    description: 'Persist theme preference with useDarkMode and useLocalStorage.',
    hooks: ['useDarkMode', 'useLocalStorage'],
  },
  {
    slug: 'infinite-scroll',
    title: 'Infinite Scroll',
    description: 'Load more items as the user scrolls with useIntersectionObserver and useAsync.',
    hooks: ['useIntersectionObserver', 'useAsync'],
  },
  {
    slug: 'search-with-debounce',
    title: 'Search with Debounce',
    description: 'Filter results with debounced input using useDebounceValue and useAsync.',
    hooks: ['useDebounceValue', 'useAsync'],
  },
  {
    slug: 'responsive-layout',
    title: 'Responsive Layout',
    description: 'Adapt layout based on viewport with useMediaQuery and useWindowSize.',
    hooks: ['useMediaQuery', 'useWindowSize'],
  },
  {
    slug: 'clipboard-manager',
    title: 'Clipboard Manager',
    description: 'Copy text snippets to clipboard with useCopyToClipboard and useBoolean.',
    hooks: ['useCopyToClipboard', 'useBoolean'],
  },
]

export function getExampleBySlug(slug: string): ExampleMeta | undefined {
  return EXAMPLES.find(e => e.slug === slug)
}
