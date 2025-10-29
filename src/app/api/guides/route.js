// /src/app/api/guides/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // This time, we only find guides with the type "PROFESSIONAL"
    const guides = await prisma.localGuide.findMany({
      where: {
        type: "PROFESSIONAL"
      }
    });
    return NextResponse.json(guides);
  } catch (error) {
    console.error("Failed to fetch guides:", error);
    return NextResponse.json({ error: 'Failed to fetch professional guides' }, { status: 500 });
  }
}