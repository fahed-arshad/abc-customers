'use client';

import Link from 'next/link';
import Image from 'next/image';

import { usePathname, useRouter } from '@/i18n/routing';

import { useTranslations } from 'next-intl';

import useJobForm from '../form/hooks/useJobForm';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { ChevronDownIcon } from 'lucide-react';

type HeaderProps = {
  locale: string;
};

function Header({ locale }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { goToPrevStep } = useJobForm();
  const t = useTranslations('header');

  const label = locale === 'en' ? 'English' : 'الإنجليزية';

  const handleLocaleChange = (selectedLocale: string) => {
    router.push(pathname, { locale: selectedLocale });
  };

  return (
    <div className="bg-secondary px-4 py-4 h-28">
      <header className="container flex flex-row items-center justify-between">
        <Button variant="link" className="text-xl font-light hover:no-underline" onClick={() => goToPrevStep()}>
          {t('back')}
        </Button>
        <Link href="https://abc-emergency.com">
          <Image src="/logo.svg" alt="ABC Emergency Logo" width={130} height={80} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex flex-row items-center gap-2 text-primary text-xl font-light cursor-pointer">
            {label}
            <ChevronDownIcon className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleLocaleChange('en');
              }}
            >
              English
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                handleLocaleChange('ar');
              }}
            >
              الإنجليزية
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}

export default Header;
