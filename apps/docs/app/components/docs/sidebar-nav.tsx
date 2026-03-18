import { NavLink } from 'react-router'

import type { DocsSidebarSection } from '../../lib/docs-ux'

type Props = {
  sections: DocsSidebarSection[]
}

export function SidebarNav({ sections }: Props) {
  return (
    <aside
      className="hidden md:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto py-6 pr-4 border-r border-border"
      aria-label="Documentation sidebar"
    >
      {sections.map(section => (
        <section key={section.title} className="mb-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.title}
          </h2>
          <div className="grid gap-0.5">
            {section.items.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block rounded-md px-2.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`
                }
              >
                {({ isActive }) => (
                  <span aria-current={isActive ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </section>
      ))}
    </aside>
  )
}
