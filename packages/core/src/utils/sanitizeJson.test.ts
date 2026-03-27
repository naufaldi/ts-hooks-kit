import { describe, expect, it } from 'vitest'

import { sanitizeJson } from './sanitizeJson'

describe('sanitizeJson', () => {
  it('returns safe objects unchanged', () => {
    expect(sanitizeJson({ a: 1, b: 'hello' })).toEqual({ a: 1, b: 'hello' })
  })

  it('strips __proto__ keys', () => {
    const malicious = JSON.parse('{"__proto__": {"polluted": true}, "safe": 1}')
    const result = sanitizeJson(malicious)
    expect(result).toEqual({ safe: 1 })
    expect((result as any).__proto__).toBe(Object.prototype)
  })

  it('strips constructor.prototype keys', () => {
    const malicious = JSON.parse('{"constructor": {"prototype": {"polluted": true}}}')
    const result = sanitizeJson(malicious)
    expect(result).toEqual({ constructor: {} })
  })

  it('strips nested __proto__ keys', () => {
    const malicious = JSON.parse('{"a": {"__proto__": {"polluted": true}, "b": 1}}')
    const result = sanitizeJson(malicious)
    expect(result).toEqual({ a: { b: 1 } })
  })

  it('returns primitives unchanged', () => {
    expect(sanitizeJson(42)).toBe(42)
    expect(sanitizeJson('hello')).toBe('hello')
    expect(sanitizeJson(null)).toBe(null)
    expect(sanitizeJson(true)).toBe(true)
  })

  it('handles arrays', () => {
    const input = [1, { __proto__: { polluted: true }, safe: 2 }]
    const parsed = JSON.parse(JSON.stringify(input))
    const result = sanitizeJson(parsed)
    expect(Array.isArray(result)).toBe(true)
    expect((result as any)[0]).toBe(1)
    expect((result as any)[1]).toEqual({ safe: 2 })
  })
})
