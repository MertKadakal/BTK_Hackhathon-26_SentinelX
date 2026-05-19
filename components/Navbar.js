'use client';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [time, setTime] = useState('');
  const [riskHour, setRiskHour] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      setTime(now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setRiskHour(hours >= 1 && hours < 6);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Site URL'si veya işlem ara..."
            className={styles.searchInput}
            id="global-search"
          />
        </div>
      </div>
      
      <div className={styles.right}>
        {/* Risk Hour Warning */}
        {riskHour && (
          <div className={styles.riskWarning}>
            <span className={styles.riskIcon}>⚠️</span>
            <span className={styles.riskText}>Yüksek Risk Saati</span>
          </div>
        )}

        {/* Clock */}
        <div className={`${styles.clock} ${riskHour ? styles.clockDanger : ''}`}>
          <span className={styles.clockIcon}>🕐</span>
          <span className={styles.clockTime}>{time}</span>
        </div>

        {/* Notifications */}
        <button className={styles.notifBtn} id="notifications-btn">
          <span>🔔</span>
          <span className={styles.notifBadge}>3</span>
        </button>

        {/* User */}
        <div className={styles.userSection}>
          <div className={styles.userAvatar}>EK</div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>Emre Kaya</span>
            <span className={styles.userRole}>Premium Kullanıcı</span>
          </div>
        </div>
      </div>
    </header>
  );
}
