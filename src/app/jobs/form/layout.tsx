'use client';

import { useJsApiLoader } from '@react-google-maps/api';

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string;

function JobsFormLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_API_KEY,
    libraries: ['places']
  });

  if (loadError) return <p className="text-center">Encountered error while loading google maps</p>;

  if (!isLoaded) return <p className="text-center">Map is loading ...</p>;

  return <div>{children}</div>;
}

export default JobsFormLayout;
