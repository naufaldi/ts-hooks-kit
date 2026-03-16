import React, { Suspense } from 'react'
import { Link, useLoaderData } from 'react-router'

import { PageHeader } from '../components/docs/page-header'
import { PreviewCodeTabs } from '../components/docs/preview-code-tabs'
import { getExampleBySlug } from '../lib/examples'
import { getExampleSource } from '../lib/examples.server'

import type { LazyExoticComponent } from 'react'
import type { LoaderFunctionArgs } from 'react-router'

function hookNameToSlug(name: string): string {
  return name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

const lazyComponents: Record<string, LazyExoticComponent<React.ComponentType>> = {
  'dark-mode-toggle': React.lazy(() => import('../examples/dark-mode-toggle')),
  'infinite-scroll': React.lazy(() => import('../examples/infinite-scroll')),
  'search-with-debounce': React.lazy(() => import('../examples/search-with-debounce')),
  'responsive-layout': React.lazy(() => import('../examples/responsive-layout')),
  'clipboard-manager': React.lazy(() => import('../examples/clipboard-manager')),
}

export function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug ?? ''
  const example = getExampleBySlug(slug)
  if (!example) {
    throw new Response('Example not found', { status: 404 })
  }

  const source = getExampleSource(slug)

  return { example, source }
}

export default function ExampleDetailRoute() {
  const data = useLoaderData<typeof loader>()
  const LazyExample = lazyComponents[data.example.slug]

  return (
    <section className="max-w-[840px]">
      <p className="mb-4 text-sm text-muted-foreground">
        <Link to="/examples" className="hover:text-foreground transition-colors">
          All examples
        </Link>
      </p>
      <PageHeader title={data.example.title} description={data.example.description} />

      <div className="mb-6 flex flex-wrap gap-2">
        {data.example.hooks.map(hook => (
          <Link
            key={hook}
            to={`/react-hook/${hookNameToSlug(hook)}`}
            className="inline-block rounded-md bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {hook}
          </Link>
        ))}
      </div>

      <PreviewCodeTabs
        preview={
          LazyExample ? (
            <Suspense
              fallback={
                <div className="py-8 text-center text-sm text-muted-foreground">
                  Loading example...
                </div>
              }
            >
              <LazyExample />
            </Suspense>
          ) : (
            <div className="py-8 text-center text-sm text-muted-foreground">
              Example component not available.
            </div>
          )
        }
        source={data.source}
      />
    </section>
  )
}
