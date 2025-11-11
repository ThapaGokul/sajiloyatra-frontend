// /src/app/api/guides/me/route.js
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    // 1. Get the logged-in user
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // 2. Find the one guide profile linked to this user
    const guideProfile = await prisma.localGuide.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!guideProfile) {
      // This is not an error, the user just isn't a host
      return NextResponse.json(null, { status: 200 });
    }

    return NextResponse.json(guideProfile, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch host profile:", error);
    return NextResponse.json({ error: 'Invalid token or server error' }, { status: 401 });
  }
}