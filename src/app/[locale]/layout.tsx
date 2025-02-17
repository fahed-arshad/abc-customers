import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '../globals.css';

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

import { Toaster } from '@/components/ui/sonner';

import ReactQueryProvider from '@/components/ui/react-query-provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600']
});

export const metadata: Metadata = {
  title: 'ABC Emergency',
  description: 'Generated by create next app'
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${poppins.className} antialiased`}>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
