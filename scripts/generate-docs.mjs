import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

import {
  composeHookMarkdown,
  extractJsDocSummary,
  getHookTypedocData,
  parseExportedHooks,
  toSlug,
} from './lib/docs-generation.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const generatedRoot = resolve(repoRoot, 'generated')
const typedocRoot = join(generatedRoot, 'typedoc')
const docsRoot = join(generatedRoot, 'docs')
const hooksDocsRoot = join(docsRoot, 'hooks')
const coreRoot = resolve(repoRoot, 'packages/core/src')
const exportIndexPath = resolve(coreRoot, 'index.ts')

function generateHookEntry(hookName, typedocJson) {
  const hookDir = resolve(coreRoot, hookName)
  const hookTsPath = resolve(hookDir, `${hookName}.ts`)
  const hookDemoPath = resolve(hookDir, `${hookName}.demo.tsx`)
  const hookMdPath = resolve(hookDir, `${hookName}.md`)

  const source = existsSync(hookTsPath) ? readFileSync(hookTsPath, 'utf8') : ''
  const typedocData = getHookTypedocData(typedocJson, hookName)
  const summary = typedocData.summary || extractJsDocSummary(source, hookName) || `${hookName} hook for React apps.`
  const slug = toSlug(hookName)
  const introMarkdown = existsSync(hookMdPath) ? readFileSync(hookMdPath, 'utf8') : ''
  const demoSource = existsSync(hookDemoPath) ? readFileSync(hookDemoPath, 'utf8') : ''
  const markdown = composeHookMarkdown({
    hookName,
    slug,
    summary,
    introMarkdown,
    demoSource,
    hookSource: source,
    typedocData,
  })

  writeFileSync(join(hooksDocsRoot, `${slug}.md`), markdown)

  return {
    name: hookName,
    slug,
    summary,
    hasMarkdown: existsSync(hookMdPath),
  }
}

function main() {
  rmSync(docsRoot, { recursive: true, force: true })
  rmSync(typedocRoot, { recursive: true, force: true })

  mkdirSync(generatedRoot, { recursive: true })
  mkdirSync(docsRoot, { recursive: true })
  mkdirSync(hooksDocsRoot, { recursive: true })

  execSync('pnpm exec typedoc --options typedoc.json', {
    cwd: repoRoot,
    stdio: 'inherit',
  })
  const typedocJsonPath = join(typedocRoot, 'all.json')
  const typedocJson = JSON.parse(readFileSync(typedocJsonPath, 'utf8'))

  const indexSource = readFileSync(exportIndexPath, 'utf8')
  const hookNames = parseExportedHooks(indexSource)
  const hooks = hookNames.map(hookName => generateHookEntry(hookName, typedocJson))

  writeFileSync(join(docsRoot, 'hooks.json'), JSON.stringify(hooks, null, 2))
}

main()
