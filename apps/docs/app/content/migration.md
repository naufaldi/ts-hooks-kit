# Migration from usehooks-ts

Use the codemod to rewrite imports from `usehooks-ts` to `@ts-hooks-kit/core`.

## Import rewrite

```ts
// before
import { useLocalStorage, useBoolean } from 'usehooks-ts'

// after
import { useLocalStorage, useBoolean } from '@ts-hooks-kit/core'
```

## Codemod

Run from repository root:

```bash
node packages/codemod/bin/ts-hooks-kit-codemod.js <target-path> --dry
node packages/codemod/bin/ts-hooks-kit-codemod.js <target-path>
```

## Notes

- Baseline compatibility starts from `usehooks-ts@3.1.1`.
- `@ts-hooks-kit/core` includes additional hooks beyond upstream.
- Validate your app with tests and type-check after rewrite.
