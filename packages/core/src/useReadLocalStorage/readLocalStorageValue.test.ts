import { deserializeReadLocalStorageString, readLocalStorageValue } from './readLocalStorageValue'

describe('deserializeReadLocalStorageString()', () => {
  it('parses JSON object', () => {
    expect(deserializeReadLocalStorageString<{ a: number }>('{"a":1}')).toEqual({ a: 1 })
  })

  it("treats stored literal 'undefined' as undefined", () => {
    expect(deserializeReadLocalStorageString('undefined')).toBeUndefined()
  })

  it('returns null and logs on invalid JSON', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(deserializeReadLocalStorageString('not-json')).toBe(null)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })

  it('uses custom deserializer', () => {
    expect(
      deserializeReadLocalStorageString('x', {
        deserializer: v => v.toUpperCase() as unknown as string,
      }),
    ).toBe('X')
  })
})

describe('readLocalStorageValue()', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns null for missing key', () => {
    expect(readLocalStorageValue('missing')).toBe(null)
  })

  it('returns parsed value when key exists', () => {
    localStorage.setItem('k', '"hi"')
    expect(readLocalStorageValue<string>('k')).toBe('hi')
  })

  it('returns null and warns when localStorage throws', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const getItem = vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('denied')
    })
    expect(readLocalStorageValue('k')).toBe(null)
    expect(spy).toHaveBeenCalled()
    getItem.mockRestore()
    spy.mockRestore()
  })

  it('returns null when window is undefined', () => {
    const win = globalThis.window
    vi.stubGlobal('window', undefined)
    expect(readLocalStorageValue('k')).toBe(null)
    vi.stubGlobal('window', win)
  })
})
