import { useLoaderData } from 'react-router'

import { Markdown } from '../components/markdown'
import { getGuideMarkdown } from '../lib/docs.server'

export function loader() {
  return { markdown: getGuideMarkdown('getting-started') }
}

export default function GettingStartedRoute() {
  const data = useLoaderData<typeof loader>()
  return (
    <section>
      <Markdown source={data.markdown} />
    </section>
  )
}
