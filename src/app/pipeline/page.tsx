import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import { mockLeads } from '@/lib/mockData';
import PipelineBoard from "./PipelineBoard";

async function getLeadsData() {
  try {
    const leads = await prisma.lead.findMany({
      include: { brand: true, project: true, unit: true }
    });
    return leads;
  } catch (error) {
    return mockLeads;
  }
}

export default async function PipelinePage() {
  const leads = await getLeadsData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Leasing CRM Pipeline</h1>
      </div>
      <PipelineBoard leads={leads} />
    </div>
  );
}
