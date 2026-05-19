# 🛡️ SentinelX - Finansal Güvenlik ve Dolandırıcılık Önleme Platformu

**SentinelX**, BTK Hackathon 2026 için geliştirilmiş, modern teknolojilerle yapılandırılmış bir finansal güvenlik ve dolandırıcılık önleme platformudur. Gerçek zamanlı işlem izleme, akıllı tehdit algılama ve kapsamlı finansal analitik sağlar.

---

## 📑 İçindekiler

1. [Proje Özeti](#proje-özeti)
2. [Temel Özellikler](#temel-özellikler)
3. [Teknoloji Yığını](#teknoloji-yığını)
4. [Proje Yapısı](#proje-yapısı)
5. [Kurulum ve Başlangıç](#kurulum-ve-başlangıç)
6. [Uygulamanın Modülleri](#uygulamanın-modülleri)
7. [Veri Yapısı](#veri-yapısı)
8. [Bileşen Mimarisi](#bileşen-mimarisi)
9. [Geliştirme Rehberi](#geliştirme-rehberi)
10. [Dağıtım](#dağıtım)

---

## 🎯 Proje Özeti

**SentinelX**, finansal kurumlar ve bireysel kullanıcılar için tasarlanmış bir entegre güvenlik çözümüdür. Platform:

- **Gerçek zamanlı işlem monitörizasyonu** ile şüpheli hareketleri anında algılar
- **Dolandırıcılık desenleri analizi** yaparak riski azaltır
- **Sanal kart yönetimi** sağlayarak kartlı işlemleri korur
- **IBAN doğrulama** sistemi ile yanlış transfer işlemlerini önler
- **Yapay zeka destekli analiz** ile tehditleri öngörür
- **Kapsamlı raporlama** ile kullanıcılara detaylı bilgi sunar

Platform Türkçe arayüzü ve yerel finans kuruluşlarının ihtiyaçlarına uygun olarak tasarlanmıştır.

---

## ✨ Temel Özellikler

### 1. **Gerçek Zamanlı İşlem Monitörizasyonu**
   - Tüm finansal işlemlerin anlık takibi
   - İşlem durumu göstergesi (Onaylandı, Reddedildi, Beklemede)
   - İşlem türlerine göre otomatik kategorilendirme
   - Riskli saatlerde uyarı sistemi (01:00-06:00)

### 2. **Dolandırıcılık Desenler Analizi**
   - Kullanıcı davranış paternleri öğrenme
   - Saatlik aktivite analizi
   - Harcama kategorileri raporlaması
   - Haftalık trend analizi
   - Anomali tespiti algoritmaları

### 3. **Sanal Kart Yönetimi**
   - Hızlı sanal kart oluşturma
   - Kart limitleri belirleme
   - Kart etkinleştirme/devre dışı bırakma
   - İşlem geçmişi görüntüleme
   - Tek kullanımlık kart seçeneği

### 4. **IBAN Doğrulama Sistemi**
   - IBAN geçerlilik kontrolleri
   - Banka bilgileri doğrulaması
   - Hatalı IBAN girişi uyarıları
   - IBAN formatı otomatik düzeltme

### 5. **Güvenlik Taraması**
   - Kişisel bilgi güvenliği analizi
   - İnternet güvenlik sorunu tespiti
   - Şifre gücü değerlendirmesi
   - Cihaz güvenliği kontrolü
   - Sürekli tehdit öğrenmesi

### 6. **Yapay Zeka Destekli Analiz (AI Agent)**
   - Doğal dil sorguları
   - Otomatik risk tahminleri
   - İşlem önerileri
   - İllüminatif analitik raporlar

### 7. **Kapsamlı Dashboard**
   - Güvenlik seviyesi görüntüleme
   - En son işlemlerin listelenmesi
   - İstatistiksel özet gösteriler
   - Riskli site uyarıları

---

## 🛠️ Teknoloji Yığını

### Frontend
- **Framework**: Next.js 16.2.6
- **UI Library**: React 19.2.4
- **Styling**: CSS Modules (modern, component-scoped styling)
- **Runtime**: JavaScript (Client/Server Components)

### State Management & Optimization
- React Hooks (useState, useEffect, useContext)
- Client-side rendering optimizasyonu
- SSR (Server-Side Rendering) desteği

### Development Tools
- Node.js (npm package manager)
- Build system: Next.js built-in compiler
- Hot Module Reloading (HMR) desteği

### Configuration
- JavaScript konfigürasyon (next.config.mjs)
- ES Modules desteği
- Custom font optimizasyonu (Geist)

---

## 📁 Proje Yapısı

```
v1/
├── app/                              # Next.js App Router dizini
│   ├── layout.js                     # Root layout bileşeni
│   ├── page.js                       # Ana dashboard sayfası
│   ├── page.module.css               # Dashboard stilleri
│   ├── globals.css                   # Global stiller
│   │
│   ├── ai-agent/                     # Yapay zeka analiz modülü
│   │   ├── page.js                   # AI agent sayfası
│   │   └── page.module.css           # AI agent stilleri
│   │
│   ├── fraud-prevention/             # Dolandırıcılık önleme modülü
│   │   ├── page.js                   # Dolandırıcılık sayfalığı
│   │   └── page.module.css           # Dolandırıcılık stilleri
│   │
│   ├── iban/                         # IBAN doğrulama modülü
│   │   ├── page.js                   # IBAN sayfalığı
│   │   └── page.module.css           # IBAN stilleri
│   │
│   ├── patterns/                     # Davranış desenleri modülü
│   │   ├── page.js                   # Desenler sayfası
│   │   └── page.module.css           # Desenleri stilleri
│   │
│   ├── scanner/                      # Güvenlik taraması modülü
│   │   ├── page.js                   # Tarama sayfası
│   │   └── page.module.css           # Tarama stilleri
│   │
│   ├── transactions/                 # İşlem yönetimi modülü
│   │   ├── page.js                   # İşlemler sayfası
│   │   └── page.module.css           # İşlemler stilleri
│   │
│   └── virtual-cards/                # Sanal kart yönetimi modülü
│       ├── page.js                   # Sanal kart sayfası
│       └── page.module.css           # Sanal kart stilleri
│
├── components/                       # Yeniden kullanılabilir bileşenler
│   ├── Navbar.js                     # Üst navigasyon çubuğu
│   ├── Navbar.module.css             # Navbar stilleri
│   ├── Sidebar.js                    # Yan menü
│   ├── Sidebar.module.css            # Sidebar stilleri
│   ├── ParticlesBackground.js        # Animasyonlu arka plan
│   ├── SecurityGauge.js              # Güvenlik ölçer göstergesi
│   └── SecurityGauge.module.css      # SecurityGauge stilleri
│
├── data/                             # Mock veri kaynakları
│   ├── mock-transactions.js          # Örnek işlem verileri
│   ├── mock-sites.js                 # Örnek site/tüccar verileri
│   ├── mock-virtual-cards.js         # Örnek sanal kart verileri
│   ├── mock-iban.js                  # Örnek IBAN verileri
│   └── mock-user-habits.js           # Örnek kullanıcı davranış verileri
│
├── public/                           # Statik dosyalar (görseller, fontlar, vb.)
│
├── package.json                      # Proje bağımlılıkları ve scriptleri
├── next.config.mjs                   # Next.js konfigürasyonu
├── jsconfig.json                     # JavaScript konfigürasyonu ve path aliases
├── README.md                         # İngilizce README
├── README_TR.md                      # Türkçe README (bu dosya)
├── AGENTS.md                         # Aracı konfigürasyonları
└── CLAUDE.md                         # Claude AI konfigürasyonu
```

---

## 🚀 Kurulum ve Başlangıç

### Gereksinimler
- **Node.js**: 18.0 veya üzeri
- **npm**: 9.0 veya üzeri (veya yarn, pnpm, bun)
- **Git**: Versiyon kontrolü için

### Adım 1: Projeyi Klonlama

```bash
git clone https://github.com/MertKadakal/sentinelx.git
cd sentinelx
```

### Adım 2: Bağımlılıkları Yükleme

```bash
npm install
# veya
yarn install
# veya
pnpm install
# veya
bun install
```

### Adım 3: Geliştirme Sunucusunu Başlatma

```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
# veya
bun dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

### Adım 4: Üretime Hazırlamak

```bash
# Build işlemini çalıştırma
npm run build

# Production sunucusunu başlatma
npm start
```

---

## 📱 Uygulamanın Modülleri

### 1. **Dashboard (Ana Sayfa)**
- **Yol**: `/`
- **Açıklama**: Tüm güvenlik metriklerinin ve son işlemlerin görüntülendiği ana kontrol paneli
- **Bileşenler**: SecurityGauge, son işlem listesi, istatistikler
- **Veriler**: Gerçek zamanlı işlem verileri, kullanıcı alışkanlıkları

### 2. **İşlem Monitörizasyonu** 
- **Yol**: `/transactions`
- **Açıklama**: Tüm finansal işlemlerin detaylı listesi ve filtreleme
- **Özellikler**: 
  - İşlem tarihi, miktarı ve durumu
  - Tüccar bilgileri
  - İşlem türü kategorilendirmesi
  - Durum filtresi (Onaylı, Reddedildi, Beklemede)

### 3. **Sanal Kart Yönetimi**
- **Yol**: `/virtual-cards`
- **Açıklama**: Sanal kartların oluşturulması, yönetimi ve izlenmesi
- **Özellikler**:
  - Kart oluşturma sihirbazı
  - Kart limiti ayarlama
  - Etkinleştirme/devre dışı bırakma
  - İşlem geçmişi

### 4. **IBAN Doğrulama**
- **Yol**: `/iban`
- **Açıklama**: IBAN numaralarının geçerlilik kontrolü ve doğrulaması
- **Özellikler**:
  - Otomatik IBAN format kontrolleri
  - Banka bilgileri doğrulaması
  - Hatalı IBAN uyarıları

### 5. **Dolandırıcılık Desenleri**
- **Yol**: `/fraud-prevention`
- **Açıklama**: Şüpheli davranış paternlerinin ve dolandırıcılık riskinin analizi
- **Özellikler**:
  - Anomali tespiti
  - Riskli sitelerin listesi
  - Uyarı sistemi

### 6. **Davranış Analitiği**
- **Yol**: `/patterns`
- **Açıklama**: Kullanıcı davranış paternlerinin öğrenmesi ve analizi
- **Özellikler**:
  - Saatlik aktivite grafiği
  - Harcama kategorileri
  - Haftalık trendler
  - Öğrenme metrikleri

### 7. **Güvenlik Taraması**
- **Yol**: `/scanner`
- **Açıklama**: Kapsamlı güvenlik analizi ve tehdit taraması
- **Özellikler**:
  - Kişisel bilgi güvenliği
  - İnternet güvenliği
  - Şifre gücü analizi
  - Cihaz güvenliği

### 8. **AI Analiz Aracı**
- **Yol**: `/ai-agent`
- **Açıklama**: Yapay zeka tarafından destekli analiz ve tavsiye sistemi
- **Özellikler**:
  - Doğal dil sorgular
  - Risk değerlendirmesi
  - Otomatik raporlama
  - İllüminatif analitiği

---

## 💾 Veri Yapısı

### İşlem Veri Yapısı (mock-transactions.js)

```javascript
{
  id: string,                    // Benzersiz işlem kimliği
  type: string,                  // İşlem türü (online_shopping, bill_payment, vb.)
  typeLabel: string,             // İşlem türü Türkçe etiketi
  icon: string,                  // İşlem türü emojisi
  merchant: string,              // Tüccar/İşletme adı
  merchantUrl: string,           // Tüccar web sitesi URL'si
  amount: number,                // İşlem tutarı
  currency: string,              // Para birimi (TRY, USD, vb.)
  timestamp: string,             // ISO format tarih-saat
  status: string,                // İşlem durumu (approved, blocked, pending)
  statusLabel: string,           // Durum Türkçe etiketi
  riskScore: number,             // 0-100 arası risk skoru
  deviceInfo: object,            // Cihaz bilgileri
  location: object,              // Coğrafi konum bilgileri
  reason: string                 // Durum sebebi (varsa)
}
```

### Sanal Kart Veri Yapısı (mock-virtual-cards.js)

```javascript
{
  id: string,                    // Kart kimliği
  cardNumber: string,            // Maskelenmiş kart numarası
  cardHolder: string,            // Kart sahibi adı
  expiryDate: string,            // Son kullanma tarihi (MM/YY)
  cvv: string,                   // Maskelenmiş CVV
  status: string,                // Kart durumu (active, inactive, locked)
  limit: number,                 // Kart harcama limiti
  spent: number,                 // Harcanan tutar
  createdAt: string,             // Oluşturma tarihi
  expiresAt: string,             // Son kullanma tarihi
  type: string                   // Kart türü (single-use, monthly, vb.)
}
```

### Kullanıcı Davranış Veri Yapısı (mock-user-habits.js)

```javascript
{
  learningMetrics: {
    normalHours: number[],       // Normal işlem saatleri
    averageDailySpend: number,   // Günlük ortalama harcama
    topMerchants: string[],      // En çok işlem yapılan tüccarlar
    preferredCategories: string[]// Tercih edilen kategoriler
  },
  hourlyActivity: {
    hour: number,                // Saat
    transactions: number,        // İşlem sayısı
    amount: number              // Toplam tutar
  },
  spendingCategories: {
    category: string,           // Kategori adı
    percentage: number,         // Yüzde
    amount: number             // Tutar
  },
  weeklyTrend: {
    day: string,               // Gün
    amount: number             // Tutar
  }
}
```

### IBAN Veri Yapısı (mock-iban.js)

```javascript
{
  iban: string,                  // IBAN numarası
  country: string,               // Ülke kodu (TR, DE, vb.)
  bankCode: string,              // Banka kodu
  accountNumber: string,         // Hesap numarası
  isValid: boolean,              // Geçerlilik durumu
  bankName: string,              // Banka adı
  accountHolder: string,         // Hesap sahibi adı
  checksum: string              // Doğrulama kontrolü
}
```

### Site/Tüccar Veri Yapısı (mock-sites.js)

```javascript
{
  id: string,                    // Site kimliği
  name: string,                  // Site/tüccar adı
  url: string,                   // Web sitesi URL'si
  riskLevel: string,             // Risk seviyesi (low, medium, high, critical)
  riskScore: number,             // 0-100 arası risk skoru
  category: string,              // Tüccar kategorisi
  ssl: boolean,                  // SSL sertifikası olup olmadığı
  complaints: number,            // Şikâyet sayısı
  lastUpdated: string,          // Son güncelleme tarihi
  description: string            // Açıklama
}
```

---

## 🧩 Bileşen Mimarisi

### Navbar (`components/Navbar.js`)
**Amaç**: Üst navigasyon çubuğu ve arama işlevi
**Özellikler**:
- Real-time saat gösterimi
- Riskli saatlerde uyarı (01:00-06:00)
- Global arama kutusu
- Bildirim merkezi
- Kullanıcı profili

**Props**: Hiçbiri (internal state management)
**State**: `time`, `riskHour`

### Sidebar (`components/Sidebar.js`)
**Amaç**: Ana navigasyon menüsü
**Özellikler**:
- Modüllere hızlı erişim
- Aktif sayfa göstergesi
- Daraltılabilir/genişletilebilir menü
- İkon ve metin etiketleri

**Props**: Hiçbiri (route detection)

### SecurityGauge (`components/SecurityGauge.js`)
**Amaç**: Güvenlik seviyesi göstergesi
**Özellikler**:
- Dairesel progress göstergesi
- Renk kodlaması (yeşil, sarı, kırmızı)
- Güvenlik skorunun gerçek zamanlı güncellemesi
- Seviye açıklaması

**Props**: `score` (number: 0-100)
**State**: Internal animation state

### ParticlesBackground (`components/ParticlesBackground.js`)
**Amaç**: Animasyonlu arka plan efekti
**Özellikler**:
- Canvas-based parçacık animasyonu
- Responsive tasarım
- Düşük CPU kullanımı
- Tema uyumluluğu

**Props**: Hiçbiri (full-screen background)

---

## 👨‍💻 Geliştirme Rehberi

### Yeni Bir Sayfa Ekleme

1. **Klasör Oluşturma**:
```bash
mkdir app/my-feature
```

2. **Sayfa Dosyası Oluşturma** (`app/my-feature/page.js`):
```javascript
'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function MyFeaturePage() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={styles.container}>
      {/* İçerik buraya */}
    </div>
  );
}
```

3. **Stil Dosyası Oluşturma** (`app/my-feature/page.module.css`):
```css
.container {
  padding: 20px;
  background-color: #0f172a;
  color: #e2e8f0;
}
```

4. **Sidebar'a Bağlantı Ekleme** (`components/Sidebar.js`):
```javascript
// Sidebar.js içerisinde
<Link href="/my-feature">My Feature</Link>
```

### Yeni Bir Bileşen Ekleme

1. **Bileşen Dosyası Oluşturma** (`components/MyComponent.js`):
```javascript
'use client';
import styles from './MyComponent.module.css';

export default function MyComponent({ prop1, prop2 }) {
  return (
    <div className={styles.wrapper}>
      {/* Bileşen içeriği */}
    </div>
  );
}
```

2. **Stil Dosyası Oluşturma** (`components/MyComponent.module.css`):
```css
.wrapper {
  /* Stiller */
}
```

3. **Bileşeni Kullanma**:
```javascript
import MyComponent from '@/components/MyComponent';

export default function Page() {
  return <MyComponent prop1="value1" prop2="value2" />;
}
```

### Mock Veri Ekleme

1. **Veri Dosyası Oluşturma** (`data/mock-my-data.js`):
```javascript
export const mockMyData = [
  {
    id: '1',
    name: 'Item 1',
    value: 100
  },
  // Daha fazla öğe
];

export const getMyDataById = (id) => {
  return mockMyData.find(item => item.id === id);
};
```

2. **Sayfada Kullanma**:
```javascript
import { mockMyData } from '@/data/mock-my-data';

export default function Page() {
  return (
    <div>
      {mockMyData.map(item => (
        <div key={item.id}>{item.name}: {item.value}</div>
      ))}
    </div>
  );
}
```

### Styling Best Practices

- **CSS Modules Kullanın**: Component-scoped styling için
- **Responsive Tasarım**: `@media` queries ile mobil uyumluluğu sağlayın
- **Renkler**: Tema sistem (koyu tema tercih) tutarlılığı için
- **Grid Layout**: Sayfa düzeni için CSS Grid kullanın
- **Flexbox**: Bileşen düzeni için Flexbox kullanın

### Performance Optimizasyonu

```javascript
// Conditional rendering kullanarak gereksiz renderları önleyin
if (!mounted) return null;

// useCallback ile fonksiyon memoizasyonu
const handleClick = useCallback(() => {
  // İşlem
}, [dependencies]);

// useMemo ile hesaplama memoizasyonu
const expensiveValue = useMemo(() => {
  return complexCalculation();
}, [dependencies]);
```

---

## 📦 Dağıtım

### Vercel'e Dağıtım (Önerilen)

1. **Vercel Hesabı Oluşturma**:
   - [vercel.com](https://vercel.com) adresine gidin
   - GitHub hesabınızla giriş yapın

2. **Projeyi Bağlama**:
   - "New Project" seçeneğini tıklayın
   - GitHub repository'sini seçin
   - "Deploy" butonuna tıklayın

3. **Otomatik Dağıtım**:
   - Her git push otomatik olarak dağıtılır
   - Production URL'si sağlanır

### Docker ile Dağıtım

1. **Dockerfile Oluşturma**:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

2. **Docker Image'ı Oluşturma**:
```bash
docker build -t sentinelx:latest .
```

3. **Container'ı Çalıştırma**:
```bash
docker run -p 3000:3000 sentinelx:latest
```

### Manual Server Dağıtımı

1. **Server Kurulumu**:
```bash
# SSH ile server'a bağlanma
ssh user@your-server.com

# Node.js yükleme (eğer yüklü değilse)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Projeyi klonlama
git clone https://github.com/MertKadakal/sentinelx.git
cd sentinelx
```

2. **Bağımlılıkları Yükleme ve Build**:
```bash
npm install
npm run build
```

3. **PM2 ile Process Management**:
```bash
# PM2 yükleme (global)
npm install -g pm2

# Uygulamayı başlatma
pm2 start "npm start" --name "sentinelx"

# PM2 otomatik başlatma
pm2 startup
pm2 save
```

4. **Nginx Reverse Proxy Kurulumu**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🔧 Sorun Giderme

### Yaygın Sorunlar ve Çözümleri

#### Sorun: "Module not found" hatası
**Çözüm**:
```bash
# node_modules silme ve yeniden yükleme
rm -rf node_modules package-lock.json
npm install
```

#### Sorun: "Port 3000 zaten kullanımda"
**Çözüm**:
```bash
# Farklı port kullanma
PORT=3001 npm run dev

# Veya mevcut process'i temizleme (Linux/Mac)
lsof -ti:3000 | xargs kill -9
```

#### Sorun: CSS stilleri uygulanmıyor
**Çözüm**:
- CSS Modules adlandırması kontrol edin (`.module.css`)
- Import yolunun doğru olduğundan emin olun
- Browser cache'i temizleyin (Ctrl+Shift+Delete)

#### Sorun: Sayfa hata veriyor
**Çözüm**:
- Browser console'u açın (F12)
- Hata mesajını kontrol edin
- Server log'larını kontrol edin
- Network tab'ında istekleri kontrol edin

---

## 📚 Kaynaklar

### Resmi Belgeler
- [Next.js Dokümantasyonu](https://nextjs.org/docs)
- [React Dokümantasyonu](https://react.dev)
- [CSS Modules Rehberi](https://nextjs.org/docs/app/building-your-application/styling/css-modules)

### Ek Kaynaklar
- [MDN Web Docs](https://developer.mozilla.org/)
- [JavaScript.info](https://javascript.info/)
- [CSS-Tricks](https://css-tricks.com/)

---

## 🤝 Katkıda Bulunma

Projeye katkıda bulunmak istiyorsanız:

1. **Fork'layın**: GitHub'da repository'yi fork'layın
2. **Branch Oluşturun**: `git checkout -b feature/amazing-feature`
3. **Değişiklikleri Commit'leyin**: `git commit -m 'Add amazing feature'`
4. **Push'layın**: `git push origin feature/amazing-feature`
5. **Pull Request Açın**: Değişiklikleri incelemesi için PR açın

### Katkı Kuralları
- Kod stil tutarlılığını koruyun
- Yeni özellikleri test edin
- Dokümantasyonu güncelleyin
- İngilizce commit mesajları yazın

---

## 📞 İletişim

### Sorular ve Öneriler
- **GitHub Issues**: [GitHub Issues](https://github.com/MertKadakal/sentinelx/issues)

---

## 🙏 Teşekkürler

- **BTK Hackathon 2026** komitesine
- Tüm **katkıda bulunanlara**
- **Open source topluluğu**na

---

## 📝 Sürüm Geçmişi

### v0.1.0 (2026-05-19)
- İlk sürüm yayımlandı
- Dashboard, işlem monitörizasyonu, IBAN doğrulama
- Sanal kart yönetimi
- Güvenlik taraması
- AI analiz aracı

---

## 🔐 Güvenlik

### Güvenlik Kontrol Listesi
- ✅ HTTPS/SSL kullanın
- ✅ Hassas verileri şifreleyin
- ✅ XSS saldırılarına karşı koruma
- ✅ CSRF koruması
- ✅ Rate limiting

---

**Son Güncelleme**: 19 Mayıs 2026

---

*SentinelX - Finansal Güvenlik ve Dolandırıcılık Önleme Çözümü | BTK Hackathon 2026*
