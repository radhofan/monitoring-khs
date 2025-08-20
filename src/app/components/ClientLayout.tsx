'use client';

import SidebarLayout from '@/app/components/SidebarLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Spin } from 'antd';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import AuthBootstrapper from './AuthBootstrapper';

const queryClient = new QueryClient();

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const isAuthPage = pathname === '/login';

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (isAuthPage) return <>{children}</>;

  if (!isReady) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthBootstrapper />
      <SidebarLayout>{children}</SidebarLayout>
    </QueryClientProvider>
  );
}
