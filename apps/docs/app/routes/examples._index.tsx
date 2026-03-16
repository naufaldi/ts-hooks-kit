import { Link, useLoaderData } from 'react-router'

import { PageHeader } from '../components/docs/page-header'
import { EXAMPLES } from '../lib/examples'

export function loader() {
  return { examples: EXAMPLES }
}

export default function ExamplesIndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <section className="max-w-[840px]">
      <PageHeader
        title="Examples"
        description="Real-world recipes showing how to combine multiple hooks from @ts-hooks-kit/core."
      />
      <ul className="mt-2 grid gap-4">
        {data.examples.map(example => (
          <li
            key={example.slug}
            className="rounded-lg border border-border bg-card p-4 transition-colors hover:bg-accent/30"
          >
            <Link
              to={`/examples/${example.slug}`}
              className="font-semibold text-foreground hover:text-primary"
            >
              {example.title}
            </Link>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {example.description}
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {example.hooks.map(hook => (
                <span
                  key={hook}
                  className="inline-block rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {hook}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
