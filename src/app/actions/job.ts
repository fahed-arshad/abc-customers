'use server';

import axios from '@/lib/axios';

export async function calculateJobPricing(startLocation: string, endLocation: string) {
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
