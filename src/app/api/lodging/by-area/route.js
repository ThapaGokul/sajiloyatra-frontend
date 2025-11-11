// /src/app/api/lodging/by-area/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const area = searchParams.get('area');

    if (!area) {
      return NextResponse.json({ error: 'Area parameter is required' }, { status: 400 });
    }

    // This finds all lodgings where the 'area' field
    // exactly matches the destination's 'name'
    const lodgings = await prisma.lodging.findMany({
      where: {
        area: area,
      },
    });

    return NextResponse.json(lodgings);
  } catch (error) {
    console.error("Failed to fetch lodgings by area:", error);
    return NextResponse.json({ error: 'Failed to fetch lodgings' }, { status: 500 });
  }
}