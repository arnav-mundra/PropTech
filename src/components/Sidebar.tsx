'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, Grid3x3, Store, GitMerge, FileText } from 'lucide-react';
import styles from './Sidebar.module.css';

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Portfolio', path: '/portfolio', icon: FolderKanban },
  { name: 'Space Inventory', path: '/inventory', icon: Grid3x3 },
  { name: 'Brand Database', path: '/brands', icon: Store },
  { name: 'Leasing Pipeline', path: '/pipeline', icon: GitMerge },
  { name: 'Deal Tracker', path: '/deals', icon: FileText },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoTextContainer}>
          <div className={styles.logoMain}>
            <span style={{ color: '#fff' }}>ECHT</span>
            <span style={{ color: '#f59e0b' }}>Advisory</span>
          </div>
          <div className={styles.logoSub}>LEASING OS</div>
        </div>
      </div>
      
      <div className={styles.nav}>
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const IconComponent = item.icon;
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
            >
              <IconComponent size={18} className={styles.navIcon} />
              {item.name}
            </Link>
          );
        })}
      </div>
      
      <div className={styles.sidebarFooter}>
        © 2026 ECHT Advisory<br />PropTech Platform MVP v2.0
      </div>
    </nav>
  );
}
