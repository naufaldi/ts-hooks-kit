# Contributing to ts-hooks-kit

Thank you for your interest in contributing to ts-hooks-kit! We welcome contributions from the community. Please follow the guidelines below to ensure a smooth contribution process.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >=20.19.0
- **pnpm** 9 or higher

You can check your versions with:
```bash
node --version
pnpm --version
```

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ts-hooks-kit.git
   cd ts-hooks-kit
   ```
3. **Install dependencies**:
   ```bash
   pnpm install
   ```

## Development

Each hook is organized in its own directory under `packages/core/src/`. The standard structure for a hook is:

```
useHookName/
├── index.ts              # Re-exports from hook file
├── useHookName.ts        # Implementation
├── useHookName.test.ts   # Vitest tests (required)
└── useHookName.md        # Documentation (optional)
```

When adding a new hook or modifying existing ones, follow this structure and ensure all files are included.

## Commands

Use these commands to develop and test your changes:

- **Run tests**: `pnpm test`
- **Type check**: `pnpm lint` (runs `tsc --noEmit`)
- **Build packages**: `pnpm build`
- **Run tests for core package**: `pnpm --filter @ts-hooks-kit/core test`

## Pull Request Process

1. **Create a feature branch** from `master`:
   ```bash
   git checkout -b feature/your-hook-name
   ```

2. **Write tests first** (TDD approach):
   - Create your test file before implementing the hook
   - Ensure tests are comprehensive and cover edge cases
   - All new code must have corresponding tests

3. **Implement your code**:
   - Follow the TypeScript-first approach (strict types)
   - Keep imports at the top of files
   - Use minimal comments; rely on clear code and JSDoc

4. **Verify everything passes**:
   ```bash
   pnpm test
   pnpm lint
   ```

5. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Add/update: brief description of changes"
   git push origin feature/your-hook-name
   ```

6. **Submit a pull request** on GitHub with a clear description of your changes

## Adding a Changeset

When your pull request changes the public API, fixes a bug, or adds a feature to `@ts-hooks-kit/core`, include a changeset:

1. **Run the changeset command**:
   ```bash
   pnpm changeset
   ```

2. **Select the package**: Choose `@ts-hooks-kit/core`.

3. **Choose the bump type**:
   - **patch**: Bug fixes, documentation improvements
   - **minor**: New hooks, new features
   - **major**: Breaking changes to existing hook APIs

4. **Write a summary**: Describe the change from a user's perspective. This text appears in the CHANGELOG.

This creates a markdown file in `.changeset/` — commit it with your PR.

**When is a changeset NOT needed?**
- Changes to tests only
- Changes to docs site (`apps/docs/`)
- Changes to the codemod package
- CI/tooling changes

## Code Style

- **TypeScript-first**: All code must use strict TypeScript types. Avoid `any` unless absolutely necessary.
- **Imports at top**: Place all imports at the beginning of files. No inline imports.
- **Minimal comments**: Document function signatures with JSDoc. Avoid obvious inline comments.
- **Peer dependencies**: React ^18 or ^19 (no direct React dependency in the hook itself)
- **No unnecessary complexity**: Write clear, simple code that solves the problem at hand

## Questions?

If you have questions or need clarification, please open an issue or reach out to the maintainers. We're here to help!

Happy contributing!
