// app/api/auth/login/route.ts
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { signToken, setAuthCookie } from '@/lib/auth';

const prisma = new PrismaClient();

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const { email, password } = await req.json();

    // if (!email || !password) {
    //   return NextResponse.json(
    //     { error: 'Email and password are required' },
    //     { status: 400 }
    //   );
    // }

    // STEP 1: find user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // STEP 2: create JWT token
    const token = signToken({
      id: user.id,
      name: user.name,
      email: user.email,
      bidang: user.bidang,
      subBidang: user.subBidang || '',
    });

    // STEP 3 & 4: set cookie and return response
    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        bidang: user.bidang,
        subBidang: user.subBidang,
      },
    });

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
