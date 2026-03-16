import type { HookDocMeta } from './types'

// Import generated data at build time so it's bundled into the server
// instead of reading from the filesystem at runtime (which fails on Netlify)
import hooksJson from '../../../../generated/docs/hooks.json'

const hookMarkdowns = import.meta.glob<string>(
  '../../../../generated/docs/hooks/*.md',
  { query: '?raw', import: 'default', eager: true },
)

const guideMarkdowns = import.meta.glob<string>('../content/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export function getAllHooks(): HookDocMeta[] {
  return hooksJson as HookDocMeta[]
}

export function getHookBySlug(slug: string): HookDocMeta | null {
  const hooks = getAllHooks()
  return hooks.find(hook => hook.slug === slug) ?? null
}

export function getHookMarkdown(slug: string): string {
  const key = `../../../../generated/docs/hooks/${slug}.md`
  const content = hookMarkdowns[key]
  if (!content) throw new Error(`Hook markdown not found: ${slug}`)
  return content
}

export function getGuideMarkdown(
  name: 'getting-started' | 'migration',
): string {
  const key = `../content/${name}.md`
  const content = guideMarkdowns[key]
  if (!content) throw new Error(`Guide markdown not found: ${name}`)
  return content
}
