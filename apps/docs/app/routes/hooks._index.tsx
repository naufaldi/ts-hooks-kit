import { Link, useLoaderData } from 'react-router'

import { PageHeader } from '../components/docs/page-header'
import { getAllHooks } from '../lib/docs.server'

export function loader() {
  return { hooks: getAllHooks() }
}

export default function HooksIndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <section className="max-w-[840px]">
      <PageHeader
        title="Hooks"
        description="Generated from exported hooks in @ts-hooks-kit/core with summaries from source JSDoc."
      />
      <ul className="mt-2 grid gap-4">
        {data.hooks.map(hook => (
          <li
            key={hook.slug}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/30"
          >
            <Link
              to={`/react-hook/${hook.slug}`}
              className="font-semibold text-foreground hover:text-primary"
            >
              {hook.name}
            </Link>
            <p className="mt-1.5 text-sm text-muted-foreground">{hook.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
