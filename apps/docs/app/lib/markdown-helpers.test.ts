import { describe, expect, it } from 'vitest'

import { slugifyHeading } from './markdown-helpers'

describe('markdown helpers', () => {
  it('slugifies heading text for anchor ids', () => {
    expect(slugifyHeading('Getting Started')).toBe('getting-started')
    expect(slugifyHeading('React 18/19 + TypeScript')).toBe('react-18-19-typescript')
  })
})
