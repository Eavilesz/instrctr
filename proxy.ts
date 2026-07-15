import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/app/_lib/session";

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }

  const authenticated = await verifySession();
  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
