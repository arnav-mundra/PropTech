import { prisma } from '@/lib/prisma';
import { mockProjects } from '@/lib/mockData';
import PortfolioClient from './PortfolioClient';

async function getPortfolioData() {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    return mockProjects;
  }
}

export default async function PortfolioPage() {
  const projects = await getPortfolioData();
  return <PortfolioClient projects={projects} />;
}
