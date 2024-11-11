import { OMAN_BOUNDS } from '../components/google-map';

type Location = {
  lat: number;
  lng: number;
};

function useLocation() {
  const reverseGeocode = async (location: Location) => {
    const geocoder = new google.maps.Geocoder();
    const response = await geocoder.geocode({ location: { lat: location.lat, lng: location.lng } });

    if (response.results.length > 0) {
      const address = response.results.find((result) => {
        const types = result.types;
        const geometry = result.geometry;
        const isTypeChecked = types.includes('neighborhood') || types.includes('locality') || types.includes('premise') || types.includes('route');
        const isLocationTypeChecked = geometry.location_type === 'GEOMETRIC_CENTER';
        return isTypeChecked && isLocationTypeChecked;
      })?.formatted_address;

      if (!address) return null;

      return { address, lat: location.lat, lng: location.lng };
    }

    return null;
  };

  const findMyLocation = async () => {
    const promise = new Promise<google.maps.LatLng>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        },
        (error) => {
          reject(error);
        }
      );
    });

    const location = await promise;
    const address = await reverseGeocode({ lat: location.lat(), lng: location.lng() });
    return address;
  };

  const isInOman = (location: Location) => {
    const { lat, lng } = location;
    return lat >= OMAN_BOUNDS.south && lat <= OMAN_BOUNDS.north && lng >= OMAN_BOUNDS.west && lng <= OMAN_BOUNDS.east;
  };

  return { reverseGeocode, findMyLocation, isInOman };
}

export default useLocation;
