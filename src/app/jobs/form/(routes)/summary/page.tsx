'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useMutation } from '@tanstack/react-query';

import { calculateJobPricing, createJob } from '@/app/actions/job';

import { useJobFormStore } from '../../hooks/useJobFormStore';
import useJobForm from '../../hooks/useJobForm';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import SummaryField from './components/summary-field';

function SummaryPage() {
  const { goTo, resetForm } = useJobForm();
  const job = useJobFormStore((state) => state.job);
  const [checkedAgreement, setCheckedAgreement] = useState(false);

  const { mutateAsync: calculateJobPricingMutation, data: jobPricing } = useMutation({
    mutationFn: () => calculateJobPricing(job.towLocation.address, job.towDestination.address)
  });

  const {
    mutateAsync: createJobMutation,
    isPending,
    data: createdJob
  } = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      // resetForm();
      window.open(data?.checkoutUrl, '_blank');
    }
  });

  useEffect(() => {
    calculateJobPricingMutation();
  }, [job.towLocation.address, job.towDestination.address]);

  const vehicleInformation = `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model} (${job.vehicle.color})`;

  const contactInformation = `${job.customer.firstName} ${job.customer.lastName}\n${job.customer.phone}\n${job.customer.email}`;

  const amountInformation = `Hookup: ${jobPricing?.fixed} Rials Omani\nMileage: ${jobPricing?.distanceInKm} km x ${jobPricing?.perKmFee} Rials Omani\nTotal: ${jobPricing?.total} Rials Omani`;

  const handleEnterPayment = () => {
    const dto = {
      service: 'Standard',
      serviceType: 'Tow',
      note: job.note,
      startLocation: job.towLocation.address,
      endLocation: job.towDestination.address,
      vehicleMake: job.vehicle.make,
      vehicleModel: job.vehicle.model,
      vehicleYear: job.vehicle.year,
      vehicleColor: job.vehicle.color,
      vehicleRegistration: job.vehicle.registrationNo,
      firstName: job.customer.firstName,
      lastName: job.customer.lastName,
      customerPhone: job.customer.phone,
      customerEmail: job.customer.email
    };
    createJobMutation(dto);
  };

  return (
    <div className="container py-20">
      <h1 className="text-4xl text-center font-semibold">SUMMARY</h1>
      <Separator className="my-8 w-full mx-auto md:w-[800px]" />
      <h2 className="text-2xl text-center font-semibold">Request for Tow Service</h2>
      <div className="mt-8 max-w-[500px] mx-auto flex flex-col space-y-6">
        <SummaryField summaryField={{ title: 'Location', value: job.towLocation.address, onEdit: () => goTo(1) }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Destination', value: job.towDestination.address, onEdit: () => goTo(2) }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Service', value: 'Tow' }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Vehicle', value: vehicleInformation, onEdit: () => goTo(3) }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Contact', value: contactInformation, onEdit: () => goTo(4) }}>
          <SummaryField.Textarea />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Amount', value: amountInformation }}>
          <SummaryField.Textarea />
        </SummaryField>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={checkedAgreement} onCheckedChange={(checked) => setCheckedAgreement(checked as boolean)} />
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            <Link href="https://abc-emergency.com/terms-and-conditions" target="_blank" className="cursor-pointer hover:underline">
              I agree to terms and conditions
            </Link>
          </label>
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={!checkedAgreement} loading={isPending} onClick={handleEnterPayment}>
            Enter Payment
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
