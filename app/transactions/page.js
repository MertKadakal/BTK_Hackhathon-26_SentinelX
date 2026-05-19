'use client';
import { useState } from 'react';
import { mockTransactions, getStatusColor, getStatusIcon } from '@/data/mock-transactions';
import styles from './page.module.css';

export default function TransactionsPage() {
  const [filter, setFilter] = useState('all');
  
  const filtered = filter === 'all' ? mockTransactions : mockTransactions.filter(t => t.status === filter);
  const sorted = [...filtered].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>💳 İşlem Monitörü</h1>
        <p className={styles.subtitle}>Tüm finansal işlemlerinizin gerçek zamanlı takibi ve AI analiz sonuçları</p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        {[
          { key: 'all', label: 'Tümü', count: mockTransactions.length },
          { key: 'approved', label: '✅ Onaylı', count: mockTransactions.filter(t => t.status === 'approved').length },
          { key: 'warning', label: '⚠️ Uyarılı', count: mockTransactions.filter(t => t.status === 'warning').length },
          { key: 'blocked', label: '🛑 Engelli', count: mockTransactions.filter(t => t.status === 'blocked').length },
        ].map(f => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${filter === f.key ? styles.filterActive : ''}`}
            onClick={() => setFilter(f.key)}
          >
            {f.label} <span className={styles.filterCount}>{f.count}</span>
          </button>
        ))}
      </div>

      {/* Transaction List */}
      <div className={styles.txnList}>
        {sorted.map((txn, i) => (
          <div key={txn.id} className={`glass-card ${styles.txnCard}`} style={{ animationDelay: `${i * 0.03}s` }}>
            <div className={styles.txnMain}>
              <div className={styles.txnLeft}>
                <div className={styles.txnIcon} style={{ 
                  background: txn.status === 'blocked' ? 'rgba(255,59,92,0.1)' : 
                              txn.status === 'warning' ? 'rgba(255,179,0,0.1)' : 'rgba(0,230,118,0.06)'
                }}>
                  {txn.icon}
                </div>
                <div className={styles.txnInfo}>
                  <span className={styles.txnMerchant}>{txn.merchant}</span>
                  <span className={styles.txnMeta}>
                    {txn.typeLabel} • {formatDate(txn.timestamp)}
                    {txn.location && ` • ${txn.location.city}, ${txn.location.country}`}
                  </span>
                </div>
              </div>
              <div className={styles.txnRight}>
                <span className={styles.txnAmount} style={{ 
                  color: txn.status === 'blocked' ? '#FF3B5C' : '#fff',
                  textDecoration: txn.status === 'blocked' ? 'line-through' : 'none'
                }}>
                  ₺{txn.amount.toLocaleString('tr-TR')}
                </span>
                <span className={`badge badge-${txn.status === 'approved' ? 'safe' : txn.status === 'warning' ? 'warning' : 'danger'}`}>
                  {getStatusIcon(txn.status)} {txn.statusLabel}
                </span>
              </div>
            </div>

            {/* AI Notes */}
            <div className={styles.aiNotes}>
              <span className={styles.aiLabel}>🤖 AI Analizi:</span>
              <span className={styles.aiText}>{txn.aiNotes}</span>
            </div>

            {/* Risk & Score indicators */}
            <div className={styles.txnFooter}>
              {txn.siteScore !== null && txn.siteScore !== undefined && (
                <div className={styles.indicator}>
                  <span className={styles.indicatorLabel}>Site Skoru</span>
                  <span className={styles.indicatorValue} style={{ color: txn.siteScore >= 80 ? '#00E676' : txn.siteScore >= 50 ? '#FFB300' : '#FF3B5C' }}>
                    {txn.siteScore}/100
                  </span>
                </div>
              )}
              <div className={styles.indicator}>
                <span className={styles.indicatorLabel}>Risk</span>
                <span className={styles.indicatorValue} style={{ color: txn.riskScore >= 70 ? '#FF3B5C' : txn.riskScore >= 30 ? '#FFB300' : '#00E676' }}>
                  {txn.riskScore}/100
                </span>
              </div>
              {txn.threeDSecure !== null && txn.threeDSecure !== undefined && (
                <div className={styles.indicator}>
                  <span className={styles.indicatorLabel}>3D Secure</span>
                  <span className={`badge ${txn.threeDSecure ? 'badge-safe' : 'badge-danger'}`} style={{ fontSize: '0.6rem' }}>
                    {txn.threeDSecure ? 'Aktif' : 'Yok'}
                  </span>
                </div>
              )}
              {txn.cardLast4 && (
                <div className={styles.indicator}>
                  <span className={styles.indicatorLabel}>Kart</span>
                  <span className={styles.indicatorValue}>•••• {txn.cardLast4}</span>
                </div>
              )}
              {txn.iban && (
                <div className={styles.indicator}>
                  <span className={styles.indicatorLabel}>IBAN</span>
                  <span className={styles.indicatorValue} style={{ fontSize: '0.65rem' }}>{txn.iban.slice(0, 12)}...</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
