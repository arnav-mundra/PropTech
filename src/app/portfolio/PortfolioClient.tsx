'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function PortfolioClient({ projects }: { projects: any[] }) {
  const [showModal, setShowModal] = useState(false);
  const [localProjects, setLocalProjects] = useState(projects);
  const [form, setForm] = useState({ name: '', city: '', type: 'Mall' });

  const handleCreate = () => {
    if (!form.name) return;
    const newProject = {
      id: 'mock_new_' + Date.now(),
      name: form.name,
      city: form.city,
      projectType: form.type,
      totalArea: 0,
      completionStatus: 'Planned'
    };
    setLocalProjects([...localProjects, newProject]);
    setShowModal(false);
    setForm({ name: '', city: '', type: 'Mall' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Real Estate Portfolio</h1>
        <button className={styles.newButton} onClick={() => setShowModal(true)}>+ New Project</button>
      </div>

      <div className={styles.projectsList}>
        {localProjects.map(project => (
           <div key={project.id} className={styles.projectCard}>
             <div className={styles.projectHeader}>
                <div>
                   <div className={styles.projectName}>{project.name}</div>
                   <div className={styles.projectMeta}>
                      <span>{project.city}</span> | 
                      <span>{project.projectType}</span> | 
                      <span>{project.totalArea.toLocaleString()} sqft</span>
                   </div>
                </div>
                <div className={styles.badge}>{project.completionStatus}</div>
             </div>
           </div>
        ))}
        {localProjects.length === 0 && <div>No projects found.</div>}
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>Create New Project</div>
            <div className={styles.modalBody}>
               <input 
                 className={styles.input} 
                 placeholder="Project Name" 
                 value={form.name}
                 onChange={(e) => setForm({...form, name: e.target.value})}
               />
               <input 
                 className={styles.input} 
                 placeholder="City" 
                 value={form.city}
                 onChange={(e) => setForm({...form, city: e.target.value})}
               />
               <select 
                 className={styles.input}
                 value={form.type}
                 onChange={(e) => setForm({...form, type: e.target.value})}
               >
                 <option value="Mall">Mall</option>
                 <option value="High Street">High Street</option>
                 <option value="Mixed Use">Mixed Use</option>
                 <option value="Waterfront">Waterfront</option>
               </select>
            </div>
            <div className={styles.modalFooter}>
               <button className={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
               <button className={styles.saveBtn} onClick={handleCreate}>Create Project</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
