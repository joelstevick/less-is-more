// pages/api/login.ts
import { setAuthCookies, supabase } from "@/app/utils/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  console.log("XXX", email)

  const {
    data: { user, session },
    error,
  } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log("XXX", error, res);
    return res.status(401).json({ error: error.message });
  }

  if (session) {
    setAuthCookies(res, session.access_token, session.refresh_token);
  }

  res.status(200).json({ user });
}
