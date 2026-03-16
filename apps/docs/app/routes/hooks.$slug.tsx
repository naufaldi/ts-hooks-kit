import { Link, useLoaderData } from 'react-router'

import { HookPager } from '../components/docs/hook-pager'
import { PageHeader } from '../components/docs/page-header'
import { TableOfContent } from '../components/docs/table-of-content'
import { Markdown } from '../components/markdown'
import { getAllHooks, getHookBySlug, getHookMarkdown } from '../lib/docs.server'

import type { LoaderFunctionArgs } from 'react-router'

const tocItems = [
  { title: 'Usage', url: '#usage' },
  { title: 'API', url: '#api' },
  { title: 'Hook', url: '#hook' },
]

export function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? ''
  const hook = getHookBySlug(slug)
  if (!hook) {
    throw new Response('Hook not found', { status: 404 })
  }

  // Strip the leading h1 + description since PageHeader already shows them
  const raw = getHookMarkdown(slug)
  const markdown = raw.replace(/^#\s+.+\n+(?:(?!##).+\n)*/m, '')

  return {
    hook,
    hooks: getAllHooks(),
    markdown,
  }
}

export default function HookDetailRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="flex gap-6">
      <section className="min-w-0 flex-1 max-w-[840px]">
        <p className="mb-4 text-sm text-muted-foreground">
          <Link to="/react-hook" className="hover:text-foreground transition-colors">
            All hooks
          </Link>
        </p>
        <PageHeader title={data.hook.name} description={data.hook.summary} />
        <Markdown source={data.markdown} />
        <HookPager hooks={data.hooks} slug={data.hook.slug} />
      </section>
      <TableOfContent items={tocItems} />
    </div>
  )
}
