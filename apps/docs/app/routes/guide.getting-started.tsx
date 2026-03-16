import { useLoaderData } from 'react-router'

import { PageHeader } from '../components/docs/page-header'
import { Markdown } from '../components/markdown'
import { getGuideMarkdown } from '../lib/docs.server'

export function loader() {
  return { markdown: getGuideMarkdown('getting-started') }
}

export default function GettingStartedRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <section className="max-w-[840px]">
      <PageHeader
        title="Getting Started"
        description="Install @ts-hooks-kit/core, understand compatibility, and integrate hooks into your app."
      />
      <Markdown source={data.markdown} />
    </section>
  )
}
