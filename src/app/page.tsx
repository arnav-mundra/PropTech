import styles from './page.module.css';
import DashboardCharts from './DashboardCharts';

export default async function Dashboard() {
  // Normally fetch data here, but for MVP let's assume direct mock imports or use local API
  // to pre-render the dashboard cleanly
  return (
    <div>
      <h1 style={{ marginBottom: '24px', fontSize: '1.5rem', fontWeight: 600 }}>Executive Dashboard</h1>
      
      <div className={styles.dashboardGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Projects</div>
          <div className={styles.statValue}>2</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Total Leasable Area</div>
          <div className={styles.statValue}>570,000 sqft</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Vacancy Rate</div>
          <div className={styles.statValue}>33%</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Active Leads</div>
          <div className={styles.statValue}>1</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statTitle}>Deals Closed</div>
          <div className={styles.statValue}>1</div>
        </div>
      </div>

      <div className={styles.chartsContainer}>
        <DashboardCharts />
      </div>
    </div>
  );
}
