'use client';

import { Location, useJobFormStore } from '../../hooks/useJobFormStore';
import useJobForm from '../../hooks/useJobForm';

import { Button } from '@/components/ui/button';
import GoogleMapAutocomplete from '../../components/google-map-autocomplete';
import GoogleMap from '../../components/google-map';

import { ArrowRight } from 'lucide-react';

function TowDestinationPage() {
  const { goToNextStep } = useJobForm();
  const towDestination = useJobFormStore((state) => state.job.towDestination);
  const setTowDestination = useJobFormStore((state) => state.setTowDestination);

  const onLocationChanged = (location: Location) => {
    // Save the location into the Zustand store
    setTowDestination(location);
  };

  console.log('Tow destination (zustand)', towDestination);

  return (
    <div>
      <div className="py-8">
        <h1 className="capitalize text-4xl text-center font-semibold">TOW DESTINATION</h1>
      </div>

      <div className="relative">
        <GoogleMap location={towDestination} onLocationChanged={onLocationChanged} />

        <GoogleMapAutocomplete
          className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] rounded-lg z-10"
          location={towDestination}
          onLocationChanged={onLocationChanged}
        />

        <Button type="submit" size="lg" className="absolute top-72 font-semibold left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={() => goToNextStep()}>
          Confirm Location <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default TowDestinationPage;
