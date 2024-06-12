import { User } from "@supabase/supabase-js";
import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

class AuthService {
  private constructor() {
    console.log("AuthService.constructor()");
  }

  private static instance: AuthService | null = null;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }

    return this.instance;
  }

  public setEmail(req: NextRequest, res: NextResponse, email: string) {
    const cookie = serialize("user-email", email, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });
    res.headers.append("Set-Cookie", cookie);
  }
  public getEmail(request: NextRequest): string | null {
    const cookies = parse(request.headers.get("cookie") || "");
    const authToken =  JSON.parse(cookies["sb-iredqorsavrwzmvuyysd-auth-token"])

    return authToken.user.email || null;
  }
}

export default AuthService.getInstance();
