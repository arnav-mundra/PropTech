import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import UserSwitcher from "@/components/UserSwitcher";
import TopbarActions from "@/components/TopbarActions";
import PageTransition from "../components/PageTransition";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "ECHT Retail Leasing OS",
  description: "PropTech Leasing & Portfolio Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.appContainer}>
          <Sidebar />
          <main className={styles.mainContent}>
            <header className={styles.topbar}>
              <div className={styles.pageHeader}>PropTech Retail OS</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <TopbarActions />
                <UserSwitcher />
              </div>
            </header>
            <section className={styles.pageContent}>
              <PageTransition>
                 {children}
              </PageTransition>
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}
