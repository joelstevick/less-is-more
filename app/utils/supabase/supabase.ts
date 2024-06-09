// utils/supabase.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { parse, serialize } from 'cookie';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_KEY as string;
const projectId: string = 'iredqorsavrwzmvuyysd'; 
const authCookieName: string = `sb-${projectId}-auth-token`;

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

const setAuthCookies = (res: any, accessToken: string, refreshToken: string) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'lax' as const,
    path: '/',
  };

  res.setHeader('Set-Cookie', [
    serialize(authCookieName, accessToken, options),
    serialize(`${authCookieName}-refresh-token`, refreshToken, options),
  ]);
};

const clearAuthCookies = (res: any) => {
  res.setHeader('Set-Cookie', [
    serialize(authCookieName, '', { maxAge: -1, path: '/' }),
    serialize(`${authCookieName}-refresh-token`, '', { maxAge: -1, path: '/' }),
  ]);
};

const getAuthCookies = (req: any) => {
  const cookies = parse(req ? req.headers.cookie || '' : '');
  return {
    accessToken: cookies[authCookieName],
    refreshToken: cookies[`${authCookieName}-refresh-token`],
  };
};

export { supabase, setAuthCookies, clearAuthCookies, getAuthCookies };
