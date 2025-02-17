'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { toast } from 'sonner';

import { Location, useJobFormStore } from '../../hooks/useJobFormStore';
import useJobForm from '../../hooks/useJobForm';
import useLocation from '../../hooks/useLocation';

import { Button } from '@/components/ui/button';
import GoogleMapAutocomplete from '../../components/google-map-autocomplete';
import GoogleMap from '../../components/google-map';

import { ArrowRight } from 'lucide-react';

function TowLocationPage() {
  const { goToNextStep } = useJobForm();
  const t = useTranslations('form.towLocationPage');
  const { findMyLocation, isInOman } = useLocation();
  const towLocation = useJobFormStore((state) => state.job.towLocation);
  const setTowLocation = useJobFormStore((state) => state.setTowLocation);
  const [validLocation, setValidLocation] = useState(!!towLocation.address);

  useEffect(() => {
    findMyLocation().then((location) => {
      if (!location) return alert('Could not find your location');
      if (!isInOman(location)) return alert('You are not in Oman. Please select a location within Oman');
      setTowLocation(location);
    });
  }, []);

  const onLocationChanged = (location: Location) => {
    // Save the location into the Zustand store
    setTowLocation(location);
    setValidLocation(true);
  };

  const onLocationNotFound = () => {
    toast.error('Could not find the location. Please try again');
    setValidLocation(false);
  };

  return (
    <div>
      <div className="py-8 space-y-2">
        <h1 className="capitalize text-4xl text-center font-semibold">{t('title')}</h1>
        <p className="text-center md:text-lg text-neutral-800">{t('description')}</p>
      </div>

      <div className="relative">
        <GoogleMap location={towLocation} onLocationChanged={onLocationChanged} />

        <GoogleMapAutocomplete
          className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[400px] rounded-lg z-10"
          location={towLocation}
          onLocationChanged={onLocationChanged}
          onLocationNotFound={onLocationNotFound}
        />

        <Button
          size="lg"
          className="fixed bottom-5 w-4/5 md:w-fit font-semibold left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          disabled={!validLocation}
          onClick={() => goToNextStep()}
        >
          {t('cta')} <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

export default TowLocationPage;
