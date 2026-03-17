import { useEffect, useState } from 'react'
import type { UseBooleanReturn } from 'usehooks-ts'
import { useBoolean, useDebounceValue, useToggle } from 'usehooks-ts'

export const useCustomLogic = (): {
  delayedValue: string
  isOn: boolean
  toggleState: UseBooleanReturn
  toggleLegacy: () => void
} => {
  const [value, setValue] = useState('phase-4')
  const [delayedValue] = useDebounceValue(value, 250)
  const toggleState = useBoolean(false)
  const [isOn, toggleLegacy] = useToggle(false)

  useEffect(() => {
    setValue(current => `${current}-ready`)
  }, [])

  return {
    delayedValue,
    isOn,
    toggleState,
    toggleLegacy,
  }
}
