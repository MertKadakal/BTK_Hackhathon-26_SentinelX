'use client';
import { useState } from 'react';
import SecurityGauge from '@/components/SecurityGauge';
import { mockIBANs, getIBANStatusColor, getIBANRiskLabel } from '@/data/mock-iban';
import styles from './page.module.css';

export default function IBANPage() {
  const [searchIBAN, setSearchIBAN] = useState('');
  const [selectedIBAN, setSelectedIBAN] = useState(null);
  const [searching, setSearching] = useState(false);

  const handleSearch = () => {
    if (!searchIBAN.trim()) return;
    setSearching(true);
    setTimeout(() => {
      const found = mockIBANs.find(iban => 
        searchIBAN.replace(/\s/g, '').includes(iban.iban.replace(/\s/g, '').slice(0, 10)) ||
        iban.holder.toLowerCase().includes(searchIBAN.toLowerCase())
      );
      setSelectedIBAN(found || null);
      setSearching(false);
    }, 1500);
  };

  const handleQuickSelect = (iban) => {
    setSelectedIBAN(iban);
    setSearchIBAN(iban.iban);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>🏦 IBAN Kontrol Paneli</h1>
        <p className={styles.subtitle}>Transfer yapılmak istenen IBAN'ın güvenilirliğini kontrol edin. Dolandırıcılık şüphesi olan hesapları tespit edin.</p>
      </div>

      {/* Search */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <span>🏦</span>
          <input
            type="text"
            value={searchIBAN}
            onChange={(e) => setSearchIBAN(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="IBAN veya hesap sahibi adı girin..."
            className={styles.searchInput}
          />
          <button onClick={handleSearch} className="btn-primary" disabled={searching}>
            {searching ? '⟳ Sorgulanıyor...' : '🔍 Sorgula'}
          </button>
        </div>
      </div>

      {/* Selected IBAN Details */}
      {selectedIBAN && (
        <div className={styles.resultSection}>
          <div className={`glass-card ${styles.resultCard}`} style={{ 
            borderColor: selectedIBAN.status === 'safe' ? 'rgba(0,230,118,0.2)' : selectedIBAN.status === 'warning' ? 'rgba(255,179,0,0.2)' : 'rgba(255,59,92,0.2)'
          }}>
            <div className={styles.resultHeader}>
              <div>
                <h2 className={styles.resultHolder}>{selectedIBAN.holder}</h2>
                <span className={styles.resultIBAN}>{selectedIBAN.iban}</span>
                <span className={styles.resultBank}>{selectedIBAN.bank}</span>
              </div>
              <SecurityGauge score={100 - selectedIBAN.riskScore} size={130} label="Güvenilirlik" />
            </div>

            <div className={styles.resultStats}>
              {[
                { label: 'Toplam Transfer', value: selectedIBAN.totalTransfers, icon: '💸' },
                { label: 'Farklı Kişi', value: selectedIBAN.uniqueContacts, icon: '👥' },
                { label: 'Toplam Tutar', value: `₺${selectedIBAN.totalAmount.toLocaleString('tr-TR')}`, icon: '💰' },
                { label: 'Ortalama', value: `₺${selectedIBAN.avgAmount.toLocaleString('tr-TR')}`, icon: '📊' },
                { label: 'Şikayet', value: selectedIBAN.complaints, icon: '⚠️' },
              ].map((s, i) => (
                <div key={i} className={styles.resultStat}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.resultDetails}>
              <div className={styles.detailRow}>
                <span>Risk Skoru</span>
                <span className={`badge badge-${selectedIBAN.status === 'safe' ? 'safe' : selectedIBAN.status === 'warning' ? 'warning' : 'danger'}`}>
                  {selectedIBAN.riskScore}/100 — {getIBANRiskLabel(selectedIBAN.riskScore)}
                </span>
              </div>
              <div className={styles.detailRow}>
                <span>İşlem Sıklığı</span>
                <span>{selectedIBAN.frequency}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Kayıt Tarihi</span>
                <span>{selectedIBAN.registrationDate}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Son Aktivite</span>
                <span>{selectedIBAN.lastActivity}</span>
              </div>
            </div>

            <div className={styles.resultNotes} style={{
              background: selectedIBAN.status === 'danger' ? 'rgba(255,59,92,0.06)' : selectedIBAN.status === 'warning' ? 'rgba(255,179,0,0.06)' : 'rgba(0,230,118,0.06)',
              borderColor: selectedIBAN.status === 'danger' ? 'rgba(255,59,92,0.15)' : selectedIBAN.status === 'warning' ? 'rgba(255,179,0,0.15)' : 'rgba(0,230,118,0.15)'
            }}>
              <span>🤖 AI Analizi:</span> {selectedIBAN.notes}
            </div>
          </div>
        </div>
      )}

      {/* Quick Select */}
      <div className={styles.quickSection}>
        <h2 className="section-title" style={{ marginBottom: '16px' }}>📋 Kayıtlı IBAN'lar</h2>
        <div className={styles.ibanGrid}>
          {mockIBANs.map((iban, i) => (
            <div key={i} className={`glass-card ${styles.ibanCard}`} onClick={() => handleQuickSelect(iban)}>
              <div className={styles.ibanCardHeader}>
                <span className={styles.ibanHolder}>{iban.holder}</span>
                <span className={`badge badge-${iban.status === 'safe' ? 'safe' : iban.status === 'warning' ? 'warning' : 'danger'}`}>
                  {iban.statusLabel}
                </span>
              </div>
              <span className={styles.ibanNumber}>{iban.iban}</span>
              <span className={styles.ibanBank}>{iban.bank}</span>
              <div className={styles.ibanStats}>
                <span>👥 {iban.uniqueContacts} kişi</span>
                <span>💸 {iban.totalTransfers} transfer</span>
                <span>⚠️ {iban.complaints} şikayet</span>
              </div>
              <div className={styles.ibanRiskBar}>
                <div className={styles.ibanRiskFill} style={{ width: `${iban.riskScore}%`, background: getIBANStatusColor(iban.status) }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
