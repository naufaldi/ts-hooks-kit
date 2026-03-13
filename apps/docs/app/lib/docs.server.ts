import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import type { HookDocMeta } from './types'

const repoRoot = resolve(process.cwd(), '../..')
const generatedRoot = resolve(repoRoot, 'generated/docs')

export function getAllHooks(): HookDocMeta[] {
  const hooksPath = resolve(generatedRoot, 'hooks.json')
  const raw = readFileSync(hooksPath, 'utf8')
  return JSON.parse(raw) as HookDocMeta[]
}

export function getHookBySlug(slug: string): HookDocMeta | null {
  const hooks = getAllHooks()
  return hooks.find(hook => hook.slug === slug) ?? null
}

export function getHookMarkdown(slug: string): string {
  const markdownPath = resolve(generatedRoot, 'hooks', `${slug}.md`)
  return readFileSync(markdownPath, 'utf8')
}

export function getGuideMarkdown(name: 'getting-started' | 'migration'): string {
  const contentPath = resolve(process.cwd(), 'app/content', `${name}.md`)
  return readFileSync(contentPath, 'utf8')
}
