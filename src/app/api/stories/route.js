// [NODE.JS BACKEND LOGIC] /src/app/api/stories/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Keep the initialization here, but be aware of potential connection pool warnings
const prisma = new PrismaClient();

export async function GET(request) {
  try {
    const stories = await prisma.story.findMany();
    // 🌟 OPTIONAL: Add this line to force dynamic rendering if Vercel still caches the data
    // You may not need this if you fixed the build command, but it's a useful fallback.
    // request.headers.get('x-forwarded-host'); 
    
    return NextResponse.json(stories);
  } catch (error) {
    console.error('Database Error in /api/stories:', error);
    
    // Return a 500 status to the client, preventing a vague crash/404
    return new NextResponse(JSON.stringify({ 
        message: 'Internal Server Error fetching stories.' 
    }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' } 
    });
  }
}