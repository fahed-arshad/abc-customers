import Header from './components/header';

function JobsLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default JobsLayout;
