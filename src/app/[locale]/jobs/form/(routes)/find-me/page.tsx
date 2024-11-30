'use client';

import { useTranslations } from 'next-intl';

import useJobForm from '../../hooks/useJobForm';

import { Button } from '@/components/ui/button';

function FindMePage() {
  const { goToNextStep } = useJobForm();
  const t = useTranslations('form.findMePage');

  return (
    <div className="container bg-black">
      <div className="h-[600px] flex flex-col items-center justify-center space-y-6 mb-8">
        <div className="flex flex-row items-center gap-10">
          <div className="space-y-4">
            <h1 className="text-white text-3xl font-semibold md:text-4xl">{t('title')}</h1>
            <p className="text-white  md:text-xl">{t('description')}</p>
          </div>
          <Button size="lg" onClick={() => goToNextStep()}>
            {t('cta')}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FindMePage;
