import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-dev';
const COOKIE_NAME = 'token';

const users = [
  {
    id: '1',
    name: 'Admin',
    email: 'admin@example.com',
    bidang: 'Manajemen',
    subBidang: 'Super Admin',
    passwordHash: bcrypt.hashSync('admin123', 10),
  },
  {
    id: '2',
    name: 'Guest',
    email: 'guest@example.com',
    bidang: 'Tamu',
    subBidang: 'Umum',
    passwordHash: bcrypt.hashSync('guest123', 10),
  },
  {
    id: '3',
    name: 'Radhofan',
    email: 'radhofanazizi@gmail.com',
    bidang: 'Bidang Perencanaan',
    subBidang: 'Bidang 1',
    passwordHash: bcrypt.hashSync('password', 10),
  },
  {
    id: '4',
    name: 'Radhofan',
    email: 'radhofanazizi@gmail.com',
    bidang: 'Bidang Perencanaan',
    subBidang: 'Bidang 1',
    passwordHash: bcrypt.hashSync('password', 10),
  },
];

/**
 * STEP 1: Parse email/password from request
 * STEP 2: Validate against users
 * STEP 3: Create token with userId + role
 * STEP 4: Set cookie
 * STEP 5: Return JSON response
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // STEP 1
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // STEP 2
    const user = users.find((u) => u.email === email);
    if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // STEP 3
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        bidang: user.bidang,
        subBidang: user.subBidang,
      },
      JWT_SECRET,
      {
        expiresIn: '7d',
      }
    );

    // STEP 4 & 5
    const response = NextResponse.json({
      message: 'Login successful',
      // user: { id: user.id, email: user.email, role: user.role },
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
