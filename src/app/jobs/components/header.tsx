import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@/components/ui/button';

function Header() {
  return (
    <header className="bg-secondary flex flex-row items-center justify-between h-28 px-4 py-4">
      <Button variant="link" className="text-lg font-light">
        Back
      </Button>
      <Link href="https://abc-emergency.com">
        <Image src="/logo.svg" alt="ABC Emergency Logo" width={130} height={80} />
      </Link>
      <p className="text-primary text-lg font-light">English</p>
    </header>
  );
}

export default Header;
