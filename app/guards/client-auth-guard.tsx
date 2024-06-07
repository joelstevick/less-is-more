"use client";

import { useEffect, ReactNode, useState } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/spinner/spinner';
import { supabase } from '../supabase/client';

interface ClientAuthGuardProps {
  children: ReactNode;
}

const ClientAuthGuard = ({ children }: ClientAuthGuardProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log("XXX", data, error)
      if (error || !data.session) {
        router.push('/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return <Spinner />;
  }

  return authenticated ? <>{children}</> : null;
};

export default ClientAuthGuard;
