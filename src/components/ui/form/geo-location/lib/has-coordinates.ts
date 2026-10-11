export const hasCoordinates = (lat?: number, lng?: number) =>
  lat != null && lng != null && !(lat === 0 && lng === 0)
