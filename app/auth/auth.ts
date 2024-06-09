import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthCookies, supabase } from '../utils/supabase/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { accessToken, refreshToken } = getAuthCookies(req);

  if (!accessToken || !refreshToken) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  if (error || !data.user) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  res.status(200).json({ user: data.user });
}
