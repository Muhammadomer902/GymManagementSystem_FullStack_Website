import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/login" ||
    path === "/register" ||
    path === "/" ||
    path.startsWith("/api/auth") ||
    path.startsWith("/_next") ||
    path.includes("/favicon.ico");

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || "";

  // If the path is not public and there's no token, redirect to login
  if (!isPublicPath && !token) {
    // Redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the user is authenticated and trying to access login/register page, redirect to dashboard
  if ((path === "/login" || path === "/register") && token) {
    // Try to determine user role from token
    // For this demo, we'll redirect to user dashboard by default
    const isUserPath = path.startsWith("/user");
    const isTrainerPath = path.startsWith("/trainer");
    const isAdminPath = path.startsWith("/admin");

    if (isUserPath) {
      return NextResponse.redirect(new URL("/user/workout-plan", request.url));
    } else if (isTrainerPath) {
      return NextResponse.redirect(new URL("/trainer/dashboard", request.url));
    } else if (isAdminPath) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    } else {
      // Default redirect to user dashboard
      return NextResponse.redirect(new URL("/user/workout-plan", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which paths should trigger this middleware
export const config = {
  matcher: [
    // Match all request paths except for static files and images
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
