'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { FileText, Download, Sparkles, X } from 'lucide-react';

export default function EmailDrafterClient({ deals }: { deals: any[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [showDocs, setShowDocs] = useState<string | null>(null);
  const [showEmailModal, setShowEmailModal] = useState<string | null>(null); // deal id

  const handleDraft = async (deal: any) => {
    setLoadingId(deal.id);
    try {
      const res = await fetch('/api/ai/draft-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deal })
      });
      const data = await res.json();
      setDrafts(prev => ({ ...prev, [deal.id]: data.emailDraft }));
      setShowEmailModal(deal.id);
    } catch (e) {
      setDrafts(prev => ({ ...prev, [deal.id]: "Error: Could not generate draft." }));
      setShowEmailModal(deal.id);
    }
    setLoadingId(null);
  };

  const handleDraftChange = (dealId: string, value: string) => {
    setDrafts(prev => ({ ...prev, [dealId]: value }));
  };

  const handleSend = (dealId: string) => {
    alert("Email Mock Sent Successfully!");
    setDrafts(prev => {
        const next = {...prev};
        delete next[dealId];
        return next;
    });
    setShowEmailModal(null);
  }

  const activeEmailDeal = deals.find(d => d.id === showEmailModal);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Project / Unit</th>
            <th>Rent (Ann.)</th>
            <th>Lease Start</th>
            <th>Term</th>
            <th>Status</th>
            <th>Docs</th>
            <th>AI Assist</th>
          </tr>
        </thead>
        <tbody>
          {deals.length === 0 ? (
            <tr><td colSpan={8}>No finalized deals yet.</td></tr>
          ) : deals.map((deal) => (
            <tr key={deal.id}>
              <td style={{fontWeight: 600}}>{deal.brand?.name || 'Unknown'}</td>
              <td>{deal.project?.name} / {deal.unit?.unitId}</td>
              <td style={{fontVariantNumeric: 'tabular-nums'}}>${deal.rent.toLocaleString()}</td>
              <td>{new Date(deal.leaseStartDate).toLocaleDateString()}</td>
              <td>{deal.leaseTerm} mos</td>
              <td><span style={{color: '#10b981', fontWeight: 500}}>{deal.dealStatus}</span></td>
              <td>
                 <span 
                   style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)', fontWeight: 500}}
                   onClick={() => setShowDocs(deal.id)}
                 >
                   View Docs (2)
                 </span>
              </td>
              <td>
                <button 
                  className={styles.DraftBtn} 
                  onClick={() => handleDraft(deal)}
                  disabled={loadingId === deal.id}
                >
                  {loadingId === deal.id ? (
                    '✍️ Drafting...'
                  ) : (
                    <>
                      <Sparkles size={16} /> Draft Email
                    </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showDocs && (
        <div className={styles.modalOverlay} onClick={() => setShowDocs(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
             <div className={styles.modalHeader}>Deal Documents</div>
             <div className={styles.docList}>
                <div className={styles.docItem}>
                   <div className={styles.docItemLeft}>
                      <FileText size={24} className={styles.docIcon} />
                      <div>
                         <div className={styles.docName}>LOI_Signed_Contract.pdf</div>
                         <div className={styles.docSize}>1.2 MB</div>
                      </div>
                   </div>
                   <button className={styles.dlBtn}><Download size={16} /> Download</button>
                </div>
                <div className={styles.docItem}>
                   <div className={styles.docItemLeft}>
                      <FileText size={24} className={styles.docIcon} />
                      <div>
                         <div className={styles.docName}>Approved_Floor_Plan.pdf</div>
                         <div className={styles.docSize}>4.5 MB</div>
                      </div>
                   </div>
                   <button className={styles.dlBtn}><Download size={16} /> Download</button>
                </div>
             </div>
             <div className={styles.modalActions}>
                <button className={styles.closeBtn} onClick={() => setShowDocs(null)}>Close</button>
             </div>
          </div>
        </div>
      )}

      {showEmailModal && activeEmailDeal && (
        <div className={styles.modalOverlay} onClick={() => setShowEmailModal(null)}>
          <div className={styles.aiModalContent} onClick={e => e.stopPropagation()}>
             <div className={styles.aiModalHeader}>
                <div className={styles.aiTitle}>
                   <Sparkles size={20} className={styles.aiIcon} />
                   Draft Deal Email: {activeEmailDeal.brand?.name || 'Unknown'}
                </div>
                <button className={styles.iconBtn} onClick={() => setShowEmailModal(null)}>
                   <X size={20} />
                </button>
             </div>
             <div className={styles.aiModalBody}>
                <textarea 
                  className={styles.aiTextarea}
                  value={drafts[showEmailModal]}
                  onChange={(e) => handleDraftChange(showEmailModal, e.target.value)}
                />
             </div>
             <div className={styles.aiModalFooter}>
                <button className={styles.sendBtn} onClick={() => handleSend(showEmailModal)}>Send Email</button>
             </div>
          </div>
        </div>
      )}
    </>
  );
}
