import { useState } from 'react'

import { Markdown } from '../markdown'

import type { ReactNode } from 'react'

type Props = {
  preview: ReactNode
  source: string
}

type Tab = 'preview' | 'code'

export function PreviewCodeTabs({ preview, source }: Props) {
  const [active, setActive] = useState<Tab>('preview')

  return (
    <div className="min-w-0">
      <div className="flex gap-4 border-b border-border">
        <button
          type="button"
          onClick={() => setActive('preview')}
          className={`cursor-pointer pb-2 text-sm font-medium transition-colors ${
            active === 'preview'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Preview
        </button>
        <button
          type="button"
          onClick={() => setActive('code')}
          className={`cursor-pointer pb-2 text-sm font-medium transition-colors ${
            active === 'code'
              ? 'border-b-2 border-primary text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Code
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-border">
        <div className={active === 'preview' ? 'p-6' : 'hidden'}>
          {preview}
        </div>
        <div className={active === 'code' ? 'max-h-[600px] overflow-auto' : 'hidden'}>
          <Markdown source={`\`\`\`tsx\n${source}\n\`\`\``} />
        </div>
      </div>
    </div>
  )
}
