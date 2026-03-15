# Getting Started

## Requirements

- React 18 or 19
- TypeScript 5+ (recommended, not required)
- Node.js 20+

## Install

```bash
npm install @ts-hooks-kit/core

# or
yarn add @ts-hooks-kit/core

# or
pnpm add @ts-hooks-kit/core
```

## Basic usage

```tsx
import { useBoolean, useLocalStorage } from '@ts-hooks-kit/core'

export function Example() {
  const { value, toggle } = useBoolean(false)
  const [name] = useLocalStorage('name', 'ts-hooks-kit')

  return (
    <button type="button" onClick={toggle}>
      {value ? `Enabled for ${name}` : 'Disabled'}
    </button>
  )
}
```

Only the hooks you import are included in your bundle — every hook is independently tree-shakeable.

## Compatibility

- React `^18 || ^19`
- TypeScript-first APIs
- ESM + CJS outputs
- Tree-shakeable — import only what you need
