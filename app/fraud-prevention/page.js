'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

const simulationSteps = [
  { id: 1, icon: '🌐', title: 'İşlem Alındı', desc: 'cinmall-turkiye.com üzerinden ₺129.90 ödeme talebi', status: 'pending' },
  { id: 2, icon: '🔒', title: '3D Secure Kontrolü', desc: '3D Secure doğrulama altyapısı kontrol ediliyor...', status: 'pending', check: 'threeDSecure' },
  { id: 3, icon: '🛡️', title: 'Site Güvenlik Skoru', desc: 'Site güvenlik skoru hesaplanıyor...', status: 'pending', check: 'siteScore' },
  { id: 4, icon: '💧', title: 'Veri Sızıntısı Kontrolü', desc: 'Bilinen sızıntı veritabanları sorgulanıyor...', status: 'pending', check: 'dataBreach' },
  { id: 5, icon: '🧠', title: 'Alışkanlık Uyumu', desc: 'Kullanıcı pattern profili ile karşılaştırılıyor...', status: 'pending', check: 'habitMatch' },
  { id: 6, icon: '📍', title: 'Coğrafi Konum Kontrolü', desc: 'İşlem lokasyonu ile profil eşleştirmesi...', status: 'pending', check: 'geoCheck' },
  { id: 7, icon: '🕐', title: 'Saat Bazlı Risk Analizi', desc: 'BDDK yüksek risk saatleri kontrolü...', status: 'pending', check: 'timeCheck' },
];

const checkResults = {
  threeDSecure: { result: 'fail', message: '❌ 3D Secure BULUNAMADI — site ödeme güvenliği yok', color: '#FF3B5C' },
  siteScore: { result: 'fail', message: '❌ Site Skoru: 22/100 — Tehlikeli', color: '#FF3B5C' },
  dataBreach: { result: 'fail', message: '❌ 8 veri sızıntısı kaydı — son sızıntı: 10.05.2025', color: '#FF3B5C' },
  habitMatch: { result: 'pass', message: '✅ Tutar kullanıcı ortalamasıyla uyumlu', color: '#00E676' },
  geoCheck: { result: 'pass', message: '✅ İşlem lokasyonu (İstanbul) profille eşleşiyor', color: '#00E676' },
  timeCheck: { result: 'pass', message: '✅ İşlem saati normal aralıkta', color: '#00E676' },
};

