'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

const GOOGLE_MAP_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY ?? '';

function JobsFormLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <APIProvider apiKey={GOOGLE_MAP_API_KEY}>{children}</APIProvider>;
}

export default JobsFormLayout;
