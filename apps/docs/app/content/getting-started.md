## Introduction

`@ts-hooks-kit/core` is a TypeScript-first React hooks library with strong API parity to `usehooks-ts`, plus additional production-focused hooks. The goal is a familiar developer experience with modern React 18/19 support.

## Install

Use your preferred package manager:

```bash
pnpm add @ts-hooks-kit/core
npm install @ts-hooks-kit/core
yarn add @ts-hooks-kit/core
bun add @ts-hooks-kit/core
```

## Basic Usage

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

## What You Get

- Familiar hook naming and usage patterns from `usehooks-ts`
- React `^18 || ^19` compatibility
- Strict TypeScript typings designed for app teams
- Tree-shakeable package outputs for lean bundles
