# Getting Started

## Install

```bash
npm install @ts-hooks-kit/core
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

## Compatibility

- React `^18 || ^19`
- TypeScript-first APIs
- ESM + CJS outputs
