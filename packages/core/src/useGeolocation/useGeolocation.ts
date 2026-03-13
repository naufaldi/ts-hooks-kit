import { useEffect, useState } from 'react'

/**
 * Represents the state of geolocation.
 */
export type UseGeolocationState = {
  /** The latitude coordinate. */
  latitude: number | undefined
  /** The longitude coordinate. */
  longitude: number | undefined
  /** The accuracy of the location in meters. */
  accuracy: number | undefined
  /** The altitude in meters. */
  altitude: number | null | undefined
  /** The accuracy of the altitude in meters. */
  altitudeAccuracy: number | null | undefined
  /** The heading in degrees (0-360). */
  heading: number | null | undefined
  /** The speed in meters per second. */
  speed: number | null | undefined
  /** The timestamp of the position. */
  timestamp: number | undefined
  /** Whether the geolocation is loading. */
  loading: boolean
  /** The error object if geolocation failed. */
  error: GeolocationPositionError | Error | undefined
}

/**
 * Options for the useGeolocation hook.
 * Extends the standard PositionOptions with an enabled flag.
 */
export type UseGeolocationOptions = {
  /** Whether to enable high accuracy mode. */
  enableHighAccuracy?: boolean
  /** The maximum time in milliseconds allowed to get the position. */
  timeout?: number
  /** The maximum age in milliseconds of a cached position. */
  maximumAge?: number
  /** Whether to enable geolocation. Set to false to prevent fetching. */
  enabled?: boolean
}

/**
 * Custom hook that provides access to the browser's geolocation API.
 * @param {UseGeolocationOptions} [options] - Options for geolocation and hook behavior.
 * @returns {UseGeolocationState} The current geolocation state.
 * @public
 * @see [Documentation](https://usehooks-ts.com/react-hook/use-geolocation)
 * @example
 * ```tsx
 * const { latitude, longitude, loading, error } = useGeolocation({
 *   enableHighAccuracy: true,
 *   timeout: 5000,
 * });
 *
 * if (loading) return <div>Loading location...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 * return <div>Location: {latitude}, {longitude}</div>;
 * ```
 */
export function useGeolocation(
  options: UseGeolocationOptions = {},
): UseGeolocationState {
  const {
    enableHighAccuracy = false,
    timeout = Infinity,
    maximumAge = 0,
    enabled = true,
  } = options

  const [state, setState] = useState<UseGeolocationState>({
    latitude: undefined,
    longitude: undefined,
    accuracy: undefined,
    altitude: undefined,
    altitudeAccuracy: undefined,
    heading: undefined,
    speed: undefined,
    timestamp: undefined,
    loading: true,
    error: undefined,
  })

  useEffect(() => {
    if (!enabled) {
      setState(prev => ({ ...prev, loading: false }))
      return
    }

    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: new Error('Geolocation is not supported'),
      }))
      return
    }

    let isMounted = true

    const onSuccess = (position: GeolocationPosition) => {
      if (!isMounted) return
      setState({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        altitude: position.coords.altitude,
        altitudeAccuracy: position.coords.altitudeAccuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        timestamp: position.timestamp,
        loading: false,
        error: undefined,
      })
    }

    const onError = (error: GeolocationPositionError) => {
      if (!isMounted) return
      setState(prev => ({
        ...prev,
        loading: false,
        error,
      }))
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      enableHighAccuracy,
      timeout,
      maximumAge,
    })

    return () => {
      isMounted = false
    }
  }, [enableHighAccuracy, enabled, maximumAge, timeout])

  return state
}
