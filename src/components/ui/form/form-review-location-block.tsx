'use client'

import { DetailInfoField } from '~/components/ui/detail-info'
import MapComponent from '~/components/ui/map'
import useMessages from '~/i18n/useMessages'
import { cn } from '~/shared/lib/cn'

interface FormReviewLocationBlockProps {
  lat: number
  lng: number
  latLabel?: string
  lngLabel?: string
  zoom?: number
  className?: string
}

export function FormReviewLocationBlock({
  lat,
  lng,
  latLabel,
  lngLabel,
  zoom = 15,
  className
}: FormReviewLocationBlockProps) {
  const t = useMessages()

  return (
    <div className={cn('col-span-12', className)}>
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(11rem,14rem)] lg:items-stretch'>
        <div className='min-h-56 overflow-hidden rounded-lg border border-border lg:min-h-[220px]'>
          <MapComponent
            latLng={{ lat, lng }}
            variant='interactive'
            readOnly
            zoom={zoom}
            className='h-full min-h-56 w-full'
          />
        </div>

        <div className='grid grid-cols-2 gap-4 lg:grid-cols-1 lg:content-start'>
          <DetailInfoField
            className='col-span-1 lg:col-span-12'
            label={latLabel ?? t('geolocation.latitude')}
            value={String(lat)}
          />
          <DetailInfoField
            className='col-span-1 lg:col-span-12'
            label={lngLabel ?? t('geolocation.longitude')}
            value={String(lng)}
          />
        </div>
      </div>
    </div>
  )
}

export default FormReviewLocationBlock
