import { Link } from 'react-router'

import type { HookDocMeta } from '../../lib/types'
import { getHookPager } from '../../lib/docs-ux'

type Props = {
  hooks: HookDocMeta[]
  slug: string
}

export function HookPager({ hooks, slug }: Props) {
  const { prev, next } = getHookPager(hooks, slug)
  if (!prev && !next) {
    return null
  }

  return (
    <nav className="mt-8 flex justify-between gap-4" aria-label="Hook pages">
      {prev ? (
        <Link
          className="grid gap-1 rounded-lg border border-border px-4 py-3 min-w-[160px] text-foreground transition-colors hover:bg-accent/50"
          to={prev.to}
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Previous</span>
          <span className="text-sm font-medium">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          className="grid gap-1 rounded-lg border border-border px-4 py-3 min-w-[160px] text-right text-foreground transition-colors hover:bg-accent/50"
          to={next.to}
        >
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Next</span>
          <span className="text-sm font-medium">{next.label}</span>
        </Link>
      ) : null}
    </nav>
  )
}
