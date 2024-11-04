import Link from 'next/link';
import Image from 'next/image';

import { ArrowDown } from 'lucide-react';

function JobsPage() {
  return (
    <div>
      <div className="bg-black h-[600px] flex flex-col items-center justify-center space-y-6 mb-8">
        <h1 className="text-white text-xl md:text-3xl">Please select a service to get started</h1>
        <ArrowDown size={64} className="text-primary" />
      </div>

      <Link href="/jobs/tow">
        <div className="bg-secondary p-6 rounded-full w-32 h-32 mx-auto flex flex-col items-center justify-center space-y-2">
          <Image src="/icons/tow.svg" alt="Tow Icon" width={60} height={60} />
          <p className="font-black text-white text-center">Tow</p>
        </div>
      </Link>
    </div>
  );
}

export default JobsPage;
