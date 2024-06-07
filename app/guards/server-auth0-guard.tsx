import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '../supabase/server';

interface ServerAuthGuardProps {
  children: ReactNode;
}

const ServerAuthGuard = async ({ children }: ServerAuthGuardProps) => {
  const supabase = createServerSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    // Server-side redirection
    redirect('/login');
    return null;
  }

  return <>{children}</>;
};

export default ServerAuthGuard;
