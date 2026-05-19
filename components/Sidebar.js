'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './Sidebar.module.css';

const navItems = [
  { href: '/', icon: '📊', label: 'Gösterge Paneli', id: 'dashboard' },
  { href: '/scanner', icon: '🔍', label: 'Site Tarayıcı', id: 'scanner' },
  { href: '/transactions', icon: '💳', label: 'İşlem Monitörü', id: 'transactions' },
  { href: '/virtual-cards', icon: '🃏', label: 'Sanal Kartlar', id: 'virtual-cards' },
  { href: '/ai-agent', icon: '🤖', label: 'AI Agent', id: 'ai-agent' },
  { href: '/patterns', icon: '🧠', label: 'Örüntü Tanıma', id: 'patterns' },
  { href: '/fraud-prevention', icon: '🛡️', label: 'Dolandırıcılık Önleme', id: 'fraud-prevention' },
  { href: '/iban', icon: '🏦', label: 'IBAN Kontrol', id: 'iban' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logoLink}>
          <img src="/logo.png" alt="SentinelX" className={styles.logoImg} />
          <div className={styles.logoText}>
            <span className={styles.logoName}>SentinelX</span>
            <span className={styles.logoTagline}>Finansal Kalkan</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <span className={styles.navSectionTitle}>Ana Menü</span>
          {navItems.slice(0, 4).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {pathname === item.href && <span className={styles.activeIndicator} />}
            </Link>
          ))}
        </div>

        <div className={styles.navSection}>
          <span className={styles.navSectionTitle}>Yapay Zekâ</span>
          {navItems.slice(4, 7).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {pathname === item.href && <span className={styles.activeIndicator} />}
            </Link>
          ))}
        </div>

        <div className={styles.navSection}>
          <span className={styles.navSectionTitle}>Bankacılık</span>
          {navItems.slice(7).map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${pathname === item.href ? styles.active : ''}`}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {pathname === item.href && <span className={styles.activeIndicator} />}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Status */}
      <div className={styles.bottomSection}>
        <div className={styles.agentStatus}>
          <div className={styles.statusDot} />
          <div className={styles.statusInfo}>
            <span className={styles.statusLabel}>AI Agent</span>
            <span className={styles.statusText}>Aktif — İzleme Modu</span>
          </div>
        </div>
        <div className={styles.teamBadge}>
          <span>Beyond the Kernel</span>
        </div>
      </div>
    </aside>
  );
}
