import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

  const vendor = await prisma.vendor.findUnique({
    where: { key: id },
    include: { kontraks: true },
  });

  if (!vendor)
    return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });

  return NextResponse.json(vendor);
}
