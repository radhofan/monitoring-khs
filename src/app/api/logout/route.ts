import { NextResponse } from 'next/server';

const COOKIE_NAME = 'token';

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ message: 'Logout successful' });

  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });

  return response;
}
