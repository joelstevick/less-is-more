import { NextRequest, NextResponse } from "next/server";
import AuthService from '@/services/auth/auth-service';

export async function GET(request: NextRequest) {
  const authService = AuthService;
  const email = authService.getEmail(request);

  if (!email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  console.log('User Email:', email);
  return NextResponse.json({ email }, { status: 200 });
}
