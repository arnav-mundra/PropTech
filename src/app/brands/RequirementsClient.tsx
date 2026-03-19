'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { Sparkles, X } from 'lucide-react';

export default function RequirementsClient({ requirements, availableUnits }: { requirements: any[], availableUnits: any[] }) {
  const [loadingReq, setLoadingReq] = useState<string | null>(null);
  const [aiResults, setAiResults] = useState<Record<string, any>>({});
  const [showAiModal, setShowAiModal] = useState<string | null>(null); // req id
  const [markdownBody, setMarkdownBody] = useState<Record<string, string>>({});

  const handleMatch = async (req: any) => {
    setLoadingReq(req.id);
    try {
      const res = await fetch('/api/ai/match-space', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requirement: req, units: availableUnits })
      });
      const data = await res.json();
      setAiResults(prev => ({ ...prev, [req.id]: data.recommendations }));
      
      // Formatting pseudo-markdown to perfectly match the screenshot structure exactly
      const text = `Hello, I have analyzed your current inventory against **${req.brand.name}'s** specific requirements for their expansion. ${req.brand.name} is a global brand that requires significant floor plates, high footfall, and premium positioning.

While the current inventory does not offer a perfect match, the following two units represent the best strategic fits based on environment and footprint potential:

### **Top 2 Leasing Recommendations for ${req.brand.name}**

${data.recommendations.map((rec:any, i:number) => `#### **${i+1}. ${rec.unitId}**
* **Size:** ${availableUnits.find((u:any) => u.unitId === rec.unitId)?.area || 'Unknown'} sqft
* **Persuasive Reason:** ${rec.reasoning}
`).join('\n')}`;

      setMarkdownBody(prev => ({ ...prev, [req.id]: text }));
      setShowAiModal(req.id);
    } catch (e) {
      console.error(e);
      setAiResults(prev => ({ ...prev, [req.id]: [{ unitId: 'Error', reasoning: 'Failed to fetch AI recommendations.' }] }));
      setShowAiModal(req.id);
    }
    setLoadingReq(null);
  };

  const activeReq = requirements.find(r => r.id === showAiModal);

  // Helper to securely parse bold markdown for the UI component
  const formatMarkdownToJSX = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('### ')) return <h3 key={i} style={{marginTop: '24px', fontSize: '1.1rem', fontWeight: 700}}>{line.replace('### ', '').split('**').map((s: string, idx: number) => idx % 2 === 1 ? <strong key={idx}>{s}</strong> : s)}</h3>;
      if (line.startsWith('#### ')) return <h4 key={i} style={{marginTop: '16px', fontSize: '1rem', fontWeight: 600}}>{line.replace('#### ', '').split('**').map((s: string, idx: number) => idx % 2 === 1 ? <strong key={idx}>{s}</strong> : s)}</h4>;
      if (line.startsWith('* ')) return <li key={i} style={{marginLeft: '20px', marginBottom: '4px'}}>{line.replace('* ', '').split('**').map((s: string, idx: number) => idx % 2 === 1 ? <strong key={idx}>{s}</strong> : s)}</li>;
      
      const parts = line.split('**');
      return (
        <p key={i} style={{marginBottom: '16px'}}>
          {parts.map((part, index) => index % 2 === 1 ? <strong key={index}>{part}</strong> : part)}
        </p>
      );
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Brand</th>
            <th>City</th>
            <th>Area Req</th>
            <th>Type</th>
            <th>Budget</th>
            <th>Status</th>
            <th>AI Action</th>
          </tr>
        </thead>
        <tbody>
          {requirements.map((req: any) => (
            <tr key={req.id}>
              <td style={{fontWeight: 600}}>{req.brand?.name || 'Unknown'}</td>
              <td>{req.city}</td>
              <td>{req.areaRequired}</td>
              <td>{req.preferredProjectType}</td>
              <td>{req.budgetRange}</td>
              <td>{req.status}</td>
              <td>
                <button 
                  className={styles.matchBtn} 
                  onClick={() => handleMatch(req)}
                  disabled={loadingReq === req.id}
                >
                  {loadingReq === req.id ? (
                     '✨ Matching...'
                  ) : (
                     <>
                        <Sparkles size={16} /> Match Spaces
                     </>
                  )}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showAiModal && activeReq && (
        <div className={styles.modalOverlay} onClick={() => setShowAiModal(null)}>
          <div className={styles.aiModalContent} onClick={e => e.stopPropagation()}>
             <div className={styles.aiModalHeader}>
                <div className={styles.aiTitle}>
                   <Sparkles size={20} className={styles.aiIcon} />
                   AI Space Matcher: {activeReq.brand?.name || 'Unknown'}
                </div>
                <button className={styles.iconBtn} onClick={() => setShowAiModal(null)}>
                   <X size={20} />
                </button>
             </div>
             <div className={styles.aiModalBody}>
                {markdownBody[showAiModal] ? formatMarkdownToJSX(markdownBody[showAiModal]) : 'Generating format...'}
             </div>
          </div>
        </div>
      )}
    </>
  );
}
