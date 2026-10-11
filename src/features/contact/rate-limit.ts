const WINDOW_MS = 1000 * 60 * 60
const LIMIT = 5

const hits = new Map<string, number[]>()

export function allowContactAttempt(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS)
  if (recent.length >= LIMIT) {
    hits.set(key, recent)
    return false
  }
  recent.push(now)
  hits.set(key, recent)
  return true
}
