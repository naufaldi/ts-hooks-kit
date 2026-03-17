import * as Hooks from 'usehooks-ts'

export const Counter = () => {
  const [count, setCount] = Hooks.useLocalStorage('sample-count', 0)
  const [isEnabled, toggle] = Hooks.useBoolean(false)

  return (
    <section>
      <p>Count: {count}</p>
      <p>Enabled: {String(isEnabled)}</p>
      <button type="button" onClick={() => setCount(prev => prev + 1)}>
        Increase
      </button>
      <button type="button" onClick={toggle}>
        Toggle
      </button>
    </section>
  )
}
