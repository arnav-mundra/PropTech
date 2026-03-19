import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockRequirements } from '@/lib/mockData';

export async function GET() {
  try {
    const reqs = await prisma.requirement.findMany({
      include: { brand: true }
    });
    return NextResponse.json(reqs);
  } catch (error) {
    console.log("Database fetch failed (Requirements), using mock data", error);
    return NextResponse.json(mockRequirements);
  }
}
