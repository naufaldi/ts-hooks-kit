export const assertSameShape = (
  oldResult: Record<string, unknown>,
  newResult: Record<string, unknown>,
) => {
  const oldKeys = Object.keys(oldResult).sort()
  const newKeys = Object.keys(newResult).sort()
  expect(newKeys).toEqual(oldKeys)
  for (const key of oldKeys) {
    expect(typeof newResult[key]).toBe(typeof oldResult[key])
  }
}

export const assertSameState = (
  oldResult: Record<string, unknown>,
  newResult: Record<string, unknown>,
) => {
  const oldKeys = Object.keys(oldResult).sort()
  for (const key of oldKeys) {
    if (typeof oldResult[key] !== 'function') {
      expect(newResult[key]).toEqual(oldResult[key])
    }
  }
}
