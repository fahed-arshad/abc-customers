'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import SummaryField from './components/summary-field';

function SummaryPage() {
  return (
    <div>
      <h1 className="text-4xl text-center font-semibold">SUMMARY</h1>
      <Separator className="my-8 w-full mx-auto md:w-[800px]" />
      <h2 className="text-2xl text-center font-semibold">Request for Tow Service</h2>
      <div className="mt-8 max-w-[500px] mx-auto flex flex-col space-y-6">
        <SummaryField summaryField={{ title: 'Location', value: 'Sample value', href: '/jobs/form/tow-location' }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Destination', value: 'Sample value', href: '/jobs/form/tow-destination' }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Service', value: 'Tow' }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Vehicle', value: 'Tow' }}>
          <SummaryField.Input />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Contact', value: 'Tow' }}>
          <SummaryField.Textarea />
        </SummaryField>

        <SummaryField summaryField={{ title: 'Amount', value: 'Tow' }}>
          <SummaryField.Textarea />
        </SummaryField>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label htmlFor="terms" className="text-sm font-medium leading-none">
            <Link href="https://abc-emergency.com/terms-and-conditions" target="_blank" className="cursor-pointer hover:underline">
              I agree to terms and conditions
            </Link>
          </label>
        </div>

        <div className="flex justify-center">
          <Button type="submit">Enter Payment</Button>
        </div>
      </div>
    </div>
  );
}

export default SummaryPage;
