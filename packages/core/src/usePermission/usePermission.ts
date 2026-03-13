import { useEffect, useRef, useState } from 'react'

/**
 * Represents the state returned by usePermission hook.
 */
export type PermissionState = {
  /** The current state of the permission. */
  state: PermissionStateValue
  /** Whether the permission is supported by the browser. */
  supported: boolean
}

/**
 * Valid permission state values.
 */
export type PermissionStateValue = 'granted' | 'denied' | 'prompt' | 'unsupported'

/**
 * Valid permission names for the Permissions API.
 */
export type PermissionName =
  | 'geolocation'
  | 'notifications'
  | 'push'
  | 'midi'
  | 'camera'
  | 'microphone'
  | 'speaker'
  | 'device-info'
  | 'background-fetch'
  | 'background-sync'
  | 'bluetooth'
  | 'persistent-storage'
  | 'ambient-light-sensor'
  | 'accelerometer'
  | 'gyroscope'
  | 'magnetometer'
  | 'clipboard'
  | 'display-capture'
  | 'nfc'

/**
 * Custom hook that tracks the state of a browser permission.
 * @param {PermissionName} permissionName - The name of the permission to track.
 * @returns {PermissionState} The current state of the permission.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-permission)
 * @example
 * ```tsx
 * const { state, supported } = usePermission('camera');
 *
 * if (!supported) return <div>Permissions API not supported</div>;
 * if (state === 'denied') return <div>Camera access denied</div>;
 * return <Camera />;
 * ```
 */
export function usePermission(
  permissionName: PermissionName,
): PermissionState {
  const [state, setState] = useState<PermissionState>({
    state: 'prompt',
    supported: true,
  })

  const permissionStatusRef = useRef<PermissionStatus | null>(null)

  useEffect(() => {
    if (!navigator.permissions) {
      setState({ state: 'unsupported', supported: false })
      return
    }

    let isMounted = true

    const queryPermission = async () => {
      try {
        const status = await navigator.permissions.query({
          name: permissionName as PermissionDescriptor['name'],
        })

        if (!isMounted) return

        permissionStatusRef.current = status

        const updateState = () => {
          if (isMounted) {
            setState({
              state: status.state as PermissionStateValue,
              supported: true,
            })
          }
        }

        updateState()
        status.addEventListener('change', updateState)

        return () => {
          status.removeEventListener('change', updateState)
        }
      } catch {
        if (isMounted) {
          setState({ state: 'unsupported', supported: false })
        }
      }
    }

    queryPermission()

    return () => {
      isMounted = false
    }
  }, [permissionName])

  return state
}
