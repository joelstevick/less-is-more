import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies, supabase } from '@/app/utils/supabase/supabase';

export async function POST(req: NextRequest) {

  try {
    const { email, password } = await req.json();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      console.log(error.message);
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const { user, session } = data;

    if (session) {
      const response = NextResponse.json({ user });
      setAuthCookies(response, session.access_token, session.refresh_token);
      return response;
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error('Failed to parse request body', err);
    return NextResponse.json({ error: 'Failed to parse request body' }, { status: 400 });
  }
}