export default function FraudPreventionPage() {
  const [steps, setSteps] = useState(simulationSteps);
  const [currentStep, setCurrentStep] = useState(-1);
  const [finalVerdict, setFinalVerdict] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const startSimulation = () => {
    setSimulating(true);
    setFinalVerdict(null);
    setSteps(simulationSteps.map(s => ({ ...s, status: 'pending' })));
    setCurrentStep(0);
  };

  useEffect(() => {
    if (currentStep < 0 || currentStep >= steps.length) return;
    
    const timer = setTimeout(() => {
      setSteps(prev => prev.map((s, i) => {
        if (i === currentStep) {
          const check = s.check ? checkResults[s.check] : null;
          return { ...s, status: check ? check.result : 'pass', resultMessage: check?.message, resultColor: check?.color };
        }
        if (i === currentStep + 1) return { ...s, status: 'checking' };
        return s;
      }));
      
      if (currentStep + 1 >= steps.length) {
        setTimeout(() => {
          setFinalVerdict('blocked');
          setSimulating(false);
        }, 800);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentStep]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>🛡️ Dolandırıcılık Önleme Akışı</h1>
          <p className={styles.subtitle}>Her işlem gerçekleşmeden önce 7 aşamalı güvenlik kontrolünden geçer</p>
        </div>
        <button className="btn-primary" onClick={startSimulation} disabled={simulating}>
          {simulating ? '⟳ Simülasyon Devam Ediyor...' : '▶️ Simülasyonu Başlat'}
        </button>
      </div>

      {/* Flow Diagram */}
      <div className={`glass-card ${styles.flowSection}`}>
        <h2 className="section-title"><span className="icon">🔄</span> İşlem Güvenlik Akışı</h2>
        
        <div className={styles.flowSteps}>
          {steps.map((step, i) => (
            <div key={step.id}>
              <div className={`${styles.flowStep} ${styles[`step_${step.status}`]}`}>
                <div className={styles.stepIcon}>
                  {step.status === 'checking' ? (
                    <span className={styles.spinner}>⟳</span>
                  ) : step.status === 'pass' ? '✅' : step.status === 'fail' ? '❌' : step.icon}
                </div>
                <div className={styles.stepContent}>
                  <span className={styles.stepTitle}>{step.title}</span>
                  <span className={styles.stepDesc}>{step.desc}</span>
                  {step.resultMessage && (
                    <span className={styles.stepResult} style={{ color: step.resultColor }}>{step.resultMessage}</span>
                  )}
                </div>
                <span className={`badge ${step.status === 'pass' ? 'badge-safe' : step.status === 'fail' ? 'badge-danger' : step.status === 'checking' ? 'badge-info' : 'badge-ai'}`}>
                  {step.status === 'pass' ? 'Geçti' : step.status === 'fail' ? 'Başarısız' : step.status === 'checking' ? 'Kontrol...' : 'Bekliyor'}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={styles.flowConnector}>
                  <div className={`${styles.connectorLine} ${steps[i+1].status !== 'pending' ? styles.connectorActive : ''}`} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Verdict */}
        {finalVerdict && (
          <div className={`${styles.verdict} ${styles.verdictBlocked}`}>
            <div className={styles.verdictIcon}>🛑</div>
            <div className={styles.verdictContent}>
              <h3 className={styles.verdictTitle}>İŞLEM ENGELLENDİ</h3>
              <p className={styles.verdictDesc}>3 güvenlik kontrolü başarısız oldu. İşlem dolandırıcılık şüphesiyle engellendi.</p>
              <div className={styles.verdictActions}>
                <span className="badge badge-danger">🔔 Kullanıcıya bildirildi</span>
                <span className="badge badge-danger">🏦 Bankaya rapor gönderildi</span>
                <span className="badge badge-danger">📋 Veritabanına şüpheli olarak işlendi</span>
                <span className="badge badge-danger">🚫 POS istekleri reddedilecek</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Prevention Cycle */}
      <div className={`glass-card ${styles.cycleSection}`}>
        <h2 className="section-title"><span className="icon">🔄</span> Dolandırıcılık Önleme Döngüsü</h2>
        <div className={styles.cycleFlow}>
          {[
            { icon: '⚠️', title: 'Ön Uyarı', desc: 'Kredi kartı bazında önceden uyarı sistemi', color: '#FFB300' },
            { icon: '🛑', title: 'İşlem Anında İptal', desc: 'Şüpheli işlem gerçek zamanlı engelleme', color: '#FF3B5C' },
            { icon: '📋', title: 'Veritabanına Kayıt', desc: 'Şüpheli işlem olarak işaretleme', color: '#7B2DFF' },
            { icon: '🔔', title: 'Bildirim', desc: 'Kullanıcı + Banka bilgilendirme', color: '#00D4FF' },
            { icon: '🧠', title: 'Öğrenme', desc: 'AI modeli güncelleme', color: '#00E676' },
          ].map((step, i) => (
            <div key={i} className={styles.cycleItem}>
              <div className={styles.cycleIcon} style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                <span>{step.icon}</span>
              </div>
              <span className={styles.cycleTitle}>{step.title}</span>
              <span className={styles.cycleDesc}>{step.desc}</span>
              {i < 4 && <div className={styles.cycleArrow}>→</div>}
            </div>
          ))}
        </div>
        <div className={styles.cycleNote}>
          Bu döngü her işlem için tekrarlanır ve AI her çevrimde daha doğru kararlar verir.
        </div>
      </div>
    </div>
  );
}
