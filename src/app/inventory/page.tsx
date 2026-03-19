import styles from './page.module.css';
import { prisma } from '@/lib/prisma';
import { mockUnits } from '@/lib/mockData';

async function getInventoryData() {
  try {
    const units = await prisma.unit.findMany({ include: { project: true } });
    return units;
  } catch (error) {
    return mockUnits;
  }
}

export default async function InventoryPage() {
  const units = await getInventoryData();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Space & Inventory Database</h1>
      </div>
      <div className={styles.unitsGrid}>
        {units.map((unit: any) => {
          let statusClass = styles.statusAvailable;
          if (unit.status === 'Leased') statusClass = styles.statusLeased;
          if (unit.status.includes('Discussion') || unit.status === 'LOI Signed') statusClass = styles.statusDiscussion;

          return (
            <div key={unit.id} className={styles.unitCard}>
               <div className={`${styles.unitStatusIndicator} ${statusClass}`}></div>
               <div className={styles.unitTop}>
                 <div className={styles.unitId}>{unit.unitId}</div>
               </div>
               <div className={styles.projectName}>{unit.project?.name || 'Unknown Project'}</div>
               <div className={styles.unitDetail}>{unit.area.toLocaleString()} sqft • {unit.category}</div>
               <div className={styles.badge}>{unit.status}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
