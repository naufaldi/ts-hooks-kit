import { Link, NavLink, Outlet } from 'react-router'

const navigation = [
  { to: '/guide/getting-started', label: 'Getting Started' },
  { to: '/guide/migration', label: 'Migration' },
  { to: '/react-hook', label: 'Hooks' },
]

export default function DocsLayout() {
  return (
    <div className="app-shell">
      <header className="header">
        <div className="container header-inner">
          <Link className="brand" to="/">
            ts-hooks-kit
          </Link>
          <nav className="nav">
            {navigation.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container page">
        <Outlet />
      </main>
    </div>
  )
}
