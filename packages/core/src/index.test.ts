import * as hooks from './index'

describe('core index exports', () => {
  it('should export all expected hooks', () => {
    const exportedNames = Object.keys(hooks).sort()
    expect(exportedNames).toMatchInlineSnapshot(`
      [
        "DOTS",
        "createGlobalState",
        "deserializeReadLocalStorageString",
        "readLocalStorageValue",
        "useAsync",
        "useBoolean",
        "useClickAnyWhere",
        "useCopyToClipboard",
        "useCountdown",
        "useCounter",
        "useDarkMode",
        "useDebounceCallback",
        "useDebounceValue",
        "useDisclosure",
        "useDocumentTitle",
        "useEventCallback",
        "useEventListener",
        "useFirstMountState",
        "useGeolocation",
        "useHover",
        "useIdle",
        "useIntersectionObserver",
        "useInterval",
        "useIsClient",
        "useIsMounted",
        "useIsomorphicLayoutEffect",
        "useList",
        "useLocalStorage",
        "useMap",
        "useMediaQuery",
        "useMediatedState",
        "useMemoizedFn",
        "useMethods",
        "useMultiStateValidator",
        "useNetwork",
        "useOnClickOutside",
        "usePageLeave",
        "usePagination",
        "usePermission",
        "usePrevious",
        "useQueue",
        "useReadLocalStorage",
        "useRendersCount",
        "useResizeObserver",
        "useScreen",
        "useScript",
        "useScrollLock",
        "useSessionStorage",
        "useSet",
        "useStateList",
        "useStateWithHistory",
        "useStep",
        "useTernaryDarkMode",
        "useThrottle",
        "useThrottleFn",
        "useTimeout",
        "useToggle",
        "useUnmount",
        "useUpdate",
        "useUpdateEffect",
        "useWindowSize",
      ]
    `)
  })

  it('should not accidentally remove hooks', () => {
    // 50 hooks + useThrottleFn + DOTS constant = 52 exports
    expect(Object.keys(hooks).length).toBeGreaterThanOrEqual(50)
  })
})
