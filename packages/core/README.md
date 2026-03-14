# @ts-hooks-kit/core

An actively maintained React hooks library based on usehooks-ts, upgraded for React 18/19 compatibility.

[![npm version](https://img.shields.io/npm/v/@ts-hooks-kit/core)](https://www.npmjs.com/package/@ts-hooks-kit/core)
[![license](https://img.shields.io/npm/l/@ts-hooks-kit/core)](https://github.com/naufaldi/ts-hooks-kit/blob/master/LICENSE)
[![CI](https://github.com/naufaldi/ts-hooks-kit/actions/workflows/ci.yml/badge.svg)](https://github.com/naufaldi/ts-hooks-kit/actions/workflows/ci.yml)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@ts-hooks-kit/core)](https://bundlephobia.com/package/@ts-hooks-kit/core)

## Install

```bash
npm install @ts-hooks-kit/core
# or
pnpm add @ts-hooks-kit/core
# or
yarn add @ts-hooks-kit/core
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

- **50 hooks** ready for production use
- **React ^18 || ^19** — CI-tested on both versions
- **TypeScript-first** — full type inference, exported types for all hooks
- **Zero runtime dependencies** — React as peer dependency only
- **ESM + CJS** — dual output via tsdown, tree-shakeable (`sideEffects: false`)
- **SSR-safe** — server guards on browser-dependent hooks

## Hooks

### State & Lifecycle

| Hook | Description |
|------|-------------|
| `useBoolean` | Boolean state with toggle/set helpers |
| `useCounter` | Numeric counter with increment/decrement/set/reset |
| `useList` | Enhanced array state management |
| `useMap` | Reactive Map data structure |
| `useSet` | Reactive Set data structure |
| `useQueue` | FIFO queue data structure |
| `useToggle` | Toggle between two values |
| `useStep` | Step-based state navigation |
| `useStateList` | Navigate through a list of states |
| `usePrevious` | Track previous state/prop value |
| `useDisclosure` | Modal/drawer open/close/toggle state |
| `usePagination` | Pagination logic with range generation |
| `useUpdate` | Force component re-render |
| `useUnmount` | Run cleanup on unmount |
| `useIsMounted` | Check if component is mounted |
| `useIsClient` | Check if running on client side |

### Effects & Callbacks

| Hook | Description |
|------|-------------|
| `useUpdateEffect` | useEffect that skips initial mount |
| `useEventCallback` | Stable callback reference |
| `useMemoizedFn` | Stable function reference without deps |
| `useIsomorphicLayoutEffect` | SSR-safe useLayoutEffect |
| `useAsync` | Async function state with loading/error/retry |

### Timing & Debounce

| Hook | Description |
|------|-------------|
| `useDebounceCallback` | Debounced callback with cancel/flush |
| `useDebounceValue` | Debounced value |
| `useThrottle` | Throttle execution (fn + value variants) |
| `useTimeout` | setTimeout with auto-cleanup |
| `useInterval` | setInterval with auto-cleanup |
| `useCountdown` | Countdown timer |
| `useIdle` | Detect user idle state |

### DOM & Browser

| Hook | Description |
|------|-------------|
| `useEventListener` | Type-safe event listener binding |
| `useClickAnyWhere` | Detect clicks anywhere on the page |
| `useOnClickOutside` | Detect clicks outside an element |
| `useHover` | Detect hover state |
| `useIntersectionObserver` | Intersection Observer API wrapper |
| `useResizeObserver` | Resize Observer API wrapper |
| `useScrollLock` | Lock body scroll |
| `useDocumentTitle` | Set document title |
| `useScript` | Dynamic script loading |
| `useWindowSize` | Track window dimensions |
| `useScreen` | Track screen properties |
| `usePageLeave` | Detect when user leaves page |

### Storage

| Hook | Description |
|------|-------------|
| `useLocalStorage` | Persistent state in localStorage |
| `useSessionStorage` | Persistent state in sessionStorage |
| `useReadLocalStorage` | Read-only localStorage access |
| `useCopyToClipboard` | Copy text to clipboard |

### Media & Network

| Hook | Description |
|------|-------------|
| `useMediaQuery` | Responsive media query matching |
| `useDarkMode` | Dark mode toggle |
| `useTernaryDarkMode` | Dark/light/system mode |
| `useNetwork` | Network status monitoring |
| `useGeolocation` | Browser geolocation API |
| `usePermission` | Browser permissions API |

## Migrating from usehooks-ts

This package is API-compatible with `usehooks-ts@3.1.1`. To migrate, change your imports:

```ts
// before
import { useLocalStorage } from 'usehooks-ts'

// after
import { useLocalStorage } from '@ts-hooks-kit/core'
```

A codemod is available for automated migration — see the [migration guide](https://github.com/naufaldi/ts-hooks-kit/blob/master/docs/migration.md).

## License

MIT — see [LICENSE](./LICENSE) for details.

Based on [usehooks-ts](https://github.com/juliencrn/usehooks-ts) by [Julien CARON](https://github.com/juliencrn).
