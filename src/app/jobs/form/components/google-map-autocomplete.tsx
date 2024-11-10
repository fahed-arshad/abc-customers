import { useState } from 'react';

import { Autocomplete } from '@react-google-maps/api';

import { Input } from '@/components/ui/input';

export type Location = {
  address: string;
  lat: number;
  lng: number;
};

type GoogleMapsAutocompleteProps = React.HTMLAttributes<HTMLDivElement> & {
  location?: Location;
  onLocationChanged?: (location: Location) => void;
};

function GoogleMapAutocomplete({ className, location, onLocationChanged }: GoogleMapsAutocompleteProps) {
  const [address, setAddress] = useState(location?.address ?? '');
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;

    const place = autocomplete.getPlace();
    if (!place?.place_id) return;

    if (!place?.formatted_address) return;
    setAddress(place.formatted_address);

    if (!place?.geometry?.location) return;
    onLocationChanged?.({
      address: place.formatted_address ?? '',
      lat: place.geometry?.location.lat(),
      lng: place.geometry?.location.lng()
    });
  };

  return (
    <div className={className}>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <Input autoFocus placeholder="Enter an address or location" value={address} onChange={(e) => setAddress(e.target.value)} />
      </Autocomplete>
    </div>
  );
}

export default GoogleMapAutocomplete;
