import { beforeEach, describe, expect, it, vi } from 'vitest'

import { getAllHooks, getGuideMarkdown, getHookBySlug, getHookMarkdown } from './docs.server'

const { readFileSyncMock } = vi.hoisted(() => ({
  readFileSyncMock: vi.fn(),
}))

vi.mock('node:fs', () => ({
  readFileSync: readFileSyncMock,
}))

describe('docs.server', () => {
  beforeEach(() => {
    readFileSyncMock.mockReset()
  })

  it('returns all hooks from generated hooks.json', () => {
    readFileSyncMock.mockReturnValueOnce(
      JSON.stringify([{ name: 'useBoolean', slug: 'use-boolean', summary: 'summary', hasMarkdown: true }]),
    )

    const hooks = getAllHooks()

    expect(hooks).toHaveLength(1)
    expect(hooks[0]?.slug).toBe('use-boolean')
  })

  it('returns null when hook slug is missing', () => {
    readFileSyncMock.mockReturnValueOnce('[]')

    expect(getHookBySlug('does-not-exist')).toBeNull()
  })

  it('reads hook markdown from generated docs', () => {
    readFileSyncMock.mockReturnValueOnce('# useBoolean')

    const markdown = getHookMarkdown('use-boolean')

    expect(markdown).toContain('useBoolean')
  })

  it('reads guide markdown from app content', () => {
    readFileSyncMock.mockReturnValueOnce('# Migration')

    const markdown = getGuideMarkdown('migration')

    expect(markdown).toContain('Migration')
  })
})
