import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-dev';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      console.log(err, 'salah');
    }
  }

  return NextResponse.next();
}
