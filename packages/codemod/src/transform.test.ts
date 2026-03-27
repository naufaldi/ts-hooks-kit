import { describe, expect, it } from 'vitest'

import { transformSource } from './transform'

describe('transformSource', () => {
  it('rewrites usehooks-ts import declarations', () => {
    const input = [
      "import { useBoolean, useLocalStorage } from 'usehooks-ts'",
      "import * as Hooks from 'usehooks-ts'",
      "import type { UseBooleanReturn } from 'usehooks-ts'",
      '',
      'const untouched = true',
      '',
    ].join('\n')

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(3)
    expect(result.code).toContain("from '@ts-hooks-kit/core'")
    expect(result.code).not.toContain("from 'usehooks-ts'")
  })

  it('rewrites require calls', () => {
    const input = "const hooks = require('usehooks-ts')\n"

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("require('@ts-hooks-kit/core')")
  })

  it('does not change other libraries', () => {
    const input = "import { useState } from 'react'\n"

    const result = transformSource(input)

    expect(result.changed).toBe(false)
    expect(result.rewrites).toBe(0)
    expect(result.code).toBe(input)
  })

  it('rewrites aliased named imports', () => {
    const input = "import { useBoolean as useFlag } from 'usehooks-ts'\n"

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("from '@ts-hooks-kit/core'")
    expect(result.code).toContain('useBoolean as useFlag')
  })

  it('rewrites named re-exports', () => {
    const input = "export { useBoolean } from 'usehooks-ts'\n"

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("from '@ts-hooks-kit/core'")
  })

  it('rewrites barrel re-exports', () => {
    const input = "export * from 'usehooks-ts'\n"

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("from '@ts-hooks-kit/core'")
  })

  it('rewrites multiple usehooks-ts imports in one file', () => {
    const input = [
      "import { useBoolean } from 'usehooks-ts'",
      "import { useCounter } from 'usehooks-ts'",
      '',
    ].join('\n')

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(2)
    expect(result.code).not.toContain("from 'usehooks-ts'")
  })

  it('only rewrites usehooks-ts in mixed imports', () => {
    const input = [
      "import { useState } from 'react'",
      "import { useBoolean } from 'usehooks-ts'",
      "import { debounce } from 'lodash'",
      '',
    ].join('\n')

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("from 'react'")
    expect(result.code).toContain("from 'lodash'")
    expect(result.code).not.toContain("from 'usehooks-ts'")
  })

  it('rewrites dynamic imports', () => {
    const input = "const hooks = await import('usehooks-ts')\n"

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("import('@ts-hooks-kit/core')")
    expect(result.code).not.toContain("import('usehooks-ts')")
  })

  it('rewrites dynamic import without await', () => {
    const input = "const hooks = import('usehooks-ts')\n"

    const result = transformSource(input)

    expect(result.changed).toBe(true)
    expect(result.rewrites).toBe(1)
    expect(result.code).toContain("import('@ts-hooks-kit/core')")
  })

  it('does not rewrite dynamic imports of other packages', () => {
    const input = "const hooks = await import('lodash')\n"

    const result = transformSource(input)

    expect(result.changed).toBe(false)
    expect(result.rewrites).toBe(0)
  })

  it('does not change files with no imports', () => {
    const input = 'const x = 42\nconsole.log(x)\n'

    const result = transformSource(input)

    expect(result.changed).toBe(false)
    expect(result.rewrites).toBe(0)
    expect(result.code).toBe(input)
  })
})
