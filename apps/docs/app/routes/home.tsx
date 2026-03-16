import { Link } from 'react-router'

export default function HomeRoute() {
  return (
    <section className="max-w-[840px]">
      <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
        React hooks for modern TypeScript apps
      </h1>
      <p className="mt-4 max-w-[680px] text-lg text-muted-foreground">
        <code className="rounded border border-border bg-muted px-1.5 py-0.5 text-sm">
          @ts-hooks-kit/core
        </code>{' '}
        keeps API parity with usehooks-ts while validating React 18/19 and adding more production-ready hooks.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          className="rounded-lg border border-primary bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          to="/react-hook"
        >
          Browse hooks
        </Link>
        <Link
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          to="/guide/migration"
        >
          Migration guide
        </Link>
      </div>
    </section>
  )
}
