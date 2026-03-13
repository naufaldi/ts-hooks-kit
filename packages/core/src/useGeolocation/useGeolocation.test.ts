import { act, renderHook } from '@testing-library/react'

import { useGeolocation } from './useGeolocation'

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
  watchPosition: vi.fn().mockReturnValue(1),
  clearWatch: vi.fn(),
}

describe('useGeolocation()', () => {
  beforeEach(() => {
    // @ts-ignore
    global.navigator.geolocation = mockGeolocation
    vi.clearAllMocks()
  })

  afterEach(() => {
    // @ts-ignore
    delete global.navigator.geolocation
  })

  it('should have initial loading state', () => {
    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(true)
    expect(result.current.latitude).toBeUndefined()
    expect(result.current.longitude).toBeUndefined()
    expect(result.current.error).toBeUndefined()
  })

  it('should handle successful geolocation', () => {
    const mockPosition = {
      coords: {
        latitude: 40.7128,
        longitude: -74.006,
        accuracy: 10,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        speed: null,
      },
      timestamp: Date.now(),
    }

    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success(mockPosition)
    })

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(false)
    expect(result.current.latitude).toBe(40.7128)
    expect(result.current.longitude).toBe(-74.006)
    expect(result.current.error).toBeUndefined()
  })

  it('should handle geolocation error', () => {
    const mockError = {
      code: 1,
      message: 'User denied geolocation',
    }

    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      error?.(mockError)
    })

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBe(mockError)
  })

  it('should not call geolocation when disabled', () => {
    renderHook(() => useGeolocation({ enabled: false }))

    expect(mockGeolocation.getCurrentPosition).not.toHaveBeenCalled()
  })

  it('should handle geolocation not supported', () => {
    // @ts-ignore
    delete global.navigator.geolocation

    const { result } = renderHook(() => useGeolocation())

    expect(result.current.loading).toBe(false)
    expect(result.current.error?.message).toBe('Geolocation is not supported')
  })

  it('should respect options', () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    }

    mockGeolocation.getCurrentPosition.mockImplementation(() => {})

    renderHook(() => useGeolocation(options))

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledWith(
      expect.any(Function),
      expect.any(Function),
      options,
    )
  })
})
