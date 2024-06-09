import { setAuthCookies, supabase } from '@/app/utils/supabase/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const { data: { user, session }, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  const response = NextResponse.json({ user });

  if (session) {
    setAuthCookies(response, session.access_token, session.refresh_token);
  }

  return response;
}
