import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/feed",
  "/stories",
  "/post",
  "/profile",
  "/saved",
  "/messages",
  "/notifications",
  "/explore",
];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
