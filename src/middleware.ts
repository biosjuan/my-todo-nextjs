import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  try {
    const publicRoute = request.nextUrl.pathname === '/login';
    const fakeToken = request.cookies.get('token');
    console.log(fakeToken);
    // if (publicRoute && fakeToken) {
    //   return NextResponse.redirect(new URL('/', request.url));
    // }
    if (!publicRoute && !fakeToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    NextResponse.next();
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export const config = {
  matcher: ['/login', '/register', '/', '/client_home'],
};
