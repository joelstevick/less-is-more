// pages/api/login.ts
import { setAuthCookies, supabase } from "@/app/utils/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return res.status(401).json({ error: error.message });
  }

  if (session) {
    setAuthCookies(res, session.access_token, session.refresh_token);
  }

  res.status(200).json({ user });
}
