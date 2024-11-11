'use client';

import { useJsApiLoader } from '@react-google-maps/api';

import { Progress } from '@/components/ui/progress';
import { useJobFormStore } from './hooks/useJobFormStore';

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

function JobsFormLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentStep = useJobFormStore((state) => state.currentStep);

  const progress = ((currentStep.index + 1) / 8) * 100;

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ['places'],
    region: 'om'
  });

  if (loadError) return <p className="text-center">Encountered error while loading google maps</p>;

  if (!isLoaded) return <p className="text-center">Map is loading ...</p>;

  return (
    <div>
      <Progress value={progress} className="bg-white rounded-none" />
      {children}
    </div>
  );
}

export default JobsFormLayout;
