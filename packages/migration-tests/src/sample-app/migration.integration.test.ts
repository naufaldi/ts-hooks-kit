import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { transformSource } from '@ts-hooks-kit/codemod'

const FIXTURES_DIR = resolve(
  import.meta.dirname,
  '../../../../examples/sample-app/fixtures/pre-migration',
)
const EXPECTED_DIR = resolve(
  import.meta.dirname,
  '../../../../examples/sample-app/src',
)

const fixtureFiles = [
  'App.tsx',
  'components/Counter.tsx',
  'hooks/useCustomLogic.ts',
  'legacyRequire.cjs',
]

describe('sample-app migration integration', () => {
  for (const file of fixtureFiles) {
    it(`migrates ${file} correctly`, () => {
      const preMigration = readFileSync(resolve(FIXTURES_DIR, file), 'utf-8')
      const expected = readFileSync(resolve(EXPECTED_DIR, file), 'utf-8')

      expect(preMigration).toContain('usehooks-ts')

      const result = transformSource(preMigration)

      expect(result.changed).toBe(true)
      expect(result.rewrites).toBeGreaterThan(0)
      expect(result.code).not.toContain("from 'usehooks-ts'")
      expect(result.code).not.toContain("require('usehooks-ts')")
      expect(result.code.trim()).toBe(expected.trim())
    })
  }

  it('does not modify files without usehooks-ts imports', () => {
    const input = "import { useState } from 'react'\n"
    const result = transformSource(input)
    expect(result.changed).toBe(false)
  })
})
