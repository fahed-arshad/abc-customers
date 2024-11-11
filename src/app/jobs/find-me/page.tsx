'use client';

import useJobForm from '../form/hooks/useJobForm';

import { Button } from '@/components/ui/button';

function FindMePage() {
  const { goToNextStep } = useJobForm();

  return (
    <div className="bg-black h-[600px] flex flex-col items-center justify-center space-y-6 mb-8">
      <div className="flex flex-row items-center gap-10">
        <div className="space-y-4">
          <h1 className="text-white text-3xl font-semibold md:text-4xl">Where is your vehicle?</h1>
          <p className="text-white text-xl">We need your location to dispatch the closest service provider.</p>
        </div>
        <Button size="lg" onClick={() => goToNextStep()}>
          Find Me
        </Button>
      </div>
    </div>
  );
}

export default FindMePage;
