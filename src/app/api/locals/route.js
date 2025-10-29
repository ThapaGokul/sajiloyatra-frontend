// /src/app/api/locals/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob'; // <-- Import Vercel Blob 'put'

const prisma = new PrismaClient();

// Your GET function is unchanged
export async function GET(request) {
  try {
    const guides = await prisma.localGuide.findMany({
      where: { type: "HOST" }
    });
    return NextResponse.json(guides);
  } catch (error) {
    console.error("Failed to fetch guides:", error);
    return NextResponse.json({ error: 'Failed to fetch local guides' }, { status: 500 });
  }
}

// --- THIS IS THE UPDATED POST FUNCTION ---
export async function POST(request) {
  try {
    // 1. We now read FormData instead of JSON
    const formData = await request.formData();
    
    // 2. Get the file and text fields from the FormData
    const file = formData.get('imageUrl');
    const name = formData.get('name');
    const location = formData.get('location');
    const specialty = formData.get('specialty');
    const bio = formData.get('bio');
    const type = formData.get('type');

    if (!file || !name || !location || !bio || !type || !specialty) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 3. Upload the file to Vercel Blob
    const blob = await put(file.name, file, {
      access: 'public',
    });

    // 4. Save the new blob.url to the database
    const newGuide = await prisma.localGuide.create({
      data: {
        name,
        location,
        bio,
        specialty,
        type,
        imageUrl: blob.url, // <-- We use the URL from Vercel
      },
    });

    return NextResponse.json(newGuide, { status: 201 });
  } catch (error) {
    console.error("Failed to create guide:", error);
    return NextResponse.json({ error: 'Failed to create new guide' }, { status: 500 });
  }
}