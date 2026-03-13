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
})
