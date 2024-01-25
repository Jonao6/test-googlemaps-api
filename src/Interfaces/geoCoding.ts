export interface GeocoderProps {
    address: string,
    location?: google.maps.LatLngBounds,
    placeId?: string,
    bounds?:  google.maps.LatLngBounds,
    componentRestrictions?: google.maps.GeocoderComponentRestrictions,
    region?: string
}