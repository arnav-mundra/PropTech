import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mockProjects } from '@/lib/mockData';

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        units: true,
      }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.log("Database fetch failed (Projects), using mock data", error);
    return NextResponse.json(mockProjects);
  }
}
