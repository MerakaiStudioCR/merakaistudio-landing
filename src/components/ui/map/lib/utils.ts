const DEFAULT_SIZE = '640x400'

export const buildStaticMapUrl = (
  lat: number,
  lng: number,
  zoom: number,
  apiKey: string
): string => {
  const params = new URLSearchParams({
    center: `${lat},${lng}`,
    zoom: String(zoom),
    size: DEFAULT_SIZE,
    scale: '2',
    maptype: 'roadmap',
    markers: `color:red|${lat},${lng}`,
    key: apiKey
  })

  return `https://maps.googleapis.com/maps/api/staticmap?${params.toString()}`
}
