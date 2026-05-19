'use client';
import { useState } from 'react';
import SecurityGauge from '@/components/SecurityGauge';
import { mockSites, getScoreColor, getScoreLabel } from '@/data/mock-sites';
import styles from './page.module.css';

export default function ScannerPage() {
  const [searchUrl, setSearchUrl] = useState('');
  const [selectedSite, setSelectedSite] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = () => {
    if (!searchUrl.trim()) return;
    setScanning(true);
    setScanned(false);
    setSelectedSite(null);

    setTimeout(() => {
      const found = mockSites.find(s => 
        searchUrl.toLowerCase().includes(s.url.toLowerCase()) ||
        s.url.toLowerCase().includes(searchUrl.toLowerCase().replace('https://', '').replace('http://', '').replace('www.', ''))
      );
      setSelectedSite(found || {
        id: 999,
        name: searchUrl,
        url: searchUrl,
        favicon: '🌐',
        score: Math.floor(Math.random() * 40) + 10,
        status: 'danger',
        ssl: { valid: false, issuer: 'Bilinmiyor', expiry: null, grade: 'F' },
        threeDSecure: { enabled: false, version: null, strength: 'none' },
        cyberAttacks: { total: Math.floor(Math.random() * 10), lastAttack: '2025-05-01', types: ['Bilinmiyor'] },
        dataBreaches: { total: Math.floor(Math.random() * 5), lastBreach: '2025-04-01' },
        complaints: Math.floor(Math.random() * 500),
        monthlyVisitors: '?',
        established: '?',
        category: 'Bilinmiyor',
        details: 'Bu site veritabanımızda bulunamadı. Dikkatli olmanız önerilir.'
      });
      setScanning(false);
      setScanned(true);
    }, 2500);
  };

  const handleQuickScan = (site) => {
    setSearchUrl(site.url);
    setSelectedSite(site);
    setScanned(true);
    setScanning(false);
  };

  return (
    <div className={styles.scanner}>
      <div className={styles.header}>
        <h1 className={styles.title}>🔍 Site Güvenlik Tarayıcısı</h1>
        <p className={styles.subtitle}>Web sitelerinin güvenlik skorunu analiz edin, 3D Secure durumunu ve siber saldırı geçmişini kontrol edin.</p>
      </div>

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🌐</span>
          <input
            type="text"
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            placeholder="Site URL'si girin (örn: trendyol.com)"
            className={styles.searchInput}
            id="scanner-search"
          />
          <button onClick={handleScan} className={styles.scanBtn} disabled={scanning}>
            {scanning ? (
              <span className={styles.scanSpinner}>⟳</span>
            ) : (
              '🔍 Tara'
            )}
          </button>
        </div>
      </div>

      {/* Scanning Animation */}
      {scanning && (
        <div className={styles.scanningOverlay}>
          <div className={styles.scanningContent}>
            <div className={styles.dnaLoader}>
              {[...Array(9)].map((_, i) => <span key={i} />)}
            </div>
            <p className={styles.scanningText}>Güvenlik analizi yapılıyor...</p>
            <p className={styles.scanningSubtext}>SSL, 3D Secure, siber saldırı geçmişi, veri sızıntıları kontrol ediliyor</p>
          </div>
        </div>
      )}

      {/* Results */}
      {scanned && selectedSite && (
        <div className={styles.results}>
          {/* Score Card */}
          <div className={styles.scoreSection}>
            <div className={`glass-card ${styles.scoreCard}`}>
              <div className={styles.scoreHeader}>
                <span className={styles.siteFavicon}>{selectedSite.favicon}</span>
                <div>
                  <h2 className={styles.siteName}>{selectedSite.name}</h2>
                  <span className={styles.siteUrl}>{selectedSite.url}</span>
                </div>
              </div>
              <SecurityGauge score={selectedSite.score} size={200} />
              <div className={styles.scoreActions}>
                {selectedSite.score < 50 && (
                  <button className="btn-primary" style={{ width: '100%' }}>
                    🃏 Sanal Kart Oluştur
                  </button>
                )}
                <button className="btn-secondary" style={{ width: '100%' }}>
                  🚩 Siteyi Raporla
                </button>
              </div>
            </div>

            {/* AI Recommendation */}
            <div className={`glass-card ${styles.aiRecommendation}`} style={{
              borderColor: selectedSite.score >= 80 ? 'rgba(0, 230, 118, 0.2)' : 
                          selectedSite.score >= 50 ? 'rgba(255, 179, 0, 0.2)' : 'rgba(255, 59, 92, 0.2)'
            }}>
              <h3 className={styles.aiTitle}>🤖 AI Güvenlik Önerisi</h3>
              <p className={styles.aiText}>{selectedSite.details}</p>
              {selectedSite.score < 50 && (
                <div className={styles.aiWarning}>
                  <span>⚠️</span>
                  <span>Bu siteye kredi kartı bilgilerinizi <strong>vermeyin</strong>. Sanal kart kullanmanız şiddetle önerilir.</span>
                </div>
              )}
              {selectedSite.score >= 80 && (
                <div className={styles.aiSafe}>
                  <span>✅</span>
                  <span>Bu site güvenli alışveriş için uygundur. 3D Secure doğrulama aktiftir.</span>
                </div>
              )}
            </div>
          </div>

          {/* Detail Cards */}
          <div className={styles.detailsGrid}>
            {/* SSL Status */}
            <div className={`glass-card ${styles.detailCard}`}>
              <div className={styles.detailHeader}>
                <span className={styles.detailIcon}>🔒</span>
                <span className={styles.detailTitle}>SSL Sertifikası</span>
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailRow}>
                  <span>Durum</span>
                  <span className={`badge ${selectedSite.ssl.valid ? 'badge-safe' : 'badge-danger'}`}>
                    {selectedSite.ssl.valid ? '✅ Geçerli' : '❌ Geçersiz'}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Sağlayıcı</span>
                  <span>{selectedSite.ssl.issuer || 'Yok'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Derece</span>
                  <span style={{ 
                    color: selectedSite.ssl.grade === 'A+' || selectedSite.ssl.grade === 'A' ? '#00E676' :
                           selectedSite.ssl.grade === 'B' ? '#FFB300' : '#FF3B5C',
                    fontWeight: 700
                  }}>{selectedSite.ssl.grade || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* 3D Secure */}
            <div className={`glass-card ${styles.detailCard}`}>
              <div className={styles.detailHeader}>
                <span className={styles.detailIcon}>🛡️</span>
                <span className={styles.detailTitle}>3D Secure</span>
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailRow}>
                  <span>Durum</span>
                  <span className={`badge ${selectedSite.threeDSecure.enabled ? 'badge-safe' : 'badge-danger'}`}>
                    {selectedSite.threeDSecure.enabled ? '✅ Aktif' : '❌ Yok'}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Versiyon</span>
                  <span>{selectedSite.threeDSecure.version || 'N/A'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Güç</span>
                  <span className={`badge ${
                    selectedSite.threeDSecure.strength === 'strong' ? 'badge-safe' :
                    selectedSite.threeDSecure.strength === 'moderate' ? 'badge-warning' :
                    selectedSite.threeDSecure.strength === 'weak' ? 'badge-warning' : 'badge-danger'
                  }`}>
                    {selectedSite.threeDSecure.strength === 'strong' ? 'Güçlü' :
                     selectedSite.threeDSecure.strength === 'moderate' ? 'Orta' :
                     selectedSite.threeDSecure.strength === 'weak' ? 'Zayıf' : 'Yok'}
                  </span>
                </div>
              </div>
            </div>

            {/* Cyber Attacks */}
            <div className={`glass-card ${styles.detailCard}`}>
              <div className={styles.detailHeader}>
                <span className={styles.detailIcon}>⚔️</span>
                <span className={styles.detailTitle}>Siber Saldırılar</span>
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailRow}>
                  <span>Toplam</span>
                  <span style={{ color: selectedSite.cyberAttacks.total > 5 ? '#FF3B5C' : '#FFB300', fontWeight: 700 }}>
                    {selectedSite.cyberAttacks.total} saldırı
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Son Saldırı</span>
                  <span>{selectedSite.cyberAttacks.lastAttack || 'Yok'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Türler</span>
                  <span className={styles.attackTypes}>
                    {selectedSite.cyberAttacks.types.length > 0 ? selectedSite.cyberAttacks.types.join(', ') : 'Yok'}
                  </span>
                </div>
              </div>
            </div>

            {/* Data Breaches */}
            <div className={`glass-card ${styles.detailCard}`}>
              <div className={styles.detailHeader}>
                <span className={styles.detailIcon}>💧</span>
                <span className={styles.detailTitle}>Veri Sızıntıları</span>
              </div>
              <div className={styles.detailContent}>
                <div className={styles.detailRow}>
                  <span>Toplam</span>
                  <span className={`badge ${selectedSite.dataBreaches.total === 0 ? 'badge-safe' : 'badge-danger'}`}>
                    {selectedSite.dataBreaches.total === 0 ? '✅ Yok' : `❌ ${selectedSite.dataBreaches.total} sızıntı`}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span>Son Sızıntı</span>
                  <span>{selectedSite.dataBreaches.lastBreach || 'Yok'}</span>
                </div>
                <div className={styles.detailRow}>
                  <span>Şikayetler</span>
                  <span style={{ color: selectedSite.complaints > 100 ? '#FF3B5C' : '#94A3B8' }}>
                    {selectedSite.complaints} şikayet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Scan Sites */}
      {!scanned && !scanning && (
        <div className={styles.quickSection}>
          <h2 className="section-title" style={{ marginBottom: '20px' }}>⚡ Hızlı Tarama</h2>
          <div className={styles.siteGrid}>
            {mockSites.map((site) => (
              <div key={site.id} className={`glass-card ${styles.siteCard}`} onClick={() => handleQuickScan(site)}>
                <div className={styles.siteCardHeader}>
                  <span className={styles.siteCardFavicon}>{site.favicon}</span>
                  <span className={`badge badge-${site.status === 'safe' ? 'safe' : site.status === 'warning' ? 'warning' : 'danger'}`}>
                    {getScoreLabel(site.score)}
                  </span>
                </div>
                <h3 className={styles.siteCardName}>{site.name}</h3>
                <span className={styles.siteCardUrl}>{site.url}</span>
                <div className={styles.siteCardScore}>
                  <div className={styles.siteCardScoreBar}>
                    <div 
                      className={styles.siteCardScoreFill}
                      style={{ width: `${site.score}%`, background: getScoreColor(site.score) }}
                    />
                  </div>
                  <span style={{ color: getScoreColor(site.score), fontWeight: 700, fontSize: '0.85rem' }}>
                    {site.score}/100
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
