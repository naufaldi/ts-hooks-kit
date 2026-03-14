# ts-hooks-kit

An actively maintained React hooks library based on usehooks-ts, upgraded for React 18/19 compatibility.

[![npm version](https://img.shields.io/npm/v/@ts-hooks-kit/core)](https://www.npmjs.com/package/@ts-hooks-kit/core)
[![license](https://img.shields.io/npm/l/@ts-hooks-kit/core)](https://github.com/naufaldi/ts-hooks-kit/blob/main/LICENSE)
[![CI](https://github.com/naufaldi/ts-hooks-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/naufaldi/ts-hooks-kit/actions/workflows/ci.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@ts-hooks-kit/core)](https://bundlephobia.com/package/@ts-hooks-kit/core)

## Install

```bash
npm install @ts-hooks-kit/core
```

## Quick Start

```tsx
import { useBoolean, useLocalStorage } from '@ts-hooks-kit/core'

export function Example() {
  const [enabled, toggleEnabled] = useBoolean(false)
  const [name, setName] = useLocalStorage('name', 'ts-hooks-kit')

  return (
    <button type="button" onClick={toggleEnabled}>
      {enabled ? `Enabled for ${name}` : 'Disabled'}
    </button>
  )
}
```

## Features

- 50 exported hooks in `@ts-hooks-kit/core`
- React `^18 || ^19` compatibility
- TypeScript-first API surface
- Zero runtime dependencies (React peer dependency only)
- ESM + CJS output via tsdown

## Migration from usehooks-ts

- Migration guide: `docs/migration.md`
- Codemod CLI: `node packages/codemod/bin/ts-hooks-kit-codemod.js <target-path> --dry`
- Package import rewrite: `usehooks-ts` -> `@ts-hooks-kit/core`

## Repository Layout

- `packages/core/` - publishable hooks package (`@ts-hooks-kit/core`)
- `packages/codemod/` - migration codemod tooling
- `apps/docs/` - documentation site workspace
- `docs/` - repository docs (migration, compatibility, notes)
- `examples/sample-app/` - codemod migration validation sample

## Credits

This project is a fork of [usehooks-ts](https://github.com/juliencrn/usehooks-ts) by [Julien CARON](https://github.com/juliencrn). We built on his excellent work to provide continued maintenance and React 19 compatibility. The original project baseline is usehooks-ts@3.1.1.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT -- see [LICENSE](./LICENSE) for details.
