import { readLocalStorageValue } from './readLocalStorageValue'
import { useReadLocalStorage } from './useReadLocalStorage'

export default function Component() {
  const darkMode = useReadLocalStorage<boolean>('darkMode')
  const snapshot = readLocalStorageValue<boolean>('darkMode')

  return (
    <div>
      <p>Hook: darkMode is {String(darkMode)}</p>
      <p>readLocalStorageValue (same key): {String(snapshot)}</p>
    </div>
  )
}
