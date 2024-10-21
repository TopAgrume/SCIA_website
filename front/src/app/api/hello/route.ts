import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const newEntry = await prisma.helloWorld.create({
      data: {
        message: 'Hello, Prisma!',
      },
    });

    const allEntries = await prisma.helloWorld.findMany();

    return NextResponse.json({ newEntry, allEntries });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
