import { describe, expect, it, vi } from 'vitest'

import { loader } from './docs-layout'

vi.mock('../lib/docs.server', () => ({
  getAllHooks: () => [{ name: 'useBoolean', slug: 'use-boolean', summary: 'summary', hasMarkdown: true }],
}))

describe('docs layout loader', () => {
  it('returns hooks for docs navigation and sidebar', () => {
    const payload = loader()

    expect(payload.hooks).toHaveLength(1)
    expect(payload.hooks[0]?.slug).toBe('use-boolean')
  })
})
