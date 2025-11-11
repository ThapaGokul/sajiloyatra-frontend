// /src/app/api/lodging-details/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lodgingId = searchParams.get('id');

    if (!lodgingId) {
      return NextResponse.json({ error: 'Lodging ID is required' }, { status: 400 });
    }

    // 1. Find the specific lodging
    const lodging = await prisma.lodging.findUnique({
      where: {
        id: parseInt(lodgingId),
      },
      // 2. Also "include" all of its related "rooms"
      include: {
        rooms: true, // This is the magic part
      },
    });

    if (!lodging) {
      return NextResponse.json({ error: 'Lodging not found' }, { status: 404 });
    }

    return NextResponse.json(lodging);
  } catch (error) {
    console.error("Failed to fetch lodging details:", error);
    return NextResponse.json({ error: 'Failed to fetch lodging details' }, { status: 500 });
  }
}