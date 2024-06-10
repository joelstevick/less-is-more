import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    const cookieStore = cookies();
    cookieStore.set(
      `sb-${process.env.NEXT_PUBLIC_PROJECT_ID}-auth-token`,
      "",
      {}
    );

    return NextResponse.json({
      message: "Logged out successfully",
      status: 200,
    });
  }
}
