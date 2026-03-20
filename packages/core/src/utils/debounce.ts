/** Options for controlling debounce behavior. */
export interface DebounceOptions {
  /** Invoke on the leading edge of the timeout. */
  leading?: boolean
  /** Invoke on the trailing edge of the timeout. */
  trailing?: boolean
  /** Maximum time to delay before invoking. */
  maxWait?: number
}

/** A debounced function with control methods. */
export interface DebouncedFunction<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  /** Cancel pending invocations. */
  cancel: () => void
  /** Immediately invoke pending invocations. */
  flush: () => ReturnType<T> | undefined
  /** Whether a trailing / maxWait invocation is still scheduled. */
  isPending: () => boolean
}

/**
 * Creates a debounced version of a function.
 * @param func The function to debounce
 * @param delay The delay in milliseconds
 * @param options Debounce options
 * @returns Debounced function with cancel and flush methods
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
  options: DebounceOptions = {},
): DebouncedFunction<T> {
  const { leading = false, trailing = true, maxWait } = options

  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let maxTimeoutId: ReturnType<typeof setTimeout> | null = null
  let lastArgs: Parameters<T> | null = null
  let lastResult: ReturnType<T>
  let lastCallTime: number | null = null

  const clearTimeouts = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = null
    }
    if (maxTimeoutId) {
      clearTimeout(maxTimeoutId)
      maxTimeoutId = null
    }
  }

  const invokeFunc = (args: Parameters<T>): ReturnType<T> => {
    lastArgs = null
    lastCallTime = null
    lastResult = func(...args)
    return lastResult
  }

  const remainingWait = (time: number): number => {
    const timeSinceLastCall = time - (lastCallTime ?? 0)
    return delay - timeSinceLastCall
  }

  const shouldInvoke = (time: number): boolean => {
    const timeSinceLastCall = time - (lastCallTime ?? 0)
    return lastCallTime === null || timeSinceLastCall >= delay || timeSinceLastCall < 0
  }

  const trailingEdge = (): ReturnType<T> | undefined => {
    timeoutId = null
    if (trailing && lastArgs) {
      return invokeFunc(lastArgs)
    }
    lastArgs = null
    lastCallTime = null
    return undefined
  }

  const timerExpired = (): ReturnType<T> | undefined => {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge()
    }
    const timeWaiting = remainingWait(time)
    timeoutId = setTimeout(timerExpired, timeWaiting)
    return undefined
  }

  const debounced = (...args: Parameters<T>): ReturnType<T> | undefined => {
    const time = Date.now()
    const isInvoking = shouldInvoke(time)

    lastArgs = args

    if (isInvoking) {
      clearTimeouts()

      // First invocation
      if (lastCallTime === null) {
        lastCallTime = time
        // Schedule the trailing edge timer
        timeoutId = setTimeout(timerExpired, delay)
        // If leading, invoke immediately
        if (leading) {
          return invokeFunc(args)
        }
        return undefined
      }

      // Subsequent invocations after delay reset the timer
      lastCallTime = time
      return lastResult
    }

    // Within the debounce window, reset the timer
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    // Set up maxWait timer if needed
    if (maxWait && !maxTimeoutId && lastCallTime !== null) {
      const timeSinceLastCall = time - lastCallTime
      const timeUntilMaxWait = maxWait - timeSinceLastCall
      maxTimeoutId = setTimeout(() => {
        maxTimeoutId = null
        if (lastArgs) {
          invokeFunc(lastArgs)
        }
      }, timeUntilMaxWait)
    }

    // Schedule the trailing edge timer
    const timeWaiting = remainingWait(time)
    timeoutId = setTimeout(timerExpired, timeWaiting)

    return lastResult
  }

  debounced.cancel = () => {
    clearTimeouts()
    lastArgs = null
    lastCallTime = null
  }

  debounced.flush = (): ReturnType<T> | undefined => {
    if (timeoutId || maxTimeoutId) {
      clearTimeouts()
      if (lastArgs) {
        return invokeFunc(lastArgs)
      }
    }
    return lastResult
  }

  debounced.isPending = (): boolean => {
    return timeoutId !== null || maxTimeoutId !== null
  }

  return debounced as DebouncedFunction<T>
}
