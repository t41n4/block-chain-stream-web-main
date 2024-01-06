'use client';

import Providers from '@modules/providers';
import Footer from '@modules/common/components/footer/footer';
import { usePathname } from 'next/navigation';
export default function RootWrapper({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  return (
    <Providers>
      {children}
      {pathName !== '/auth' && <Footer />}
    </Providers>
  );
}
