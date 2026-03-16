import { EXAMPLES } from './examples'

import type { HookDocMeta } from './types'

export type DocsNavItem = {
  to: string
  label: string
}

export type DocsSidebarSection = {
  title: string
  items: DocsNavItem[]
}

export function getDocsNavigation(): DocsNavItem[] {
  return [
    { to: '/guide/getting-started', label: 'Getting Started' },
    { to: '/guide/migration', label: 'Migration' },
    { to: '/react-hook', label: 'Hooks' },
    { to: '/examples', label: 'Examples' },
  ]
}

export function buildDocsSidebarSections(hooks: HookDocMeta[]): DocsSidebarSection[] {
  return [
    {
      title: 'Guides',
      items: [
        { to: '/guide/getting-started', label: 'Getting Started' },
        { to: '/guide/migration', label: 'Migration' },
      ],
    },
    {
      title: 'Examples',
      items: EXAMPLES.map(e => ({ to: `/examples/${e.slug}`, label: e.title })),
    },
    {
      title: 'Hooks',
      items: hooks.map(hook => ({ to: `/react-hook/${hook.slug}`, label: hook.name })),
    },
  ]
}

export function getHookPager(hooks: HookDocMeta[], activeSlug: string) {
  const activeIndex = hooks.findIndex(hook => hook.slug === activeSlug)
  if (activeIndex === -1) {
    return { prev: null, next: null }
  }

  const prev = activeIndex > 0 ? hooks[activeIndex - 1] : null
  const next = activeIndex < hooks.length - 1 ? hooks[activeIndex + 1] : null

  return {
    prev: prev ? { to: `/react-hook/${prev.slug}`, label: prev.name } : null,
    next: next ? { to: `/react-hook/${next.slug}`, label: next.name } : null,
  }
}
