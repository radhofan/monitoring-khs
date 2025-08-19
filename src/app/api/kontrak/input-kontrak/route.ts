import { NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body: Prisma.KontrakCreateInput = await request.json();

    const kontrak = await prisma.kontrak.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(kontrak, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
