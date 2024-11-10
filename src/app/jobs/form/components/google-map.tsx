import { GoogleMap as ReactGoogleMap, Libraries, useJsApiLoader, Marker } from '@react-google-maps/api';

import { Location } from './google-map-autocomplete';

const DEFAULT_PROPS = {
  style: {
    width: '100%',
    height: '80vh',
    borderRadius: '15px 0px 0px 15px'
  },
  center: {
    lat: 35.8799866,
    lng: 76.5048004
  },
  zoom: 15,
  options: {
    zoomControl: true,
    tilt: 0,
    gestureHandling: 'auto',
    mapTypeId: 'roadmap'
  },
  libraries: ['places']
};

type GoogleMapProps = {
  location?: Location;
  onLocationChanged: (location: Location) => void;
};

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

function GoogleMap({ location, onLocationChanged }: GoogleMapProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: DEFAULT_PROPS.libraries as Libraries
  });

  if (loadError) return <p className="text-center">Encountered error while loading google maps</p>;

  if (!isLoaded) return <p className="text-center">Map is loading ...</p>;

  return (
    <ReactGoogleMap mapContainerStyle={DEFAULT_PROPS.style} center={location ?? DEFAULT_PROPS.center} zoom={DEFAULT_PROPS.zoom} options={DEFAULT_PROPS.options}>
      <Marker
        draggable
        position={location ?? DEFAULT_PROPS.center}
        onDragEnd={(e) => {
          console.log(e.latLng?.lat());
        }}
      />
    </ReactGoogleMap>
  );
}

export default GoogleMap;
