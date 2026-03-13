# Compatibility baseline

## Phase 0 dependency matrix

- Node: `>=20.19.0`
- React runtime matrix in CI: `18.3.1`, `19.2.0`
- TypeScript: `^5.9.3`
- Vitest: `^4.0.7`
- tsdown: `^0.9.0`
- Testing Library:
  - `@testing-library/react`: `^16.3.0`
  - `@testing-library/jest-dom`: `^6.9.1`

## Package policy

- `@ts-hooks-kit/core` keeps `react` as peer dependency (`^18 || ^19`).
- Phase 0 focuses on bootstrap and compatibility infrastructure.
- Detailed behavior changes are deferred to Phase 1+.

## Upstream baseline

- Upstream package: `usehooks-ts@3.1.1`
- Baseline strategy in this phase: proxy re-export to preserve API parity during bootstrap.
