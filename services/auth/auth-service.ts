import { User } from "@supabase/supabase-js";
import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";

class AuthService {
  private constructor() {
    console.log("AuthService.constructor()")
  }

  private static instance: AuthService | null = null;
  public user: User | null = null

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  public setEmail(req: NextApiRequest, res: NextApiResponse, email: string) {
    const cookie = serialize('user-email', email, {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    res.setHeader('Set-Cookie', cookie);
  }
  public getEmail(request: NextRequest): string | null {
    const cookies = parse(request.headers.get('cookie') || '');
    return cookies['user-email'] || null;
  }
}

export default AuthService.getInstance();

