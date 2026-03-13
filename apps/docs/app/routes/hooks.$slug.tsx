import { Link, useLoaderData } from 'react-router'

import { Markdown } from '../components/markdown'
import { getHookBySlug, getHookMarkdown } from '../lib/docs.server'

import type { LoaderFunctionArgs } from 'react-router'

export function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? ''
  const hook = getHookBySlug(slug)
  if (!hook) {
    throw new Response('Hook not found', { status: 404 })
  }

  return {
    hook,
    markdown: getHookMarkdown(slug),
  }
}

export default function HookDetailRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <section>
      <p>
        <Link to="/react-hook">All hooks</Link>
      </p>
      <h1>{data.hook.name}</h1>
      <p>{data.hook.summary}</p>
      <Markdown source={data.markdown} />
    </section>
  )
}
