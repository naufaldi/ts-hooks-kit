export function sanitizeJson<T>(value: T): T {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeJson) as T
  }

  const result: Record<string, unknown> = {}
  for (const key of Object.keys(value as Record<string, unknown>)) {
    if (key === '__proto__') continue
    const val = (value as Record<string, unknown>)[key]
    if (key === 'constructor' && typeof val === 'object' && val !== null) {
      const cleaned = { ...val } as Record<string, unknown>
      delete cleaned['prototype']
      result[key] = sanitizeJson(cleaned)
    } else {
      result[key] = sanitizeJson(val)
    }
  }
  return result as T
}
