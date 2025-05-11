'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { useMutation } from '@tanstack/react-query';

import { calculateJobPricing, createJob } from '@/app/actions/job';

import { useJobFormStore } from '../../hooks/useJobFormStore';
import useJobForm from '../../hooks/useJobForm';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import SummaryField from './components/summary-field';

import { toast } from 'sonner';

function SummaryPage() {
  const router = useRouter();
  const { goTo, resetForm } = useJobForm();
  const t = useTranslations('form.summaryPage');
  const job = useJobFormStore((state) => state.job);
  const [checkedAgreement, setCheckedAgreement] = useState(false);

  const { mutateAsync: calculateJobPricingMutation, data: jobPricing } = useMutation({
    mutationFn: () => calculateJobPricing(job.towLocation, job.towDestination)
  });

  const {
    mutateAsync: createJobMutation,
    isPending,
    data: createdJob
  } = useMutation({
    mutationFn: createJob,
    onSuccess: (data) => {
      // resetForm();
      router.push(data?.checkoutUrl);
    },
    onError: () => {
      toast.error('Failed to create the job. Please try again later.');
    }
  });

  useEffect(() => {
    calculateJobPricingMutation();
  }, [job.towLocation.address, job.towDestination.address]);

  const vehicleInformation = `${job.vehicle.year} ${job.vehicle.make} ${job.vehicle.model} (${job.vehicle.color})`;

  const contactInformation = `${job.customer.firstName} ${job.customer.lastName}\n${job.customer.phone}\n${job.customer.email}`;

  const amountInformation = `Hookup: ${jobPricing?.fixed} OMR\Distance: ${jobPricing?.distanceInKm} km x ${jobPricing?.perKmFee} OMR per km\nVAT: ${jobPricing?.customerPricing?.vat} OMR (5% of VAT)\nTotal including VAT: ${jobPricing?.total} OMR`;

  const handleEnterPayment = () => {
    const dto = {
      note: job.note,
      startLocation: job.towLocation,
      endLocation: job.towDestination,
      vehicle: {
        make: job.vehicle.make,
        model: job.vehicle.model,
        year: job.vehicle.year,
        color: job.vehicle.color,
        registration: job.vehicle.registrationNo
      },
      customer: {
        firstName: job.customer.firstName,
        lastName: job.customer.lastName,
        phone: job.customer.phone,
        email: job.customer.email
      }
    };
    createJobMutation(dto);
  };

  return (
    <div className="container py-20">
      <h1 className="text-4xl text-center font-semibold">{t('title')}</h1>
      <Separator className="my-4 w-full mx-auto md:w-[800px]" />
      <h2 className="text-2xl text-center font-semibold">{t('description')}</h2>
      <div className="mt-8 max-w-[500px] mx-auto flex flex-col space-y-6">
        <SummaryField summaryField={{ title: t('locationField.title'), value: job.towLocation.address, onEdit: () => goTo(1) }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: t('destinationField.title'), value: job.towDestination.address, onEdit: () => goTo(2) }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: t('serviceField.title'), value: 'Tow' }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: t('vehicleField.title'), value: vehicleInformation, onEdit: () => goTo(3) }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: t('contactField.title'), value: contactInformation, onEdit: () => goTo(4) }}>
          <SummaryField.Textarea />
        </SummaryField>

        <SummaryField summaryField={{ title: t('amountField.title'), value: amountInformation }}>
          <SummaryField.Textarea />
        </SummaryField>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" checked={checkedAgreement} onCheckedChange={(checked) => setCheckedAgreement(checked as boolean)} />
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            <Link href="https://abc-emergency.com/terms-and-conditions" target="_blank" className="cursor-pointer hover:underline">
              {t('termsField.title')}
            </Link>
          </label>
        </div>

        <div className="flex justify-center">
          <Button type="submit" disabled={!checkedAgreement} loading={isPending} onClick={handleEnterPayment} className="w-full md:w-fit">
            {t('cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
