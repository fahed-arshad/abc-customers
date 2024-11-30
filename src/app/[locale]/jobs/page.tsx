import Image from 'next/image';

import { Link } from '@/i18n/routing';

import { ArrowDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

function JobsPage() {
  const t = useTranslations('jobsPage');
  return (
    <div>
      <div className="bg-black h-[450px] md:h-[600px] flex items-center justify-center mb-8">
        <div className="container flex flex-col items-center justify-center space-y-6">
          <h1 className="text-center text-white text-xl md:text-3xl">{t('title')}</h1>
          <ArrowDown size={64} className="text-primary" />
        </div>
      </div>

      <Link href="/jobs/form/find-me">
        <div className="bg-secondary p-6 rounded-full w-32 h-32 mx-auto flex flex-col items-center justify-center space-y-2">
          <Image src="/icons/tow.svg" alt="Tow Icon" width={60} height={60} />
          <p className="font-black text-white text-center">{t('towButtonText')}</p>
        </div>
      </Link>
    </div>
  );
}

export default JobsPage;
