import Image from 'next/image'
import { buildStaticMapUrl } from './lib/utils'
import type { StaticMapProps } from './types'

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || ''
const DEFAULT_ZOOM = 15

const StaticGoogleMap = ({ latLng, zoom = DEFAULT_ZOOM }: StaticMapProps) => {
  if (!latLng?.lat || !latLng?.lng) {
    return null
  }

  const src = buildStaticMapUrl(latLng.lat, latLng.lng, zoom, API_KEY)

  return (
    <Image
      src={src}
      alt='Map location'
      fill
      className='object-cover'
      unoptimized
    />
  )
}

export default StaticGoogleMap
