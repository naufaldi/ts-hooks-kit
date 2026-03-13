# AI Agent Instructions for ts-hooks-kit

## Project Scope

- **Type**: React hooks library (TypeScript-first)
- **Package**: `@ts-hooks-kit/core` in `packages/core/`
- **Monorepo**: pnpm workspace (root at `ts-hooks-kit/`)
- **Upstream**: Based on `usehooks-ts@3.1.1`, upgraded for React 18/19 compatibility
- **Node**: >=20.19.0

## Standard Commands

```bash
# Install dependencies
pnpm install

# Run all tests (via workspace)
pnpm test

# Run tests for core package only
pnpm --filter @ts-hooks-kit/core test

# Type check
pnpm -r lint

# Build all packages
pnpm build

# Dev docs server
pnpm dev:docs
```

## Hook File Conventions

Each hook lives in its own folder at `packages/core/src/`:

```
useHookName/
├── index.ts          # Re-exports from hook file
├── useHookName.ts    # Implementation
├── useHookName.test.ts  # Vitest tests
├── useHookName.md    # Documentation (optional)
└── useHookName.demo.tsx # Demo component (optional)
```

## Coding Standards

- **TypeScript-first**: All code must be type-safe; use strict types.
- **Imports at top**: No inline imports; keep all imports at file top.
- **Minimal comments**: Document function signatures with JSDoc; avoid obvious inline comments.
- **Peer deps**: React ^18 || ^19 (no direct react dependency).

## Mandatory Process Rules

**ALWAYS use TDD workflow:**
1. Write failing test first
2. Implement minimal code to pass
3. Run tests to verify
4. Refactor if needed

**ALWAYS use using-superpowers skill first:**
- Before any coding task, invoke `using-superpowers` skill.
- Check for relevant skills before any response or action.
- If a skill applies (even 1% chance), you MUST use it.

## Completion Checklist

Before claiming work is complete:

- [ ] All new code has tests (TDD followed)
- [ ] `pnpm test` passes
- [ ] `pnpm lint` passes (TypeScript type check)
- [ ] No unnecessary comments added
- [ ] using-superpowers skill was invoked at start
