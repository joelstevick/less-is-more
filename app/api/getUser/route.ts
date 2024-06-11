import { NextResponse } from "next/server";
import AuthService from '@/services/auth/auth-service';

export async function GET() {
  const user = AuthService.user;

  return NextResponse.json({ user }, { status: 200 });
}
