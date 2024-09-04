import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/', '/admin/event/1'];

export default async function middleware(req: NextRequest) {
  const cookies = req.headers.get('cookie') || '';

  console.log('Middleware called for path:', req.nextUrl.pathname);
  let isAuthenticated = false;
  // Example of making an HTTP request to the API service
  try {
    const response = await fetch(`http://server:3001/api/auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: cookies, // Forward cookies
      },
      credentials: 'include', // Ensure cookies are included in the request
    });

    if (!response.ok) {
      console.log('User is not authenticated');
      isAuthenticated = false;
    } else {
      isAuthenticated = true;
      console.log('User is authenticated');
    }
  } catch (error) {
    isAuthenticated = false;
    console.error('Error fetching data:', error);
  }

  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    console.log('Redirecting to /auth/login');
    const absoluteUrl = new URL('/auth/login', req.nextUrl.origin);
    return NextResponse.redirect(absoluteUrl.toString());
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/admin/:path*'],
};
