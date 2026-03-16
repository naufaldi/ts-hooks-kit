import { describe, expect, it } from 'vitest'

import type { HookDocMeta } from './types'
import { buildDocsSidebarSections, getDocsNavigation, getHookPager } from './docs-ux'

const hooks: HookDocMeta[] = [
  { name: 'useBoolean', slug: 'use-boolean', summary: 'Boolean helper', hasMarkdown: true },
  { name: 'useCounter', slug: 'use-counter', summary: 'Counter helper', hasMarkdown: true },
  { name: 'useLocalStorage', slug: 'use-local-storage', summary: 'Storage helper', hasMarkdown: true },
]

describe('docs-ux', () => {
  it('returns top navigation in docs-familiar order', () => {
    expect(getDocsNavigation()).toEqual([
      { to: '/guide/getting-started', label: 'Getting Started' },
      { to: '/guide/migration', label: 'Migration' },
      { to: '/react-hook', label: 'Hooks' },
      { to: '/examples', label: 'Examples' },
    ])
  })

  it('builds sidebar sections with static guides and dynamic hooks', () => {
    const sections = buildDocsSidebarSections(hooks)

    expect(sections).toHaveLength(3)
    expect(sections[0]).toEqual({
      title: 'Guides',
      items: [
        { to: '/guide/getting-started', label: 'Getting Started' },
        { to: '/guide/migration', label: 'Migration' },
      ],
    })
    expect(sections[1]?.title).toBe('Examples')
    expect(sections[2]?.title).toBe('Hooks')
    expect(sections[2]?.items[0]).toEqual({
      to: '/react-hook/use-boolean',
      label: 'useBoolean',
    })
  })

  it('returns previous and next hook links for hook detail pages', () => {
    expect(getHookPager(hooks, 'use-counter')).toEqual({
      prev: { to: '/react-hook/use-boolean', label: 'useBoolean' },
      next: { to: '/react-hook/use-local-storage', label: 'useLocalStorage' },
    })
  })
})
