import { useState, useEffect } from 'react'
import { useCopyToClipboard } from '@ts-hooks-kit/core'
import { useBoolean } from '@ts-hooks-kit/core'

const SNIPPETS = [
  { label: 'Install', code: 'pnpm add @ts-hooks-kit/core' },
  { label: 'Import', code: "import { useBoolean } from '@ts-hooks-kit/core'" },
  { label: 'CDN', code: 'https://unpkg.com/@ts-hooks-kit/core' },
  { label: 'Hook usage', code: "const { value, toggle } = useBoolean(false)" },
]

function CopyButton({ text, onCopy }: { text: string; onCopy: (text: string) => void }) {
  const [, copyToClipboard] = useCopyToClipboard()
  const { value: showFeedback, setTrue: showCopied, setFalse: hideCopied } = useBoolean(false)

  useEffect(() => {
    if (!showFeedback) return
    const timer = setTimeout(hideCopied, 2000)
    return () => clearTimeout(timer)
  }, [showFeedback, hideCopied])

  const handleCopy = async () => {
    const ok = await copyToClipboard(text)
    if (ok) {
      showCopied()
      onCopy(text)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`shrink-0 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
        showFeedback
          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
    >
      {showFeedback ? 'Copied!' : 'Copy'}
    </button>
  )
}

export default function ClipboardManager() {
  const [lastCopied, setLastCopied] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-lg space-y-4">
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
        Clipboard Manager
      </h2>

      <div className="space-y-2">
        {SNIPPETS.map(snippet => (
          <div
            key={snippet.label}
            className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
          >
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {snippet.label}
              </p>
              <p className="truncate font-mono text-sm text-gray-800 dark:text-gray-200">
                {snippet.code}
              </p>
            </div>
            <CopyButton text={snippet.code} onCopy={setLastCopied} />
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Last copied
        </p>
        <p className="mt-1 truncate font-mono text-sm text-gray-700 dark:text-gray-300">
          {lastCopied ?? 'Nothing copied yet'}
        </p>
      </div>
    </div>
  )
}
