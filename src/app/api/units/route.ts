import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockUnits } from '@/lib/mockData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const projectId = searchParams.get('projectId');
  
  try {
    const units = await prisma.unit.findMany({
      where: projectId ? { projectId } : undefined,
      include: {
        project: true
      }
    });
    return NextResponse.json(units);
  } catch (error) {
    console.log("Database fetch failed (Units), using mock data", error);
    let units = mockUnits;
    if (projectId) {
       units = units.filter(u => u.projectId === projectId);
    }
    return NextResponse.json(units);
  }
}
