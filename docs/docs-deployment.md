# Docs deployment (Netlify)

`ts-hooks-kit` docs run on React Router 7 SSR and deploy on Netlify.

## Netlify site settings

- Base directory: project root
- Build command: `pnpm build:docs`
- Publish directory: `apps/docs/build/client`
- Node version: `20.19.0`

`netlify.toml` in repository root contains the same defaults.

## Build pipeline

1. `pnpm build:docs`
2. `pnpm generate:docs` creates `generated/docs` and `generated/typedoc`
3. `@ts-hooks-kit/docs build` emits SSR/client bundles under `apps/docs/build`

## CI checks

GitHub Actions validates docs in `.github/workflows/ci.yml`:

- `pnpm build:docs`
- `pnpm --filter @ts-hooks-kit/docs test`
