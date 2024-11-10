'use client';

import { Button } from '@/components/ui/button';
import GoogleMapAutocomplete, { Location } from '../components/google-map-autocomplete';
import GoogleMap from '../components/google-map';

import { ArrowRight } from 'lucide-react';

function TowLocationPage() {
  const onLocationChanged = (location: Location) => {
    // TODO: Save the location into the Zustand store
  };

  return (
    <div>
      <div className="py-8">
        <h1 className="text-4xl text-center font-semibold">Tow Location</h1>
      </div>

      <div className="relative">
        <GoogleMap onLocationChanged={onLocationChanged} />

        <GoogleMapAutocomplete className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-lg z-10" onLocationChanged={onLocationChanged} />

        <Button type="submit" size="lg" className="absolute top-72 font-semibold left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          Confirm Location <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default TowLocationPage;
