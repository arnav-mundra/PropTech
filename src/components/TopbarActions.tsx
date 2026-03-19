'use client';
import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import styles from './TopbarActions.module.css';

export default function TopbarActions() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const alerts = [
    { id: 1, text: "Lumina Cafe is actively scouting new spaces", time: "10m ago" },
    { id: 2, text: "New LOI document uploaded for Velocity Sports", time: "1h ago" },
    { id: 3, text: "Vacancy detected in Aura Waterfront Mall - Level 1", time: "2h ago" }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.bellIcon} onClick={() => setOpen(!open)}>
        <Bell size={20} strokeWidth={2} />
        <span className={styles.badge}>3</span>
      </div>
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.header}>Notifications & Alerts</div>
          <div className={styles.list}>
            {alerts.map(a => (
              <div key={a.id} className={styles.alertItem}>
                <div className={styles.dot} />
                <div>
                  <div className={styles.text}>{a.text}</div>
                  <div className={styles.time}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
