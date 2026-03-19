import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import { mockDeals } from '@/lib/mockData';
import EmailDrafterClient from "./EmailDrafterClient";

async function getDeals() {
  try {
    const deals = await prisma.deal.findMany({
      include: { brand: true, project: true, unit: true, documents: true }
    });
    return deals;
  } catch (error) {
    return mockDeals;
  }
}

export default async function DealsPage() {
  const deals = await getDeals();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Deal Management & Tracker</h1>

      <div className={styles.tableCard}>
        <EmailDrafterClient deals={deals} />
      </div>
    </div>
  );
}
