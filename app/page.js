'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import SecurityGauge from '@/components/SecurityGauge';
import { mockTransactions, getStatusColor, getStatusIcon } from '@/data/mock-transactions';
import { mockSites } from '@/data/mock-sites';
import { learningMetrics, hourlyActivity, spendingCategories, weeklyTrend } from '@/data/mock-user-habits';
import styles from './page.module.css';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const approvedTxns = mockTransactions.filter(t => t.status === 'approved');
  const blockedTxns = mockTransactions.filter(t => t.status === 'blocked');
  const warningTxns = mockTransactions.filter(t => t.status === 'warning');
  const recentTxns = [...mockTransactions].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 6);
  const dangerSites = mockSites.filter(s => s.status === 'danger');
  
  const totalAmount = mockTransactions.reduce((sum, t) => sum + t.amount, 0);
  const blockedAmount = blockedTxns.reduce((sum, t) => sum + t.amount, 0);

  // Hourly activity for mini chart
  const maxHourlyCount = Math.max(...hourlyActivity.map(h => h.count));

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Gösterge Paneli</h1>
          <p className={styles.subtitle}>Finansal güvenlik durumunuzun anlık özeti</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/scanner" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            🔍 Site Tara
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`${styles.statsGrid} stagger`}>
        <div className={`glass-card stat-card ${styles.statItem} animate-fade-in-up`}>
          <div className="stat-icon" style={{ background: 'rgba(0, 212, 255, 0.1)', color: '#00D4FF' }}>🛡️</div>
          <div className="stat-value gradient-text">{learningMetrics.accuracy}%</div>
          <div className="stat-label">AI Doğruluk Oranı</div>
          <div className="stat-change" style={{ color: '#00E676' }}>↑ 2.1% bu hafta</div>
        </div>
        
        <div className={`glass-card stat-card ${styles.statItem} animate-fade-in-up`}>
          <div className="stat-icon" style={{ background: 'rgba(255, 59, 92, 0.1)', color: '#FF3B5C' }}>🚫</div>
          <div className="stat-value" style={{ color: '#FF3B5C' }}>{blockedTxns.length}</div>
          <div className="stat-label">Engellenen İşlem</div>
          <div className="stat-change" style={{ color: '#FF3B5C' }}>₺{blockedAmount.toLocaleString('tr-TR')} korundu</div>
        </div>
        
        <div className={`glass-card stat-card ${styles.statItem} animate-fade-in-up`}>
          <div className="stat-icon" style={{ background: 'rgba(255, 179, 0, 0.1)', color: '#FFB300' }}>⚠️</div>
          <div className="stat-value" style={{ color: '#FFB300' }}>{warningTxns.length}</div>
          <div className="stat-label">Uyarı Verilen</div>
          <div className="stat-change" style={{ color: '#FFB300' }}>Sanal kart önerildi</div>
        </div>
        
        <div className={`glass-card stat-card ${styles.statItem} animate-fade-in-up`}>
          <div className="stat-icon" style={{ background: 'rgba(0, 230, 118, 0.1)', color: '#00E676' }}>✅</div>
          <div className="stat-value" style={{ color: '#00E676' }}>{approvedTxns.length}</div>
          <div className="stat-label">Onaylanan İşlem</div>
          <div className="stat-change" style={{ color: '#00E676' }}>₺{totalAmount.toLocaleString('tr-TR')} toplam</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className={styles.mainGrid}>
        {/* Left Column */}
        <div className={styles.leftColumn}>
          {/* Recent Transactions */}
          <div className={`glass-card ${styles.section}`}>
            <div className={styles.sectionHeader}>
              <h2 className="section-title"><span className="icon">💳</span> Son İşlemler</h2>
              <Link href="/transactions" className={styles.viewAll}>Tümünü Gör →</Link>
            </div>
            <div className={styles.transactionList}>
              {recentTxns.map((txn, i) => (
                <div key={txn.id} className={styles.txnItem} style={{ animationDelay: `${i * 0.05}s` }}>
                  <div className={styles.txnIcon}>{txn.icon}</div>
                  <div className={styles.txnInfo}>
                    <span className={styles.txnMerchant}>{txn.merchant}</span>
                    <span className={styles.txnType}>{txn.typeLabel}</span>
                  </div>
                  <div className={styles.txnRight}>
                    <span className={styles.txnAmount} style={{ color: txn.status === 'blocked' ? '#FF3B5C' : '#fff' }}>
                      {txn.status === 'blocked' ? '—' : ''} ₺{txn.amount.toLocaleString('tr-TR')}
                    </span>
                    <span className={`badge badge-${txn.status === 'approved' ? 'safe' : txn.status === 'warning' ? 'warning' : 'danger'}`}>
                      {getStatusIcon(txn.status)} {txn.statusLabel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hourly Activity Chart */}
          <div className={`glass-card ${styles.section}`}>
            <h2 className="section-title"><span className="icon">📊</span> Saatlik İşlem Dağılımı</h2>
            <p className={styles.chartNote}>
              🔴 Kırmızı bölge: BDDK kaynaklı yüksek risk saatleri (01:00 - 06:00)
            </p>
            <div className={styles.hourlyChart}>
              {hourlyActivity.map((h) => (
                <div key={h.hour} className={styles.hourBar}>
                  <div 
                    className={styles.barFill} 
                    style={{ 
                      height: `${(h.count / maxHourlyCount) * 100}%`,
                      background: h.risk === 'critical' 
                        ? 'linear-gradient(to top, #FF3B5C, #FF6B81)' 
                        : h.risk === 'high' 
                        ? 'linear-gradient(to top, #FFB300, #FFD54F)' 
                        : 'linear-gradient(to top, #00D4FF, #7B2DFF)',
                      opacity: h.count === 0 ? 0.2 : 1
                    }}
                  />
                  <span className={styles.hourLabel} style={{ color: h.risk === 'critical' ? '#FF3B5C' : 'var(--text-muted)' }}>
                    {String(h.hour).padStart(2, '0')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.rightColumn}>
          {/* AI Agent Status */}
          <div className={`glass-card ${styles.section} ${styles.aiSection}`}>
            <h2 className="section-title"><span className="icon">🤖</span> AI Agent Durumu</h2>
            <div className={styles.aiStatusGrid}>
              <div className={styles.aiMetric}>
                <span className={styles.aiMetricValue}>{learningMetrics.totalTransactionsAnalyzed}</span>
                <span className={styles.aiMetricLabel}>Analiz Edilen</span>
              </div>
              <div className={styles.aiMetric}>
                <span className={styles.aiMetricValue}>{learningMetrics.patternsIdentified}</span>
                <span className={styles.aiMetricLabel}>Örüntü</span>
              </div>
              <div className={styles.aiMetric}>
                <span className={styles.aiMetricValue}>{learningMetrics.fraudsPrevented}</span>
                <span className={styles.aiMetricLabel}>Önlenen</span>
              </div>
              <div className={styles.aiMetric}>
                <span className={styles.aiMetricValue}>{learningMetrics.confidenceScore}%</span>
                <span className={styles.aiMetricLabel}>Güven</span>
              </div>
            </div>
            <div className={styles.aiCycleContainer}>
              <div className={styles.aiCycle}>
                <div className={`${styles.cycleStep} ${styles.planStep}`}>
                  <span>📋</span>
                  <span>Planlama</span>
                </div>
                <div className={styles.cycleArrow}>→</div>
                <div className={`${styles.cycleStep} ${styles.verifyStep}`}>
                  <span>✅</span>
                  <span>Doğrulama</span>
                </div>
                <div className={styles.cycleArrow}>→</div>
                <div className={`${styles.cycleStep} ${styles.actStep}`}>
                  <span>⚡</span>
                  <span>Aksiyon</span>
                </div>
              </div>
              <div className={styles.cycleLabel}>İteratif Öğrenme Döngüsü — Çevrim #{learningMetrics.iterationsCompleted}</div>
            </div>
            <Link href="/ai-agent" className={styles.viewAll} style={{ marginTop: '12px', display: 'block' }}>
              AI Agent Panelini Aç →
            </Link>
          </div>

          {/* Dangerous Sites */}
          <div className={`glass-card ${styles.section}`}>
            <h2 className="section-title"><span className="icon">🚨</span> Tehlikeli Siteler</h2>
            <div className={styles.dangerSitesList}>
              {dangerSites.slice(0, 4).map((site) => (
                <div key={site.id} className={styles.dangerSiteItem}>
                  <div className={styles.dangerSiteInfo}>
                    <span className={styles.dangerSiteFavicon}>{site.favicon}</span>
                    <div>
                      <span className={styles.dangerSiteName}>{site.name}</span>
                      <span className={styles.dangerSiteUrl}>{site.url}</span>
                    </div>
                  </div>
                  <div className={styles.dangerSiteScore}>
                    <SecurityGauge score={site.score} size={52} label="" />
                  </div>
                </div>
              ))}
            </div>
            <Link href="/scanner" className={styles.viewAll} style={{ marginTop: '12px', display: 'block' }}>
              Tüm Tarama Sonuçları →
            </Link>
          </div>

          {/* Spending Categories */}
          <div className={`glass-card ${styles.section}`}>
            <h2 className="section-title"><span className="icon">📈</span> Harcama Kategorileri</h2>
            <div className={styles.categoryList}>
              {spendingCategories.map((cat, i) => (
                <div key={i} className={styles.categoryItem}>
                  <div className={styles.categoryLeft}>
                    <span className={styles.categoryIcon}>{cat.icon}</span>
                    <span className={styles.categoryName}>{cat.name}</span>
                  </div>
                  <div className={styles.categoryRight}>
                    <div className={styles.categoryBar}>
                      <div 
                        className={styles.categoryBarFill} 
                        style={{ width: `${cat.percentage}%`, background: cat.color }}
                      />
                    </div>
                    <span className={styles.categoryPercent}>{cat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
