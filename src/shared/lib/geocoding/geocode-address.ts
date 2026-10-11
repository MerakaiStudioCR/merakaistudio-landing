export type GeocodedLocation = {
  lat: number
  lng: number
}

export const geocodeAddress = async (
  address: string
): Promise<GeocodedLocation | null> => {
  const query = address.trim()

  if (!query) return null

  try {
    const url = new URL('/api/geocoding', window.location.origin)
    url.searchParams.set('address', query)

    const response = await fetch(url.toString(), {
      credentials: 'include'
    })

    if (!response.ok) {
      mk_debug.error('Geocoding BFF request failed', {
        address: query,
        status: response.status
      })
      return null
    }

    const data = (await response.json()) as {
      location?: GeocodedLocation | null
    }
    return data.location ?? null
  } catch (error) {
    mk_debug.error('Geocoding request failed', { error, address: query })
    return null
  }
}
