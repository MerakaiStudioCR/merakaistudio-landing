import { z } from 'zod'

export const CRC_COORDINATES_RANGE = {
  lat: { min: 8, max: 11 },
  lng: { min: -86, max: -82 }
}

export const CRC_DEFAULT_MAP_CENTER = {
  lat: 9.9281,
  lng: -84.0907
}

export const CRC_DEFAULT_MAP_ZOOM = 7

const geoLocationSchema = z.object({
  lat: z
    .number({ error: 'Formato inválido' })
    .min(CRC_COORDINATES_RANGE.lat.min, 'Latitud inválida')
    .max(CRC_COORDINATES_RANGE.lat.max, 'Latitud inválida'),
  lng: z
    .number({ error: 'Formato inválido' })
    .min(CRC_COORDINATES_RANGE.lng.min, 'Longitud inválida')
    .max(CRC_COORDINATES_RANGE.lng.max, 'Longitud inválida')
})

export type GeoLocationSchema = z.infer<typeof geoLocationSchema>

export default geoLocationSchema
