import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const projectId: string = 'iredqorsavrwzmvuyysd'; // Replace with your actual project ID
const authCookieName: string = `sb-${projectId}-auth-token`;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const setAuthCookies = (res: NextResponse, accessToken: string, refreshToken: string) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax' as const,
    path: '/',
  };

  res.cookies.set(authCookieName, accessToken, options);
  res.cookies.set(`${authCookieName}-refresh-token`, refreshToken, options);
};

const clearAuthCookies = (res: NextResponse) => {
  res.cookies.set(authCookieName, '', { maxAge: -1, path: '/' });
  res.cookies.set(`${authCookieName}-refresh-token`, '', { maxAge: -1, path: '/' });
};

const getAuthCookies = (req: NextRequest) => {
  const accessToken = req.cookies.get(authCookieName)?.value || '';
  const refreshToken = req.cookies.get(`${authCookieName}-refresh-token`)?.value || '';
  return { accessToken, refreshToken };
};

export { supabase, setAuthCookies, clearAuthCookies, getAuthCookies };
