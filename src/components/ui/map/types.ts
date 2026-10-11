export type LatLngLiteral = {
  lat: number
  lng: number
}

// Base props shared by all map variants
type BaseMapProps = {
  id?: string
  latLng?: LatLngLiteral
  zoom?: number
  className?: string
}

// Static map - just displays an image, no interactivity
export type StaticMapProps = BaseMapProps & {
  variant: 'static'
}

// Interactive map - full Google Maps with click handling
export type InteractiveMapProps = BaseMapProps & {
  variant?: 'interactive'
  /** Pan/zoom only — marker stays fixed and clicks do not move it */
  readOnly?: boolean
  autoDetectLocation?: boolean
  onClick?: (latLng: LatLngLiteral | null) => void
  onMarkerChange?: (position: LatLngLiteral | null) => void
}

// Union type for the main component
export type MapProps = StaticMapProps | InteractiveMapProps
