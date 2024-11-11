import { GoogleMap as ReactGoogleMap, Marker } from '@react-google-maps/api';

import { Location } from '../hooks/useJobFormStore';

const OMAN = { lat: 21.4735, lng: 55.9754 };

export const OMAN_BOUNDS = {
  north: 26.385,
  south: 16.645,
  west: 52.0,
  east: 59.839
};

const DEFAULT_PROPS = {
  style: {
    width: '100%',
    height: '80vh',
    borderRadius: '0px 0px 0px 0px'
  },
  center: OMAN,
  zoom: 15,
  options: {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap',
    restriction: {
      latLngBounds: OMAN_BOUNDS,
      strictBounds: true
    }
  },
  libraries: ['places']
};

type GoogleMapProps = {
  location?: Location;
  onLocationChanged: (location: Location) => void;
};

function GoogleMap({ location, onLocationChanged }: GoogleMapProps) {
  const handleOnMarkerChanged = async (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;

    const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };

    // Reverse geocode the location
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location });

    if (response.results.length > 0) {
      const address = response.results.find((result) => {
        const types = result.types;
        const geometry = result.geometry;
        const isTypeChecked = types.includes('neighborhood') || types.includes('locality') || types.includes('premise') || types.includes('route');
        const isLocationTypeChecked = geometry.location_type === 'GEOMETRIC_CENTER';
        return isTypeChecked && isLocationTypeChecked;
      })?.formatted_address;

      if (!address) return alert('Could not find address for the selected location');

      onLocationChanged({ address, lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  return (
    <ReactGoogleMap mapContainerStyle={DEFAULT_PROPS.style} center={location ?? DEFAULT_PROPS.center} zoom={DEFAULT_PROPS.zoom} options={DEFAULT_PROPS.options}>
      <Marker draggable position={location ?? DEFAULT_PROPS.center} onDragEnd={handleOnMarkerChanged} />
    </ReactGoogleMap>
  );
}

export default GoogleMap;
