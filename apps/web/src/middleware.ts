import { NextRequest, NextResponse } from 'next/server';

// This middleware will handle admin authentication
export function middleware(request: NextRequest) {
  // Check if the path is for admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Check if the user is authenticated
    const adminAuthCookie = request.cookies.get('admin_auth');
    const isAuthenticated = adminAuthCookie?.value === 'true';
    
    // If not authenticated and not on the login page, redirect to login
    if (!isAuthenticated && !request.nextUrl.pathname.includes('/admin/login')) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
