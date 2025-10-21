// /src/app/api/book/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();

const resendApiKey = process.env.RESEND_API_KEY;

// 2. Add a check to ensure the key exists before initializing
if (!resendApiKey) {
    // This should ideally never happen in production, but guards against build-time failures
    console.error("RESEND_API_KEY is not set.");
    // Return a dummy object or throw a descriptive error if you must
    // but the next step is usually enough.
}

const resend = new Resend(resendApiKey);

export async function POST(request) {
  try {
    const body = await request.json();
    const { lodgingId, checkIn, checkOut, guestName, guestEmail } = body;


    // Basic validation
    if (!lodgingId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert string dates from JSON into Date objects for Prisma
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);

    if (checkOutDate <= checkInDate) {
      return NextResponse.json({ error: 'Check-out date must be after check-in date' }, { status: 400 });
    }

    const lodging = await prisma.lodging.findUnique({
      where: { id: parseInt(lodgingId) },
      select: { name: true }
    });

    if (!lodging) {
      return NextResponse.json({ error: 'Lodging not found' }, { status: 404 });
    }

    const booking = await prisma.booking.create({
      data: {
        lodgingId: parseInt(lodgingId),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guestName: guestName,
        guestEmail: guestEmail,
      },
    });
  try {
      await resend.emails.send({
        // This is the line we changed for testing
        from: 'onboarding@resend.dev', 
        to: guestEmail,
        subject: 'Your Sajilo Yatra Booking is Confirmed!',
        html: `
          <h1>Booking Confirmed! (Test)</h1>
          <p>Hi ${guestName},</p>
          <p>Your booking at <strong>${lodging.name}</strong> is confirmed.</p>
          <ul>
            <li>Check-in: ${checkInDate.toDateString()}</li>
            <li>Check-out: ${checkOutDate.toDateString()}</li>
          </ul>
          <p>Thank you for booking with Sajilo Yatra!</p>
        `
      });
    } catch (emailError) {
      // If the email fails, we still want to tell the user
      // the booking was successful. We just log the email error.
      console.error("Email failed to send:", emailError);
    }

    // --- 5. Return Success Response ---
    // This goes back to the booking widget
    return NextResponse.json(booking, { status: 201 });

  } catch (error) {
    console.error('Booking failed:', error);
    return NextResponse.json({ error: 'An error occurred while creating the booking.' }, { status: 500 });
  }
}