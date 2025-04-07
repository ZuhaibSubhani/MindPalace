// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req:NextRequest) {
  // Extract token from cookies using getToken
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // List of protected routes
  const protectedRoutes = ["/dashboard", "/profile", "/admin"];

  // Check if the user is accessing a protected route
  if (protectedRoutes.some((path) => req.nextUrl.pathname.startsWith(path))) {
    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
