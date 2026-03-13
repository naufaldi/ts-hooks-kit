import { Link, useLoaderData } from 'react-router'

import { getAllHooks } from '../lib/docs.server'

export function loader() {
  return { hooks: getAllHooks() }
}

export default function HooksIndexRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <section>
      <h1>Hooks</h1>
      <p>Generated from exported hooks in `@ts-hooks-kit/core`.</p>
      <ul className="hook-list">
        {data.hooks.map(hook => (
          <li key={hook.slug} className="hook-item">
            <Link to={`/react-hook/${hook.slug}`}>{hook.name}</Link>
            <p>{hook.summary}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
