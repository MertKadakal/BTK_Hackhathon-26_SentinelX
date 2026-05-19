'use client';
import { useState, useEffect } from 'react';
import { learningMetrics, detectedAnomalies } from '@/data/mock-user-habits';
import { mockTransactions } from '@/data/mock-transactions';
import styles from './page.module.css';

const agentLogs = [
  { time: '20:35', type: 'scan', message: 'mega-indirim.store sitesi tarandı → Skor: 18/100, zararlı yazılım tespit edildi.', severity: 'danger' },
  { time: '20:34', type: 'block', message: 'TXN-009: Saat 03:24 işlemi engellendi. BDDK yüksek risk saati kuralı uygulandı.', severity: 'danger' },
  { time: '20:33', type: 'block', message: 'TXN-008: İngiltere araç kiralama — takvimde seyahat planı yok. Engellendi.', severity: 'danger' },
  { time: '20:32', type: 'card', message: 'superdeals-shop.xyz için sanal kart oluşturuldu. Bakiye: ₺189.90', severity: 'warning' },
  { time: '20:31', type: 'learn', message: 'Kullanıcı pattern analizi güncellendi. Güven skoru: %87 → %87.2', severity: 'info' },
  { time: '20:30', type: 'notify', message: 'Banka bildirim gönderildi: cinmall-turkiye.com dolandırıcılık platformu olarak kaydedildi.', severity: 'danger' },
  { time: '20:28', type: 'approve', message: 'TXN-001: Trendyol alışverişi onaylandı. Site skoru: 92, 3D Secure aktif.', severity: 'safe' },
  { time: '20:25', type: 'learn', message: 'İteratif öğrenme çevrimi #156 tamamlandı. 23 yeni örüntü tanımlandı.', severity: 'info' },
  { time: '20:20', type: 'scan', message: 'Haftalık internet taraması başlatıldı. Kart bilgisi sızıntısı kontrol ediliyor...', severity: 'info' },
  { time: '20:15', type: 'approve', message: 'TXN-002: İGDAŞ fatura ödemesi onaylandı. Aylık rutin ödeme — düşük risk.', severity: 'safe' },
];

const thinkingSteps = [
  { phase: 'plan', title: 'Planlama', icon: '📋', items: [
    'İşlem verilerini topla ve kategorize et',
    'Kullanıcı alışkanlık profilini yükle',
    'Risk parametrelerini belirle (saat, konum, tutar)',
    'Takvim verilerini kontrol et'
  ]},
  { phase: 'verify', title: 'Doğrulama', icon: '✅', items: [
    'Site güvenlik skorunu hesapla',
    '3D Secure durumunu kontrol et',
    'Veri sızıntısı geçmişini sorgula',
    'Coğrafi konum ile takvim eşleştirmesi yap',
    'Saat bazlı risk analizi uygula (BDDK kuralı)'
  ]},
  { phase: 'act', title: 'Aksiyon', icon: '⚡', items: [
    'Risk skoru > 70 ise işlemi engelle',
    'Düşük skorlu site ise sanal kart öner',
    'Dolandırıcılık tespitinde bankaya bildir',
    'Kullanıcıya uyarı gönder',
    'Veritabanını güncelle'
  ]},
];

