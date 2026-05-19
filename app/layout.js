import './globals.css';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import ParticlesBackground from '@/components/ParticlesBackground';

export const metadata = {
  title: 'SentinelX — Finansal Dolandırıcılık Önleme Platformu',
  description: 'Yapay zekâ destekli finansal güvenlik platformu. Web sitesi güvenlik skorlaması, sanal kart oluşturma, dolandırıcılık tespiti ve banka entegrasyonu.',
  keywords: 'finans, siber güvenlik, dolandırıcılık, yapay zeka, AI agent, sanal kart, güvenlik skoru',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body>
        <ParticlesBackground />
        <div className="app-layout">
          <Sidebar />
          <main className="main-content">
            <Navbar />
            <div className="page-content">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
