'use server';

import axios from '@/lib/axios';

type Location = {
  lat: number;
  lng: number;
  address: string;
};

export async function calculateJobPricing(startLocation: Location, endLocation: Location) {
  const response = await axios.post('/jobs/calculate-pricing', {
    startLocation,
    endLocation
  });
  return response.data;
}

export async function createJob(dto: any) {
  const response = await axios.post('/jobs', dto);
  return response.data;
}
