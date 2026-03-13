import { useLocalStorage, useMediaQuery } from '@ts-hooks-kit/core'

import { Counter } from './components/Counter'
import { useCustomLogic } from './hooks/useCustomLogic'

export const App = () => {
  const [name, setName] = useLocalStorage('sample-name', 'ts-hooks-kit')
  const isDark = useMediaQuery('(prefers-color-scheme: dark)')
  const customLogic = useCustomLogic()

  return (
    <main>
      <h1>Phase 4 migration sample</h1>
      <p>Dark mode: {String(isDark)}</p>
      <p>Delayed value: {customLogic.delayedValue}</p>
      <p>Legacy toggle state: {String(customLogic.isOn)}</p>
      <label htmlFor="name-input">Name</label>
      <input
        id="name-input"
        value={name}
        onChange={event => setName(event.target.value)}
      />
      <Counter />
    </main>
  )
}
