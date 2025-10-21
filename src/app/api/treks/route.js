// [NODE.JS BACKEND LOGIC] /src/app/api/treks/route.js

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client'; // 1. Import the Prisma Client

const prisma = new PrismaClient(); // 2. Create an instance of the client

export async function GET(request) {
  // 3. Use Prisma to find all treks in the database
  //    This is an async operation, so we must 'await' it.
  const treks = await prisma.trek.findMany();

  // 4. Send the result from the database back as JSON
  return NextResponse.json(treks);
}