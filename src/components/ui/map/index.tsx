'use client'

import { Suspense, lazy } from 'react'
import Loader from '~/components/ui/loader'
import MapProvider from './context/map-provider'
import StaticGoogleMap from './static-google-map'
import { cn } from '~/shared/lib/cn'
import type { MapProps } from './types'

const InteractiveGoogleMap = lazy(() => import('./interactive-google-map'))

function hasValidCoordinates(latLng?: { lat: number; lng: number }) {
  if (!latLng) return false
  return latLng.lat !== 0 || latLng.lng !== 0
}

const MapComponent = ({ className, id, ...props }: MapProps) => {
  const isStatic = props.variant === 'static'
  const hasLocation = hasValidCoordinates(props.latLng)

  const containerClass = cn(
    'relative aspect-video w-full max-w-[1920px] overflow-hidden rounded-lg shadow-md xl:aspect-3/1',
    className
  )

  // Static variant - simple img, no provider needed
  if (isStatic) {
    return (
      <div id={id} className={containerClass}>
        {hasLocation && <StaticGoogleMap {...props} />}
      </div>
    )
  }

  // Interactive maps always render so users can click to set a location
  return (
    <div id={id} className={containerClass}>
      <MapProvider
        latLng={props.latLng}
        autoDetectLocation={props.readOnly ? false : props.autoDetectLocation}
        onMarkerChange={props.readOnly ? undefined : props.onMarkerChange}
      >
        <Suspense
          fallback={
            <Loader className='h-full w-full' size={24} direction='vertical' />
          }
        >
          <InteractiveGoogleMap {...props} />
        </Suspense>
      </MapProvider>
    </div>
  )
}

export default MapComponent
