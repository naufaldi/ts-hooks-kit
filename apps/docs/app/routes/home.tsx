import { Link } from 'react-router'

export default function HomeRoute() {
  return (
    <section>
      <h1>React hooks for modern TypeScript apps</h1>
      <p>
        <code>@ts-hooks-kit/core</code> keeps API parity with usehooks-ts while validating React
        18/19 and adding more production-ready hooks.
      </p>
      <div className="actions">
        <Link className="button" to="/react-hook">
          Browse hooks
        </Link>
        <Link className="button button-secondary" to="/guide/migration">
          Migration guide
        </Link>
      </div>
    </section>
  )
}
