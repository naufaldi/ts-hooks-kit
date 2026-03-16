## Migration Overview

Moving from `usehooks-ts` to `@ts-hooks-kit/core` is designed to be straightforward. Most teams can start with an import rewrite, then run tests and type checks to validate behavior.

## Import Rewrite

```ts
// before
import { useLocalStorage, useBoolean } from 'usehooks-ts'

// after
import { useLocalStorage, useBoolean } from '@ts-hooks-kit/core'
```

## Codemod Workflow

Run from your repository root:

```bash
node packages/codemod/bin/ts-hooks-kit-codemod.js <target-path> --dry
node packages/codemod/bin/ts-hooks-kit-codemod.js <target-path>
```

Start with `--dry` to preview changes first.

## Post-Migration Checklist

- Run your unit/integration tests
- Run your TypeScript check and linting pipeline
- Verify critical flows in development and production-like environments

## Compatibility Notes

- Baseline parity targets `usehooks-ts@3.1.1`
- `@ts-hooks-kit/core` includes additional hooks beyond upstream parity
- React support: `^18 || ^19`
