// /src/app/api/book/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    // 'paymentId' is new
    const { lodgingId, checkIn, checkOut, guestName, guestEmail, paymentId } = body;

    if (!lodgingId || !checkIn || !checkOut || !guestName || !guestEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const lodging = await prisma.lodging.findUnique({
      where: { id: parseInt(lodgingId) },
      select: { name: true }
    });

    if (!lodging) {
      return NextResponse.json({ error: 'Lodging not found' }, { status: 404 });
    }
    
    // Save the booking *with* the paymentId
    const booking = await prisma.booking.create({
      data: {
        lodgingId: parseInt(lodgingId),
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guestName: guestName,
        guestEmail: guestEmail,
        paymentId: paymentId, // <-- ADD THIS
      },
    });

    // Send the confirmation email
    try {
      await resend.emails.send({
        from: 'Sajilo Yatra <booking@sajiloyatra.me>', // Your verified domain
        to: guestEmail,
        subject: 'Your Sajilo Yatra Booking is Confirmed!',
        html: `
          <h1>Booking Confirmed!</h1>
          <p>Hi ${guestName},</p>
          <p>Your booking at <strong>${lodging.name}</strong> is confirmed.</p>
          <ul>
            <li>Check-in: ${checkInDate.toDateString()}</li>
            <li>Check-out: ${checkOutDate.toDateString()}</li>
            <li>Payment ID: ${paymentId}</li>
          </ul>
        `
      });
    } catch (emailError) {
      console.error("Email failed to send:", emailError);
    }

    return NextResponse.json(booking, { status: 201 });

  } catch (error) {
    console.error('Booking API Error:', error);
    return NextResponse.json({ error: 'An error occurred while creating the booking.' }, { status: 500 });
  }
}