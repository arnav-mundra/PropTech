import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { mockDeals } from '@/lib/mockData';

export async function GET() {
  try {
    const deals = await prisma.deal.findMany({
      include: {
        brand: true,
        project: true,
        unit: true
      }
    });
    return NextResponse.json(deals);
  } catch (error) {
    console.log("Database fetch failed (Deals), using mock data", error);
    return NextResponse.json(mockDeals);
  }
}
