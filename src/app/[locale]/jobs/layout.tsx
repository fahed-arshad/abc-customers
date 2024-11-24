import Header from './components/header';

function JobsLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div>
      <Header locale={locale} />
      <main>{children}</main>
    </div>
  );
}

export default JobsLayout;
