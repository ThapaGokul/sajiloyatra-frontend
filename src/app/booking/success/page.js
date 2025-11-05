// /src/app/booking/success/page.js
import { redirect } from 'next/navigation';
import { PrismaClient } from '@prisma/client';
import { Resend } from 'resend';
import Link from 'next/link';
import styles from './BookingStatus.module.css'; // We'll create this

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

// This is the server-side function to confirm the payment
async function confirmPayment(searchParams) {
  const paymentKey = searchParams.get('paymentKey');
  const orderId = searchParams.get('orderId');
  const amount = searchParams.get('amount');

  if (!paymentKey || !orderId || !amount) {
    throw new Error('Missing payment information');
  }

  // 1. CONFIRM PAYMENT WITH TOSS
  // We send our Secret Key to Toss to confirm the payment is real
  const secretKey = process.env.TOSS_SECRET_KEY;
  const basicToken = Buffer.from(`${secretKey}:`).toString('base64');
  
  const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basicToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      paymentKey,
      orderId,
      amount: Number(amount),
    }),
  });

  const paymentData = await response.json();

  if (!response.ok) {
    // If Toss returns an error, fail the payment
    console.error("Toss Payment Error:", paymentData);
    throw new Error(paymentData.message || 'Payment failed');
  }

  // 2. PAYMENT CONFIRMED! NOW GET BOOKING DATA
  // The 'orderName' has our data, e.g., "Lodging Name - Guest Name"
  // In a real app, we would have saved this in our DB with the orderId
  // For this project, we'll assume the payment was for the "Sajilo Yatra"
  // and send a generic email.
  
  // A real-world app would find the pending booking using the 'orderId'
  // and mark it as 'PAID'. For now, we'll just send an email.

  // 3. SEND CONFIRMATION EMAIL
  try {
    await resend.emails.send({
      from: 'Sajilo Yatra <booking@sajiloyatra.me>', // Use your verified domain
      to: paymentData.customerEmail || 'test@example.com', // Use email from Toss
      subject: 'Your Sajilo Yatra Booking is Confirmed!',
      html: `
        <h1>Booking Confirmed!</h1>
        <p>Thank you for your payment.</p>
        <p>Your booking for <strong>${paymentData.orderName}</strong> is confirmed.</p>
        <p>Total Amount: ${paymentData.totalAmount} ${paymentData.currency}</p>
      `
    });
  } catch (emailError) {
    console.error("Email failed to send:", emailError);
    // Don't fail the whole transaction if email fails, just log it
  }

  // Return the successful payment data to the page
  return paymentData;
}

// This is the React Page Component
export default async function BookingSuccessPage({ searchParams }) {
  let paymentData;
  let errorMessage;

  try {
    paymentData = await confirmPayment(searchParams);
  } catch (error) {
    errorMessage = error.message;
  }

  if (errorMessage) {
    // If anything went wrong, show the error
    return (
      <div className={styles.container}>
        <h1 className={styles.titleError}>Payment Confirmation Failed</h1>
        <p>{errorMessage}</p>
        <Link href="/" className={styles.button}>
          Go to Homepage
        </Link>
      </div>
    );
  }

  // If successful, show the success message
  return (
    <div className={styles.container}>
      <h1 className={styles.titleSuccess}>Payment Successful!</h1>
      <p>Thank you, {paymentData.customerName}! Your booking is confirmed.</p>
      <p>A confirmation has been sent to {paymentData.customerEmail}.</p>
      <div className={styles.summary}>
        <p><strong>Order:</strong> {paymentData.orderName}</p>
        <p><strong>Amount:</strong> {paymentData.totalAmount.toLocaleString()} {paymentData.currency}</p>
        <p><strong>Payment Method:</strong> {paymentData.method}</p>
      </div>
      <Link href="/" className={styles.button}>
        Back to Home
      </Link>
    </div>
  );
}