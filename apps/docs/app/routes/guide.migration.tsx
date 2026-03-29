import { useLoaderData } from 'react-router'

import { PageHeader } from '../components/docs/page-header'
import { Markdown } from '../components/markdown'
import { getGuideMarkdown } from '../lib/docs.server'

export function loader() {
  return { markdown: getGuideMarkdown('migration') }
}

export default function MigrationRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <section className="max-w-[840px]">
      <PageHeader
        title="Migration from usehooks-ts"
        description="Step-by-step guide to migrate from usehooks-ts to @ts-hooks-kit/core, with automated codemod, before/after examples, and known differences."
      />
      <Markdown source={data.markdown} />
    </section>
  )
}
