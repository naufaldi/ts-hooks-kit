import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import ReactMarkdown from 'react-markdown'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'
import remarkGfm from 'remark-gfm'
import { createHighlighterCoreSync } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import langTs from 'shiki/langs/typescript.mjs'
import langTsx from 'shiki/langs/tsx.mjs'
import langBash from 'shiki/langs/bash.mjs'
import langJson from 'shiki/langs/json.mjs'
import githubLight from 'shiki/themes/github-light.mjs'
import githubDark from 'shiki/themes/github-dark.mjs'

import { Link } from 'react-router'

import { slugifyHeading } from '../lib/markdown-helpers'

const highlighter = createHighlighterCoreSync({
  themes: [githubLight, githubDark],
  langs: [langTs, langTsx, langBash, langJson],
  engine: createJavaScriptRegexEngine(),
})

function textFromChildren(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(textFromChildren).join(' ')
  }

  if (node && typeof node === 'object' && 'props' in node) {
    const children = (node as { props?: { children?: ReactNode } }).props?.children
    return textFromChildren(children ?? '')
  }

  return ''
}

function HeadingAnchor({
  as: Tag,
  children,
  ...props
}: ComponentPropsWithoutRef<'h1'> & { as: 'h1' | 'h2' | 'h3' | 'h4' }) {
  const id = slugifyHeading(textFromChildren(children))
  return (
    <Tag id={id} className="scroll-mt-20" {...props}>
      {children}
    </Tag>
  )
}

export function Markdown({ source }: { source: string }) {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          [
            rehypeShikiFromHighlighter,
            highlighter,
            {
              themes: { light: 'github-light', dark: 'github-dark' },
              defaultColor: false,
            },
          ],
        ]}
        components={{
          h1: ({ children, ...props }) => (
            <HeadingAnchor as="h1" {...props}>{children}</HeadingAnchor>
          ),
          h2: ({ children, ...props }) => (
            <HeadingAnchor as="h2" {...props}>{children}</HeadingAnchor>
          ),
          h3: ({ children, ...props }) => (
            <HeadingAnchor as="h3" {...props}>{children}</HeadingAnchor>
          ),
          h4: ({ children, ...props }) => (
            <HeadingAnchor as="h4" {...props}>{children}</HeadingAnchor>
          ),
          a: ({ href, children, ...props }) => {
            const isInternal = href?.startsWith('/')
            if (isInternal && href) {
              return <Link to={href} {...props}>{children}</Link>
            }
            return (
              <a
                href={href}
                {...props}
                target="_blank"
                rel="noreferrer noopener"
              >
                {children}
              </a>
            )
          },
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" {...props}>{children}</table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-muted" {...props}>{children}</thead>
          ),
          th: ({ children, ...props }) => (
            <th className="border border-border px-3 py-2 text-left font-semibold" scope="col" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border border-border px-3 py-2" {...props}>
              {children}
            </td>
          ),
          pre: ({ children, ...props }) => (
            <pre
              className="overflow-auto rounded-lg border border-border p-4 text-sm leading-relaxed"
              {...props}
            >
              {children}
            </pre>
          ),
        }}
      >
        {source}
      </ReactMarkdown>
    </article>
  )
}
