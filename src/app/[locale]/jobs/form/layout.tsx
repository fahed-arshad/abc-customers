'use client';

import { useJsApiLoader } from '@react-google-maps/api';

import useJobForm from './hooks/useJobForm';

import { Progress } from '@/components/ui/progress';

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

function JobsFormLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getProgress } = useJobForm();

  const progress = getProgress();

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ['places'],
    region: 'om'
  });

  if (loadError) return <p className="text-center">Encountered error while loading google maps</p>;

  if (!isLoaded) return <p className="text-center">Map is loading ...</p>;

  return (
    <div>
      {progress > 0 && <Progress value={progress} className="bg-white rounded-none" />}
      {children}
    </div>
  );
}

export default JobsFormLayout;
