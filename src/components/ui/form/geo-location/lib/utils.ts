/**
 * Rounds a coordinate value to 6 decimal places
 * 6 decimals = ~0.1m precision, sufficient for mapping
 */
export const roundToSixDecimals = (value: number): number => {
  return Math.round(value * 1000000) / 1000000
}

export function isUnsetGeoCoordinates(
  lat?: number | string,
  lng?: number | string
) {
  const parsedLat = Number(lat)
  const parsedLng = Number(lng)
  return (
    !Number.isFinite(parsedLat) ||
    !Number.isFinite(parsedLng) ||
    (parsedLat === 0 && parsedLng === 0)
  )
}
