import { NextResponse } from "next/server";

export async function middleware(req) {
  let res = NextResponse.next();

  // return early if url isn"t supposed to be protected
  if (!req.url.includes("/dashboard")) {
    return NextResponse.next();
  }

  // Get token and check if it exists
  let { value, options } = req.cookies.getWithOptions("Authorization");

  if (
    (req.cookies && req.cookies.get("Authorization") && value) ||
    req.cookies.get("next-auth.session-token") ||
    req.cookies.get("__Secure-next-auth.session-token")
  ) {
    return res;
  }

  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: "/dashboard/:path*"
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};
