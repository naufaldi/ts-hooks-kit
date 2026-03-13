import { index, layout, route, type RouteConfig } from '@react-router/dev/routes'

export default [
  layout('layouts/docs-layout.tsx', [
    index('routes/home.tsx'),
    route('guide/getting-started', 'routes/guide.getting-started.tsx'),
    route('guide/migration', 'routes/guide.migration.tsx'),
    route('react-hook', 'routes/hooks._index.tsx'),
    route('react-hook/:slug', 'routes/hooks.$slug.tsx'),
  ]),
] satisfies RouteConfig
