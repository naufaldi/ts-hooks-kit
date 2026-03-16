<p align="center">
  <strong>ts-hooks-kit</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@ts-hooks-kit/core"><img alt="npm version" src="https://img.shields.io/npm/v/@ts-hooks-kit/core" /></a>
  <a href="https://www.npmjs.com/package/@ts-hooks-kit/core"><img alt="npm monthly downloads" src="https://img.shields.io/npm/dm/@ts-hooks-kit/core" /></a>
  <a href="https://bundlephobia.com/package/@ts-hooks-kit/core"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@ts-hooks-kit/core" /></a>
  <a href="https://github.com/naufaldi/ts-hooks-kit/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/naufaldi/ts-hooks-kit" /></a><br />
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-blue" /></a>
  <a href="https://github.com/naufaldi/ts-hooks-kit/actions/workflows/ci.yml"><img alt="GitHub Actions" src="https://img.shields.io/github/actions/workflow/status/naufaldi/ts-hooks-kit/ci.yml?branch=master" /></a>
  <a href="https://github.com/naufaldi/ts-hooks-kit/blob/master/LICENSE"><img alt="license" src="https://img.shields.io/npm/l/@ts-hooks-kit/core" /></a>
</p>

<p align="center">
  Production-ready React hooks for React 18 &amp; 19, fully typed and tree-shakeable.<br />
  <a href="https://ts-hooks-kit.netlify.app"><strong>Documentation</strong></a> · <a href="https://github.com/naufaldi/ts-hooks-kit"><strong>GitHub</strong></a>
</p>

---

React applications need reliable, well-typed hooks — but maintaining them across React versions is hard. ts-hooks-kit is a batteries-included hooks library that picks up where [usehooks-ts](https://github.com/juliencrn/usehooks-ts) left off, providing 50 production-ready hooks with full React 18 and 19 support, zero runtime dependencies, and a migration path from usehooks-ts.

## ✨ Features

- **React 18 & 19:** tested against both versions in CI
- **Type-safe:** first-class TypeScript with full type inference
- **Tree-shakeable:** import only what you use, keep bundles small
- **Zero dependencies:** React peer dependency only, no runtime deps
- **Dual output:** ESM + CJS builds via tsdown
- **Drop-in migration:** codemod to migrate from usehooks-ts automatically

## 📦 Install

```sh
npm install @ts-hooks-kit/core

# or

yarn add @ts-hooks-kit/core

# or

pnpm add @ts-hooks-kit/core
```

## ⚡️ Quick Start

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

## 🪝 Available Hooks

**State**
`useBoolean` · `useCounter` · `useDisclosure` · `useList` · `useMap` · `useQueue` · `useSet` · `useStateList` · `useStep` · `useToggle`

**Storage**
`useLocalStorage` · `useReadLocalStorage` · `useSessionStorage`

**Browser**
`useCopyToClipboard` · `useDarkMode` · `useDocumentTitle` · `useGeolocation` · `useMediaQuery` · `useNetwork` · `usePermission` · `useScreen` · `useScript` · `useScrollLock` · `useTernaryDarkMode` · `useWindowSize`

**DOM**
`useClickAnyWhere` · `useEventListener` · `useHover` · `useIntersectionObserver` · `useOnClickOutside` · `usePageLeave` · `useResizeObserver`

**Timing**
`useCountdown` · `useDebounceCallback` · `useDebounceValue` · `useIdle` · `useInterval` · `useThrottle` · `useTimeout`

**Lifecycle**
`useEventCallback` · `useIsClient` · `useIsMounted` · `useIsomorphicLayoutEffect` · `useMemoizedFn` · `usePrevious` · `useUnmount` · `useUpdate` · `useUpdateEffect`

**Data**
`useAsync` · `usePagination`

## 📚 Documentation

- [**Full documentation**](https://ts-hooks-kit.netlify.app) — live docs site with API reference
- [**Examples**](https://ts-hooks-kit.netlify.app/examples) — interactive hook examples and real-world patterns
- [**Migration guide**](./docs/migration.md) to move from usehooks-ts to ts-hooks-kit
- [**Compatibility**](./docs/compatibility.md) for React version support details
- [**Contributing**](./CONTRIBUTING.md) to get involved in development

## 🔄 Migration from usehooks-ts

Swap your imports automatically with the included codemod:

```sh
npx ts-hooks-kit-codemod <target-path> --dry  # preview changes
npx ts-hooks-kit-codemod <target-path>         # apply changes
```

The codemod rewrites `usehooks-ts` imports to `@ts-hooks-kit/core` and handles any renamed hooks.

## 👥 Contributors

[![ts-hooks-kit contributors](https://contrib.rocks/image?repo=naufaldi/ts-hooks-kit)](https://github.com/naufaldi/ts-hooks-kit/graphs/contributors)

## 🙏 Credits

Built on the excellent work of [usehooks-ts](https://github.com/juliencrn/usehooks-ts) by [Julien Caron](https://github.com/juliencrn). Forked from v3.1.1 with continued maintenance and React 19 support.

## 📜 License

[MIT](LICENSE)
