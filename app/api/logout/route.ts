// pages/api/logout.ts
import { clearAuthCookies, supabase } from "@/app/utils/supabase/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { error } = await supabase.auth.signOut();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  clearAuthCookies(res);

  res.status(200).json({ message: "Logged out" });
}
