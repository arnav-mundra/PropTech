import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { mockBrands } from '@/lib/mockData';

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        requirements: true,
      }
    });
    return NextResponse.json(brands);
  } catch (error) {
    console.log("Database fetch failed (Brands), using mock data", error);
    return NextResponse.json(mockBrands);
  }
}
