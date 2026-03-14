import { useEffect, useState } from 'react'

/**
 * Represents the network state returned by useNetwork hook.
 */
export type NetworkState = {
  /** Whether the browser is online. */
  online: boolean
  /** The estimated effective type of the connection. */
  effectiveType: string | undefined
  /** The estimated downlink speed in Mbps. */
  downlink: number | undefined
  /** The maximum downlink speed in Mbps. */
  downlinkMax: number | undefined
  /** The type of connection (e.g., 'wifi', 'cellular'). */
  type: string | undefined
  /** The effective round-trip time estimate in milliseconds. */
  rtt: number | undefined
  /** Whether the user has requested a reduced data usage mode. */
  saveData: boolean | undefined
}

/**
 * Custom hook that tracks the browser's network connection status.
 * @returns {NetworkState} The current network state including online status and connection info.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-network)
 * @example
 * ```tsx
 * const { online, effectiveType, downlink } = useNetwork();
 *
 * return (
 *   <div>
 *     <p>Status: {online ? 'Online' : 'Offline'}</p>
 *     <p>Connection: {effectiveType}</p>
 *     <p>Speed: {downlink} Mbps</p>
 *   </div>
 * );
 * ```
 */
export function useNetwork(): NetworkState {
  const [state, setState] = useState<NetworkState>({
    online: typeof navigator !== 'undefined' ? navigator.onLine : true,
    effectiveType: undefined,
    downlink: undefined,
    downlinkMax: undefined,
    type: undefined,
    rtt: undefined,
    saveData: undefined,
  })

  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ ...prev, online: true }))
    }

    const handleOffline = () => {
      setState(prev => ({ ...prev, online: false }))
    }

    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection
      if (connection) {
        setState({
          online: navigator.onLine,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          downlinkMax: connection.downlinkMax,
          type: connection.type,
          rtt: connection.rtt,
          saveData: connection.saveData,
        })
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo)
      updateConnectionInfo()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo)
      }
    }
  }, [])

  return state
}
