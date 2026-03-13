# Docs app

React Router 7 SSR documentation workspace for `@ts-hooks-kit/core`.

## Scripts

- `pnpm generate:docs`
- `pnpm --filter @ts-hooks-kit/docs dev`
- `pnpm --filter @ts-hooks-kit/docs build`
- `pnpm --filter @ts-hooks-kit/docs start`

## Netlify

- Build command: `pnpm build:docs`
- Publish directory: `apps/docs/build/client`
- Runtime adapter: `@netlify/vite-plugin-react-router`
