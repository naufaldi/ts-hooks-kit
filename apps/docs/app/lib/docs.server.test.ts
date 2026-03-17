import { describe, expect, it } from 'vitest'

import { getAllHooks, getGuideMarkdown, getHookBySlug, getHookMarkdown } from './docs.server'

describe('docs.server', () => {
  it('returns all hooks from generated hooks.json', () => {
    const hooks = getAllHooks()

    expect(hooks.length).toBeGreaterThan(50)
    expect(hooks.some(h => h.slug === 'use-boolean')).toBe(true)
  })

  it('returns null when hook slug is missing', () => {
    expect(getHookBySlug('does-not-exist')).toBeNull()
  })

  it('returns hook when slug exists', () => {
    const hook = getHookBySlug('use-boolean')
    expect(hook).not.toBeNull()
    expect(hook?.name).toBe('useBoolean')
  })

  it('reads hook markdown from generated docs', () => {
    const markdown = getHookMarkdown('use-boolean')
    expect(markdown).toContain('useBoolean')
  })

  it('reads guide markdown from app content', () => {
    const markdown = getGuideMarkdown('migration')
    expect(markdown).toContain('Migration')
  })
})
