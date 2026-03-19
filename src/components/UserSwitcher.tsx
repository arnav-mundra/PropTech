'use client';
import { useState, useRef, useEffect } from 'react';
import styles from './UserSwitcher.module.css';

const ROLES = [
  { id: 'admin', name: 'Admin', users: ['Demo User', 'Super Admin'] },
  { id: 'director', name: 'Leasing Director', users: ['Jane Smith', 'Michael Ford'] },
  { id: 'manager', name: 'Leasing Manager', users: ['Bob Johnson', 'Sarah Jenkins'] },
  { id: 'analyst', name: 'Research Analyst', users: ['Alice Williams'] }
];

export default function UserSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRole, setActiveRole] = useState(ROLES[0]);
  const [activeUser, setActiveUser] = useState(ROLES[0].users[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.switcherContainer} ref={dropdownRef}>
      <div className={styles.activeProfile} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.userInfo}>
           <span className={styles.userName}>{activeUser}</span>
           <span className={styles.userRole}>{activeRole.name}</span>
        </div>
        <div className={styles.avatar}>
           {activeUser.charAt(0)}
        </div>
      </div>

      {isOpen && (
        <div className={styles.dropdownModal}>
          <div className={styles.dropdownHeader}>Switch User</div>
          <div className={styles.dropdownScroll}>
            {ROLES.map(role => (
              <div key={role.id} className={styles.roleGroup}>
                <div className={styles.roleTitle}>{role.name}</div>
                {role.users.map(u => (
                  <div 
                    key={u} 
                    className={`${styles.userOption} ${u === activeUser && role.id === activeRole.id ? styles.activeOption : ''}`}
                    onClick={() => {
                      setActiveRole(role);
                      setActiveUser(u);
                      setIsOpen(false);
                    }}
                  >
                    <div className={styles.smallAvatar}>{u.charAt(0)}</div>
                    {u}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
