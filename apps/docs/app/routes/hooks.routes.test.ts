import { describe, expect, it, vi } from 'vitest'

import { loader as hookDetailLoader } from './hooks.$slug'
import { loader as hooksIndexLoader } from './hooks._index'

vi.mock('../lib/docs.server', () => ({
  getAllHooks: () => [{ name: 'useBoolean', slug: 'use-boolean', summary: 'summary', hasMarkdown: true }],
  getHookBySlug: (slug: string) =>
    slug === 'use-boolean' ? { name: 'useBoolean', slug, summary: 'summary', hasMarkdown: true } : null,
  getHookMarkdown: () => '# useBoolean',
}))

describe('hooks routes', () => {
  it('loads hooks list', () => {
    const payload = hooksIndexLoader()
    expect(payload.hooks).toHaveLength(1)
    expect(payload.hooks[0]?.slug).toBe('use-boolean')
  })

  it('loads hook detail by slug', () => {
    const payload = hookDetailLoader({ params: { slug: 'use-boolean' } } as never)
    expect(payload.hook.name).toBe('useBoolean')
  })

  it('throws 404 for unknown slug', () => {
    try {
      hookDetailLoader({ params: { slug: 'unknown' } } as never)
      expect.fail('Expected loader to throw a 404 response')
    } catch (error) {
      expect(error).toBeInstanceOf(Response)
      expect((error as Response).status).toBe(404)
    }
  })
})
