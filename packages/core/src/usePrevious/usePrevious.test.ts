import { act, renderHook } from '@testing-library/react'
import { useState } from 'react'

import { usePrevious } from './usePrevious'

describe('usePrevious()', () => {
  it('should return undefined on first render', () => {
    const { result } = renderHook(() => usePrevious(0))

    expect(result.current).toBeUndefined()
  })

  it('should return previous value after state changes', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0)
      const prevCount = usePrevious(count)
      return { count, prevCount, setCount }
    })

    // Initially prev should be undefined
    expect(result.current.prevCount).toBeUndefined()

    // After first update, prev should be 0
    act(() => {
      result.current.setCount(1)
    })
    expect(result.current.prevCount).toBe(0)

    // After second update, prev should be 1
    act(() => {
      result.current.setCount(2)
    })
    expect(result.current.prevCount).toBe(1)
  })

  it('should accept initial value for first render', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0)
      const prevCount = usePrevious(count, -1)
      return { count, prevCount, setCount }
    })

    // Initially prev should be the initial value
    expect(result.current.prevCount).toBe(-1)

    // After update, prev should be 0
    act(() => {
      result.current.setCount(1)
    })
    expect(result.current.prevCount).toBe(0)
  })

  it('should work with string values', () => {
    const { result } = renderHook(() => {
      const [name, setName] = useState('Alice')
      const prevName = usePrevious(name)
      return { name, prevName, setName }
    })

    expect(result.current.prevName).toBeUndefined()

    act(() => {
      result.current.setName('Bob')
    })
    expect(result.current.prevName).toBe('Alice')
  })

  it('should work with object values', () => {
    const { result } = renderHook(() => {
      const [obj, setObj] = useState({ id: 1 })
      const prevObj = usePrevious(obj)
      return { obj, prevObj, setObj }
    })

    expect(result.current.prevObj).toBeUndefined()

    const newObj = { id: 2 }
    act(() => {
      result.current.setObj(newObj)
    })
    expect(result.current.prevObj).toEqual({ id: 1 })
  })

  it('should work with array values', () => {
    const { result } = renderHook(() => {
      const [arr, setArr] = useState([1, 2])
      const prevArr = usePrevious(arr)
      return { arr, prevArr, setArr }
    })

    expect(result.current.prevArr).toBeUndefined()

    act(() => {
      result.current.setArr([1, 2, 3])
    })
    expect(result.current.prevArr).toEqual([1, 2])
  })

  it('should handle multiple updates correctly', () => {
    const { result } = renderHook(() => {
      const [value, setValue] = useState(0)
      const prevValue = usePrevious(value)
      return { value, prevValue, setValue }
    })

    // Update multiple times
    act(() => result.current.setValue(1))
    expect(result.current.prevValue).toBe(0)

    act(() => result.current.setValue(2))
    expect(result.current.prevValue).toBe(1)

    act(() => result.current.setValue(3))
    expect(result.current.prevValue).toBe(2)

    act(() => result.current.setValue(4))
    expect(result.current.prevValue).toBe(3)
  })

  it('should return undefined when not providing initial value on first render', () => {
    const { result } = renderHook(() => usePrevious('test'))
    expect(result.current).toBeUndefined()
  })
})
