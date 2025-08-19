import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subBidang = searchParams.get('subBidang');

    if (!subBidang) {
      return NextResponse.json(
        { error: 'subBidang parameter is required' },
        { status: 400 }
      );
    }

    const kontraks = await prisma.kontrak.findMany({
      where: {
        subBidang: subBidang,
      },
      include: {
        vendor: true,
      },
    });

    return NextResponse.json(kontraks);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
