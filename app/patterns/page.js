'use client';
import { hourlyActivity, spendingCategories, weeklyTrend, geographicData, calendarEvents, detectedAnomalies, mockUserProfile } from '@/data/mock-user-habits';
import styles from './page.module.css';

export default function PatternsPage() {
  const maxHourly = Math.max(...hourlyActivity.map(h => h.count));
  const maxWeekly = Math.max(...weeklyTrend.map(w => w.amount));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🧠 Pattern Recognition Engine</h1>
        <p className={styles.subtitle}>Kullanıcı alışkanlıklarının AI destekli analizi ve anomali tespiti. Güven skoru: <strong style={{ color: '#7B2DFF' }}>{mockUserProfile.patternConfidence}%</strong></p>
      </div>

      {/* Anomalies */}
      <div className={`glass-card ${styles.section}`}>
        <h2 className="section-title"><span className="icon">🚨</span> Tespit Edilen Anomaliler</h2>
        <div className={styles.anomalyList}>
          {detectedAnomalies.map((a, i) => (
            <div key={a.id} className={`${styles.anomalyItem} ${styles[`severity_${a.severity}`]}`}>
              <div className={styles.anomalyHeader}>
                <span className={`badge badge-${a.severity === 'critical' ? 'danger' : a.severity === 'high' ? 'warning' : 'info'}`}>
                  {a.severity === 'critical' ? '🔴 Kritik' : a.severity === 'high' ? '🟠 Yüksek' : '🟡 Orta'}
                </span>
                <span className={styles.anomalyTitle}>{a.title}</span>
                <span className={`badge badge-${a.action === 'blocked' ? 'danger' : 'warning'}`}>
                  {a.action === 'blocked' ? '🛑 Engellendi' : '🃏 Sanal Kart'}
                </span>
              </div>
              <p className={styles.anomalyDesc}>{a.description}</p>
              <span className={styles.anomalySource}>📚 Kaynak: {a.source}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Hourly Heatmap */}
        <div className={`glass-card ${styles.section}`}>
          <h2 className="section-title"><span className="icon">🕐</span> Saatlik Aktivite Haritası</h2>
          <p className={styles.note}>🔴 01:00-06:00: BDDK kaynaklı yüksek risk saatleri. Bu saatlerdeki işlemler otomatik inceleme altındadır.</p>
          <div className={styles.heatmap}>
            {hourlyActivity.map(h => (
              <div key={h.hour} className={styles.heatCell} title={`Saat ${h.hour}:00 — ${h.count} işlem`}>
                <div className={styles.heatBar} style={{ 
                  height: `${Math.max((h.count / maxHourly) * 100, 5)}%`,
                  background: h.risk === 'critical' ? '#FF3B5C' : h.risk === 'high' ? '#FFB300' : h.risk === 'medium' ? '#00D4FF' : '#00E676',
                  opacity: h.count === 0 ? 0.15 : 0.8 + (h.count / maxHourly) * 0.2
                }} />
                <span className={styles.heatLabel} style={{ color: h.risk === 'critical' ? '#FF3B5C' : 'var(--text-muted)' }}>
                  {String(h.hour).padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Trend */}
        <div className={`glass-card ${styles.section}`}>
          <h2 className="section-title"><span className="icon">📅</span> Haftalık Harcama Trendi</h2>
          <div className={styles.weeklyChart}>
            {weeklyTrend.map((w, i) => (
              <div key={i} className={styles.weekDay}>
                <div className={styles.weekBarContainer}>
                  <div className={styles.weekBar} style={{ height: `${(w.amount / maxWeekly) * 100}%` }} />
                </div>
                <span className={styles.weekAmount}>₺{(w.amount / 1000).toFixed(1)}K</span>
                <span className={styles.weekLabel}>{w.day.slice(0, 3)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.twoCol}>
        {/* Geographic */}
        <div className={`glass-card ${styles.section}`}>
          <h2 className="section-title"><span className="icon">🌍</span> Coğrafi Harcama Profili</h2>
          <div className={styles.geoList}>
            {geographicData.map((g, i) => (
              <div key={i} className={styles.geoItem}>
                <div className={styles.geoLeft}>
                  <span className={styles.geoFlag}>{g.code === 'TR' ? '🇹🇷' : g.code === 'DE' ? '🇩🇪' : g.code === 'US' ? '🇺🇸' : '🇬🇧'}</span>
                  <div>
                    <span className={styles.geoCountry}>{g.country}</span>
                    <span className={styles.geoTxns}>{g.transactions} işlem</span>
                  </div>
                </div>
                <div className={styles.geoRight}>
                  <div className={styles.geoBar}>
                    <div className={styles.geoBarFill} style={{ width: `${g.percentage}%`, background: g.status === 'suspicious' ? '#FF3B5C' : '#00D4FF' }} />
                  </div>
                  <span className={styles.geoPercent} style={{ color: g.status === 'suspicious' ? '#FF3B5C' : 'var(--text-secondary)' }}>{g.percentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className={`glass-card ${styles.section}`}>
          <h2 className="section-title"><span className="icon">📅</span> Takvim Entegrasyonu</h2>
          <p className={styles.note}>Seyahat planları yurt dışı harcamalarla eşleştirilir. Eşleşmeyen harcamalar otomatik engellenir.</p>
          <div className={styles.calendarList}>
            {calendarEvents.map(e => (
              <div key={e.id} className={styles.calendarItem}>
                <div className={styles.calendarIcon}>✈️</div>
                <div className={styles.calendarInfo}>
                  <span className={styles.calendarTitle}>{e.title}</span>
                  <span className={styles.calendarDate}>{e.startDate} → {e.endDate}</span>
                  <span className={styles.calendarLocation}>📍 {e.location}</span>
                </div>
                <span className="badge badge-info">{e.status === 'planned' ? 'Planlandı' : 'Aktif'}</span>
              </div>
            ))}
            <div className={styles.noTravelNote}>
              ℹ️ İngiltere, ABD ve diğer plansız lokasyonlardan gelen harcamalar otomatik olarak engellenir.
            </div>
          </div>
        </div>
      </div>

      {/* Spending Categories */}
      <div className={`glass-card ${styles.section}`}>
        <h2 className="section-title"><span className="icon">📊</span> Harcama Kategorileri Analizi</h2>
        <p className={styles.note}>AI Agent bu kategorilere bakarak kullanıcının alışkanlıklarını öğrenir: Kredi kartı borcu ödeme, fatura ödeme, EFT, havale, FAST, virman, internet alışverişi, yurt dışı harcama.</p>
        <div className={styles.catGrid}>
          {spendingCategories.map((c, i) => (
            <div key={i} className={styles.catCard}>
              <span className={styles.catIcon}>{c.icon}</span>
              <span className={styles.catName}>{c.name}</span>
              <span className={styles.catAmount}>₺{c.amount.toLocaleString('tr-TR')}</span>
              <div className={styles.catBar}>
                <div className={styles.catBarFill} style={{ width: `${c.percentage}%`, background: c.color }} />
              </div>
              <span className={styles.catCount}>{c.count} işlem</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
