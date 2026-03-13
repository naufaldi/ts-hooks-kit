import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'

import type { ReactNode } from 'react'

import './styles.css'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}

export function ErrorBoundary() {
  return (
    <main className="container">
      <h1>Something went wrong</h1>
      <p>Please refresh the page or try again later.</p>
    </main>
  )
}
