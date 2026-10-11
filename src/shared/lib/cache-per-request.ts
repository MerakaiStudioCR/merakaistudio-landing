import * as React from 'react'

export function cachePerRequest<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  const cache = (
    React as {
      cache?: <F extends (...args: Args) => Result>(fn: F) => F
    }
  ).cache

  if (typeof cache === 'function') {
    return cache(fn)
  }

  return fn
}
