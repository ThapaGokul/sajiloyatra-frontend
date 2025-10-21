// [NODE.JS BACKEND LOGIC] /src/app/api/stories/route.js
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  const stories = await prisma.story.findMany();
  return NextResponse.json(stories);
}