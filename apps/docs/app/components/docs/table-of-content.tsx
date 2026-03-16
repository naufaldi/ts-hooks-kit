import { useEffect, useState } from 'react'

export type TocItem = {
  title: string
  url: string
}

type Props = {
  items: TocItem[]
}

export function TableOfContent({ items }: Props) {
  const [activeId, setActiveId] = useState('')

  useEffect(() => {
    const ids = items.map(i => i.url.replace('#', ''))
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px', threshold: 0 },
    )

    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <aside className="hidden xl:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-auto py-6 pl-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On This Page
      </p>
      <nav>
        <ul className="space-y-1 text-sm">
          {items.map(item => (
            <li key={item.url}>
              <a
                href={item.url}
                className={`block py-1 transition-colors ${
                  activeId === item.url.replace('#', '')
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
