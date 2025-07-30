import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-dev'
);

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'No token' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);

    return NextResponse.json({
      id: payload.id,
      role: payload.role,
    });
  } catch (error) {
    console.error('JWT verification failed:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
