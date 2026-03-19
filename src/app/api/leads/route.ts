import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';
import { mockLeads } from '@/lib/mockData';

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        brand: true,
        project: true,
        unit: true
      }
    });
    return NextResponse.json(leads);
  } catch (error) {
    console.log("Database fetch failed (Leads), using mock data", error);
    return NextResponse.json(mockLeads);
  }
}
