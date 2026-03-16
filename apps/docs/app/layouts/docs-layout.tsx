import { Link, NavLink, Outlet, useLoaderData } from 'react-router'

import { SidebarNav } from '../components/docs/sidebar-nav'
import { ThemeToggle } from '../components/docs/theme-toggle'
import { getAllHooks } from '../lib/docs.server'
import { buildDocsSidebarSections, getDocsNavigation } from '../lib/docs-ux'

export function loader() {
  return { hooks: getAllHooks() }
}

export default function DocsLayout() {
  const { hooks } = useLoaderData<typeof loader>()
  const navigation = getDocsNavigation()
  const sidebarSections = buildDocsSidebarSections(hooks)

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1220px] items-center justify-between px-5 h-16">
          <Link className="text-lg font-bold text-foreground" to="/">
            ts-hooks-kit
          </Link>
          <div className="flex items-center gap-4">
            <nav className="flex items-center gap-4">
              {navigation.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-[1220px] gap-6 px-5 md:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_200px]">
        <SidebarNav sections={sidebarSections} />
        <div className="min-w-0 py-8">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
