import Header from './components/header';

async function JobsLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <div className="relative h-screen overflow-hidden">
      <Header locale={locale} />
      <main className="absolute top-28 left-0 right-0 h-[calc(100vh-7rem)]">{children}</main>
    </div>
  );
}

export default JobsLayout;
