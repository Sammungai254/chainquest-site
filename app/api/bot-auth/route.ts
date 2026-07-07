import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE = "bot_access";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: Request) {
  const { password } = await req.json();
  const expected = process.env.BOT_PASSWORD;

  if (!expected) {
    return NextResponse.json({ error: "BOT_PASSWORD not configured" }, { status: 500 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, expected, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: MAX_AGE,
    path: "/bot",
  });

  return NextResponse.json({ ok: true });
}
