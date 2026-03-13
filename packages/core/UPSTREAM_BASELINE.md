# Upstream Baseline Pin

## Baseline Information

| Property | Value |
|----------|-------|
| Upstream package | `usehooks-ts` |
| Baseline version | `3.1.1` |
| Upstream tag | `usehooks-ts@3.1.1` |
| Upstream commit | `6194913` |
| Import date | 2025-03-13 |
| Source reference | `/Users/mac/WebApps/oss/custom-hooks-ts/usehooks-ts/packages/usehooks-ts` |

## Import Details

### Phase 0 (Proxy Baseline)
- Initial setup used `export * from 'usehooks-ts'` as a proxy
- Allowed repository structure and tooling foundation to be established
- Status: **Completed**

### Phase 0A (Full Source Import) - COMPLETED
- **Action**: Copied full upstream source from `usehooks-ts@3.1.1`
- **Source files**: All 33 hooks from `src/` directory
- **Test files**: Test setup and mocks from `tests/` directory
- **Preserved structure**: Each hook maintains its folder with:
  - `index.ts` - module exports
  - `{hook}.ts` - implementation
  - `{hook}.test.ts` - tests (where available)
  - `{hook}.md` - documentation
  - `{hook}.demo.tsx` - demo component

### Files Imported

#### Source Hooks (33 total)
- useBoolean, useClickAnyWhere, useCopyToClipboard, useCountdown
- useCounter, useDarkMode, useDebounceCallback, useDebounceValue
- useDocumentTitle, useEventCallback, useEventListener, useHover
- useIntersectionObserver, useInterval, useIsClient, useIsMounted
- useIsomorphicLayoutEffect, useLocalStorage, useMap, useMediaQuery
- useOnClickOutside, useReadLocalStorage, useResizeObserver
- useScreen, useScript, useScrollLock, useSessionStorage
- useStep, useTernaryDarkMode, useTimeout, useToggle
- useUnmount, useWindowSize

#### Dependencies Carried Forward
- `lodash.debounce@^4.0.8` - production dependency (to be replaced in Phase 1)
- `@juggle/resize-observer@^3.4.0` - dev dependency for tests

## Phase 1 Preparation Checklist

Before starting Phase 1 (React 19 compatibility validation):

- [x] Full upstream source imported
- [x] Baseline version/commit documented
- [x] Proxy dependency removed from package.json
- [x] Local index.ts exports all hooks
- [x] Test infrastructure configured

## Next Steps (Phase 1)

1. Verify baseline builds and tests pass
2. Upgrade test stack for React 19 validation
3. Audit hooks for React 19 compatibility
4. Replace lodash.debounce with internal implementation
5. Run React 18 + 19 compatibility matrix
