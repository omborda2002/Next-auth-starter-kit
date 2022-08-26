import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  let res = NextResponse.next();
  const session = await getToken({ req: req, secret: process.env.JWT_SECRET });

  // Get token and check if it exists
  let { value, options } = req.cookies.getWithOptions("Authorization");

  if (
    (req.cookies && req.cookies.get("Authorization") && value) ||
    session ||
    req.cookies.get("next-auth.session-token")
  ) {
    return res;
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: "/dashboard/:path*"
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};
