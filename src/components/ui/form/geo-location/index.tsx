import { useState } from 'react'
import GoogleMap from '~/components/ui/map'
import Input from '~/components/ui/form/input'
import useMessages from '~/i18n/useMessages'
import { parseNumber } from '~/shared/lib/math'
import { cn } from '~/shared/lib/cn'
import { roundToSixDecimals, isUnsetGeoCoordinates } from './lib/utils'
import type { GeoLocationSchema } from './schema'
import type { LatLngLiteral } from '~/components/ui/map/types'

interface Props {
  latValue?: number | string
  lngValue?: number | string
  latError?: string
  lngError?: string
  latName?: string
  lngName?: string
  autoDetectLocation?: boolean
  compact?: boolean
  mapClassName?: string
  mapId?: string
  onLatChange?: (value: number) => void
  onLngChange?: (value: number) => void
}

const GeoLocation = ({
  latValue,
  lngValue,
  latError,
  lngError,
  latName = 'lat',
  lngName = 'lng',
  autoDetectLocation = true,
  compact = false,
  mapClassName,
  mapId,
  onLatChange,
  onLngChange
}: Props) => {
  const t = useMessages('geolocation')
  const resolvedMapId = mapId ?? latName ?? 'geo-location-map'

  // Single state for local edits (only used when props aren't provided)
  const [localCoords, setLocalCoords] =
    useState<Partial<GeoLocationSchema> | null>(null)

  // Compute coordinates: local edits take precedence (for immediate feedback),
  // then props, then default
  const lat = localCoords?.lat ?? (parseNumber(latValue, 0) as number)
  const lng = localCoords?.lng ?? (parseNumber(lngValue, 0) as number)
  const coordinates: GeoLocationSchema = { lat, lng }

  const handleInputChange =
    (field: 'lat' | 'lng') => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseNumber(e.target.valueAsNumber)
      if (value === undefined) return

      const roundedValue = roundToSixDecimals(value)

      setLocalCoords((prev) => ({
        ...prev,
        [field]: roundedValue
      }))

      if (field === 'lat') {
        onLatChange?.(roundedValue)
      } else {
        onLngChange?.(roundedValue)
      }
    }

  const handleMarkerChange = (position: LatLngLiteral | null) => {
    if (!position) return
    const roundedLat = roundToSixDecimals(position.lat)
    const roundedLng = roundToSixDecimals(position.lng)
    setLocalCoords({ lat: roundedLat, lng: roundedLng })
    onLatChange?.(roundedLat)
    onLngChange?.(roundedLng)
  }

  return (
    <div className={cn('flex flex-col gap-3', compact && 'gap-2')}>
      <label
        htmlFor={resolvedMapId}
        className={cn(
          'font-medium text-foreground text-sm',
          compact && 'text-muted-foreground text-xs'
        )}
      >
        {compact ? t('location') : t('geo-location')}
      </label>
      <GoogleMap
        variant='interactive'
        latLng={
          isUnsetGeoCoordinates(coordinates.lat, coordinates.lng)
            ? undefined
            : coordinates
        }
        onMarkerChange={handleMarkerChange}
        id={resolvedMapId}
        autoDetectLocation={autoDetectLocation}
        className={cn(
          compact && 'aspect-5/3 max-h-52 rounded-md shadow-sm xl:aspect-5/3',
          mapClassName
        )}
      />
      <div
        className={cn(
          'field-set pt-0',
          compact && 'grid grid-cols-1 gap-3 sm:grid-cols-2'
        )}
      >
        <Input
          type='number'
          className={cn(compact ? 'w-full' : 'w-2xs')}
          error={latError}
          label={t('latitude')}
          name={latName}
          onChange={handleInputChange('lat')}
          value={lat}
          step={0.000001}
        />
        <Input
          type='number'
          className={cn(compact ? 'w-full' : 'w-2xs')}
          error={lngError}
          label={t('longitude')}
          name={lngName}
          onChange={handleInputChange('lng')}
          value={lng}
          step={0.000001}
        />
      </div>
    </div>
  )
}

export default GeoLocation
