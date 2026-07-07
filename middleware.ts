import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "bot_access";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only guard /bot routes — skip the login page itself and the auth API
  if (
    pathname.startsWith("/bot") &&
    pathname !== "/bot/login" &&
    !pathname.startsWith("/api/bot-auth")
  ) {
    const token = request.cookies.get(COOKIE)?.value;
    const expected = process.env.BOT_PASSWORD;

    if (!expected || token !== expected) {
      const loginUrl = new URL("/bot/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bot/:path*"],
};
