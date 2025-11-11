// /src/app/api/bookings/me/route.js
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

    // 2. Find all bookings for that user
    const bookings = await prisma.booking.findMany({
      where: {
        userId: userId,
      },
      include: {
        lodging: true, // Also include the lodging details for each booking
      },
      orderBy: {
        checkIn: 'desc', // Show newest bookings first
      },
    });

    return NextResponse.json(bookings, { status: 200 });

  } catch (error) {
    console.error("Failed to fetch bookings:", error);
    return NextResponse.json({ error: 'Invalid token or server error' }, { status: 401 });
  }
}