## Migration Overview

Moving from `usehooks-ts` to `@ts-hooks-kit/core` is designed to be straightforward. The library maintains API compatibility with `usehooks-ts@3.1.1` — most hooks are drop-in replacements. An automated codemod handles import rewrites, and parity tests verify behavioral compatibility.

## Prerequisites

- **Node.js** >= 20
- **React** ^18 || ^19
- **TypeScript** ^5.0 (recommended)

## Step 1: Install

```bash
# pnpm
pnpm add @ts-hooks-kit/core
pnpm remove usehooks-ts

# npm
npm install @ts-hooks-kit/core
npm uninstall usehooks-ts

# yarn
yarn add @ts-hooks-kit/core
yarn remove usehooks-ts
```

## Step 2: Rewrite Imports

### Automated (recommended)

Use the codemod CLI to rewrite all imports in one pass:

```bash
# Preview changes first (no files modified)
npx @ts-hooks-kit/codemod ./src --dry

# Apply changes
npx @ts-hooks-kit/codemod ./src
```

The codemod handles:
- Named imports: `import { useBoolean } from 'usehooks-ts'`
- Type imports: `import type { ... } from 'usehooks-ts'`
- Re-exports: `export { useBoolean } from 'usehooks-ts'`
- CommonJS: `const { useBoolean } = require('usehooks-ts')`
- Dynamic imports: `const mod = await import('usehooks-ts')`

Use `-p` to limit to specific file patterns:

```bash
npx @ts-hooks-kit/codemod ./src -p "**/*.tsx"
```

### Manual

Replace `usehooks-ts` with `@ts-hooks-kit/core` in all import statements:

```ts
// before
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'

// after
import { useLocalStorage, useMediaQuery } from '@ts-hooks-kit/core'
```

## Step 3: Before & After Examples

### Component with named imports

```tsx
// Before (usehooks-ts)
import { useLocalStorage, useMediaQuery } from 'usehooks-ts'

export const App = () => {
  const [name, setName] = useLocalStorage('name', 'default')
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  return <div>{name} {String(isDark)}</div>
}
```

```tsx
// After (@ts-hooks-kit/core)
import { useLocalStorage, useMediaQuery } from '@ts-hooks-kit/core'

export const App = () => {
  const [name, setName] = useLocalStorage('name', 'default')
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  return <div>{name} {String(isDark)}</div>
}
```

### Custom hook file

```ts
// Before
import { useDebounceValue, useBoolean } from 'usehooks-ts'

export function useCustomLogic() {
  const { value: isOn, toggle } = useBoolean(false)
  const [delayedValue] = useDebounceValue(isOn, 300)
  return { isOn, toggle, delayedValue }
}
```

```ts
// After
import { useDebounceValue, useBoolean } from '@ts-hooks-kit/core'

export function useCustomLogic() {
  const { value: isOn, toggle } = useBoolean(false)
  const [delayedValue] = useDebounceValue(isOn, 300)
  return { isOn, toggle, delayedValue }
}
```

### CommonJS require

```js
// Before
const { useBoolean } = require('usehooks-ts')

// After
const { useBoolean } = require('@ts-hooks-kit/core')
```

## Step 4: Verify

After rewriting imports, run your existing checks:

```bash
# Type check
npx tsc --noEmit

# Run tests
npx vitest run
# or
npx jest

# Lint
npx eslint .
```

## Known Behavioral Differences

Most hooks are drop-in replacements. A few have intentional improvements:

| Hook | Difference | Impact |
|------|-----------|--------|
| `useBoolean` | Adds input validation — throws if initial value is not a boolean | Catches bugs earlier; code passing booleans is unaffected |
| `useDebounceValue` | Uses internal debounce instead of `lodash.debounce` | Removes lodash dependency; timing behavior is equivalent |
| `useDebounceCallback` | Uses internal debounce instead of `lodash.debounce` | Same API surface (`cancel`, `flush`, `isPending`); no lodash needed |
| `useSessionStorage` | Applies `sanitizeJson` guard on deserialization | Protects against prototype pollution; normal data is unaffected |
| `useResizeObserver` | Uses layout effect with rAF polling for deferred ref binding | Handles late-mounting refs more reliably; same observable behavior |

## Troubleshooting

**"Cannot find module '@ts-hooks-kit/core'"**
Ensure the package is installed: `pnpm add @ts-hooks-kit/core`

**Type errors after migration**
Verify TypeScript >= 5.0 and check that `@types/react` matches your React version.

**Debounce timing differences in tests**
The internal debounce implementation behaves equivalently to lodash but uses `Date.now()` internally. If your tests use fake timers, they should continue to work. If you see minor timing differences, use generous timer advancement (e.g., `vi.advanceTimersByTime(delay + 100)`).

**localStorage/sessionStorage test failures**
`@ts-hooks-kit/core` applies a `sanitizeJson` guard that strips `__proto__` and `constructor.prototype` keys during deserialization. If your tests store objects with these keys, the deserialized result will differ.

## Post-Migration Checklist

- [ ] Run `npx @ts-hooks-kit/codemod ./src --dry` to preview changes
- [ ] Apply the codemod: `npx @ts-hooks-kit/codemod ./src`
- [ ] Remove `usehooks-ts` from dependencies
- [ ] Run TypeScript type check
- [ ] Run unit/integration tests
- [ ] Run linting
- [ ] Verify critical flows in development
- [ ] Review known behavioral differences table above

## Compatibility

- Baseline parity targets `usehooks-ts@3.1.1`
- `@ts-hooks-kit/core` includes additional hooks beyond upstream parity
- React support: `^18 || ^19`