export default function AIAgentPage() {
  const [activePhase, setActivePhase] = useState(0);
  const [expandedLog, setExpandedLog] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhase(p => (p + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🤖 AI Agent Paneli</h1>
        <p className={styles.subtitle}>Yapay zekâ ajanının karar alma süreci, öğrenme metrikleri ve aksiyonları</p>
      </div>

      {/* Metrics Row */}
      <div className={styles.metricsRow}>
        {[
          { label: 'Analiz Edilen İşlem', value: learningMetrics.totalTransactionsAnalyzed, color: '#00D4FF' },
          { label: 'Tespit Edilen Anomali', value: learningMetrics.anomaliesDetected, color: '#FFB300' },
          { label: 'Önlenen Dolandırıcılık', value: learningMetrics.fraudsPrevented, color: '#FF3B5C' },
          { label: 'Doğruluk Oranı', value: `${learningMetrics.accuracy}%`, color: '#00E676' },
          { label: 'Güven Skoru', value: `${learningMetrics.confidenceScore}%`, color: '#7B2DFF' },
          { label: 'Öğrenme Çevrimi', value: `#${learningMetrics.iterationsCompleted}`, color: '#00D4FF' },
        ].map((m, i) => (
          <div key={i} className={`glass-card ${styles.metricCard}`}>
            <span className={styles.metricValue} style={{ color: m.color }}>{m.value}</span>
            <span className={styles.metricLabel}>{m.label}</span>
          </div>
        ))}
      </div>

      <div className={styles.mainGrid}>
        {/* Thinking Process */}
        <div className={`glass-card ${styles.thinkingSection}`}>
          <h2 className="section-title"><span className="icon">🧠</span> Karar Alma Süreci (Plan → Doğrula → Aksiyon)</h2>
          <div className={styles.phases}>
            {thinkingSteps.map((step, i) => (
              <div key={i} className={`${styles.phaseCard} ${activePhase === i ? styles.phaseActive : ''}`}>
                <div className={styles.phaseHeader}>
                  <span className={styles.phaseIcon}>{step.icon}</span>
                  <span className={styles.phaseTitle}>{step.title}</span>
                  {activePhase === i && <span className={styles.phaseIndicator} />}
                </div>
                <ul className={styles.phaseItems}>
                  {step.items.map((item, j) => (
                    <li key={j} className={activePhase === i ? styles.phaseItemActive : ''}>
                      <span className={styles.checkmark}>{activePhase > i || (activePhase === i && j <= 2) ? '✓' : '○'}</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className={styles.cycleInfo}>
            <span className={styles.cycleSpinner}>⟳</span>
            İteratif Öğrenme — Her işlem bu döngüden geçer ve AI her çevrimde daha akıllı hale gelir.
          </div>
        </div>

        {/* Agent Activity Log */}
        <div className={`glass-card ${styles.logSection}`}>
          <h2 className="section-title"><span className="icon">📋</span> Agent Aktivite Günlüğü</h2>
          <div className={styles.logList}>
            {agentLogs.map((log, i) => (
              <div key={i} className={`${styles.logItem} ${styles[`log_${log.severity}`]}`}>
                <span className={styles.logTime}>{log.time}</span>
                <span className={styles.logType}>
                  {log.type === 'block' ? '🛑' : log.type === 'scan' ? '🔍' : log.type === 'card' ? '🃏' : log.type === 'learn' ? '🧠' : log.type === 'notify' ? '🔔' : '✅'}
                </span>
                <span className={styles.logMessage}>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RAG Section */}
      <div className={`glass-card ${styles.ragSection}`}>
        <h2 className="section-title"><span className="icon">📚</span> RAG Bilgi Tabanı (Retrieval-Augmented Generation)</h2>
        <p className={styles.ragDesc}>AI Agent, kararlarını aşağıdaki veri kaynaklarından besleyerek verir:</p>
        <div className={styles.ragGrid}>
          {[
            { icon: '🏦', title: 'BDDK Düzenlemeleri', desc: 'Bankacılık Denetleme ve Düzenleme Kurumu yönetmelikleri, güvenlik standartları ve risk saatleri (01:00-06:00)' },
            { icon: '🔒', title: 'PCI DSS Standartları', desc: 'Ödeme kartı endüstrisi veri güvenliği standardı gereksinimleri' },
            { icon: '📊', title: 'Siber Tehdit İstihbaratı', desc: 'Gerçek zamanlı siber saldırı veritabanları, bilinen tehdit aktörleri ve saldırı vektörleri' },
            { icon: '🌐', title: 'Web Güvenlik Veritabanı', desc: 'SSL/TLS sertifika otoriteleri, 3D Secure registry, phishing site veritabanları' },
            { icon: '🧠', title: 'Kullanıcı Davranış Modeli', desc: 'Harcama alışkanlıkları, saat/lokasyon profili, kategori tercihleri' },
            { icon: '📅', title: 'Takvim & Seyahat Verileri', desc: 'Planlanan seyahatler, coğrafi hareketlilik profili' },
          ].map((item, i) => (
            <div key={i} className={styles.ragItem}>
              <span className={styles.ragIcon}>{item.icon}</span>
              <div>
                <h4 className={styles.ragTitle}>{item.title}</h4>
                <p className={styles.ragItemDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
