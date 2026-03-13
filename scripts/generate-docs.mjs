import { mkdirSync, readFileSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(__dirname, '..')
const generatedRoot = resolve(repoRoot, 'generated')
const typedocRoot = join(generatedRoot, 'typedoc')
const docsRoot = join(generatedRoot, 'docs')
const hooksDocsRoot = join(docsRoot, 'hooks')
const coreRoot = resolve(repoRoot, 'packages/core/src')
const exportIndexPath = resolve(coreRoot, 'index.ts')

function toSlug(hookName) {
  return hookName.replace(/^use/, 'use-').replace(/[A-Z]/g, c => `-${c.toLowerCase()}`).replace('--', '-')
}

function parseExportedHooks(indexSource) {
  const lines = indexSource.split('\n')
  const hooks = []
  for (const line of lines) {
    const match = line.match(/export \* from '\.\/(use[A-Za-z0-9]+)'/)
    if (match) hooks.push(match[1])
  }
  return hooks
}

function extractJsDocSummary(source) {
  const match = source.match(/\/\*\*([\s\S]*?)\*\/\s*export function/)
  if (!match) return ''
  const lines = match[1]
    .split('\n')
    .map(line => line.replace(/^\s*\*\s?/, ''))
    .filter(line => line.length > 0 && !line.startsWith('@'))
  return lines.join(' ').trim()
}

function generateHookEntry(hookName) {
  const hookDir = resolve(coreRoot, hookName)
  const hookTsPath = resolve(hookDir, `${hookName}.ts`)
  const hookMdPath = resolve(hookDir, `${hookName}.md`)

  const source = existsSync(hookTsPath) ? readFileSync(hookTsPath, 'utf8') : ''
  const summary = extractJsDocSummary(source) || `${hookName} hook for React apps.`
  const slug = toSlug(hookName)
  const markdown = existsSync(hookMdPath)
    ? readFileSync(hookMdPath, 'utf8')
    : `# ${hookName}\n\nDocumentation is coming soon.`

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

  const indexSource = readFileSync(exportIndexPath, 'utf8')
  const hookNames = parseExportedHooks(indexSource)
  const hooks = hookNames.map(generateHookEntry)

  writeFileSync(join(docsRoot, 'hooks.json'), JSON.stringify(hooks, null, 2))
}

main()
