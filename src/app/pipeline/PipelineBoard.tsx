'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

const STAGES = [
  "Lead Identified", 
  "Contact Made", 
  "Requirement Received", 
  "Space Shared", 
  "Site Visit", 
  "Negotiation", 
  "LOI", 
  "Lease Signed"
];

export default function PipelineBoard({ leads }: { leads: any[] }) {
  const [loadingAI, setLoadingAI] = useState<string | null>(null);
  const [strategies, setStrategies] = useState<Record<string, string[]>>({});

  const handleStrategy = async (lead: any) => {
    setLoadingAI(lead.id);
    try {
      const res = await fetch('/api/ai/deal-strategy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lead })
      });
      const data = await res.json();
      setStrategies(prev => ({ ...prev, [lead.id]: data.strategy }));
    } catch (e) {
      setStrategies(prev => ({ ...prev, [lead.id]: ["Failed to fetch strategy."] }));
    }
    setLoadingAI(null);
  };

  return (
    <div className={styles.board}>
      {STAGES.map(stage => {
        const stageLeads = leads.filter(l => l.stage === stage);
        return (
          <div key={stage} className={styles.column}>
            <div className={styles.columnHeader}>
              {stage} <span className={styles.columnCount}>{stageLeads.length}</span>
            </div>
            <div className={styles.cardsContainer}>
              {stageLeads.map(lead => (
                <div key={lead.id} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.brandName}>{lead.brand?.name || 'Unknown'}</div>
                  </div>
                  <div className={styles.projectName}>
                    {lead.project?.name} • Unit {lead.unit?.unitId || 'TBD'}
                  </div>
                  
                  <button 
                    className={styles.matchBtn} 
                    onClick={() => handleStrategy(lead)}
                    disabled={loadingAI === lead.id}
                  >
                    {loadingAI === lead.id ? '✨ Analyzing Deal...' : '✨ Get AI Strategy'}
                  </button>

                  {strategies[lead.id] && (
                    <div className={styles.strategyPanel}>
                      <div className={styles.strategyHeader}>✨ AI Recommended Next Steps:</div>
                      <ol className={styles.strategyList}>
                        {strategies[lead.id].map((step, idx) => (
                          <li key={idx}>{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
}
