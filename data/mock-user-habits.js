// SentinelX — Mock Kullanıcı Alışkanlık Verileri & Pattern Recognition Data

export const mockUserProfile = {
  name: 'Emre Kaya',
  email: 'emre.kaya@email.com',
  phone: '+90 532 xxx xx xx',
  bankName: 'Garanti BBVA',
  cardLast4: '4521',
  memberSince: '2020-03-15',
  location: { country: 'TR', city: 'İstanbul', timezone: 'Europe/Istanbul' },
  riskTolerance: 'medium',
  patternConfidence: 87, // %87 güvenle alışkanlıklar öğrenildi
};

// Saatlik işlem dağılımı (24 saat) — Pattern Recognition Engine verisi
export const hourlyActivity = [
  { hour: 0, count: 2, risk: 'high' },
  { hour: 1, count: 1, risk: 'critical' },  // BDDK: Yüksek risk saati
  { hour: 2, count: 0, risk: 'critical' },  // BDDK: Yüksek risk saati
  { hour: 3, count: 1, risk: 'critical' },  // BDDK: Yüksek risk saati
  { hour: 4, count: 0, risk: 'critical' },  // BDDK: Yüksek risk saati
  { hour: 5, count: 0, risk: 'critical' },  // BDDK: Yüksek risk saati
  { hour: 6, count: 1, risk: 'high' },
  { hour: 7, count: 3, risk: 'low' },
  { hour: 8, count: 8, risk: 'low' },
  { hour: 9, count: 15, risk: 'low' },
  { hour: 10, count: 22, risk: 'low' },
  { hour: 11, count: 18, risk: 'low' },
  { hour: 12, count: 25, risk: 'low' },      // En yoğun: Öğle
  { hour: 13, count: 20, risk: 'low' },
  { hour: 14, count: 16, risk: 'low' },
  { hour: 15, count: 14, risk: 'low' },
  { hour: 16, count: 12, risk: 'low' },
  { hour: 17, count: 18, risk: 'low' },
  { hour: 18, count: 28, risk: 'low' },      // En yoğun: Akşam
  { hour: 19, count: 32, risk: 'low' },      // En yoğun: Akşam
  { hour: 20, count: 26, risk: 'low' },
  { hour: 21, count: 15, risk: 'medium' },
  { hour: 22, count: 8, risk: 'medium' },
  { hour: 23, count: 4, risk: 'high' },
];

// Harcama kategorileri dağılımı
export const spendingCategories = [
  { name: 'İnternet Alışverişi', icon: '🛒', amount: 12450, percentage: 32, count: 24, color: '#00D4FF' },
  { name: 'Fatura Ödeme', icon: '📄', amount: 4890, percentage: 13, count: 8, color: '#00E676' },
  { name: 'EFT / Havale', icon: '💸', amount: 8500, percentage: 22, count: 6, color: '#FFB300' },
  { name: 'FAST Transfer', icon: '⚡', amount: 3750, percentage: 10, count: 5, color: '#7B2DFF' },
  { name: 'Kredi Kartı Borcu', icon: '💳', amount: 3245, percentage: 8, count: 1, color: '#FF3B5C' },
  { name: 'Virman', icon: '🔄', amount: 5000, percentage: 13, count: 2, color: '#FF6B81' },
  { name: 'Yurt Dışı Harcama', icon: '🌍', amount: 850, percentage: 2, count: 1, color: '#69F0AE' },
];

// Haftalık harcama trendi (son 7 gün)
export const weeklyTrend = [
  { day: 'Pazartesi', amount: 1250, transactions: 4 },
  { day: 'Salı', amount: 3480, transactions: 6 },
  { day: 'Çarşamba', amount: 890, transactions: 3 },
  { day: 'Perşembe', amount: 2150, transactions: 5 },
  { day: 'Cuma', amount: 4620, transactions: 8 },
  { day: 'Cumartesi', amount: 6780, transactions: 12 },
  { day: 'Pazar', amount: 2340, transactions: 5 },
];

// Coğrafi harcama verileri
export const geographicData = [
  { country: 'Türkiye', code: 'TR', amount: 35240, percentage: 92, transactions: 42, status: 'normal' },
  { country: 'Almanya', code: 'DE', amount: 1850, percentage: 5, transactions: 2, status: 'normal' },
  { country: 'ABD', code: 'US', amount: 890, percentage: 2, transactions: 1, status: 'normal' },
  { country: 'İngiltere', code: 'GB', amount: 350, percentage: 1, transactions: 1, status: 'suspicious' },
];

// Takvim verileri (seyahat planları)
export const calendarEvents = [
  {
    id: 'CAL-001',
    title: 'Almanya İş Seyahati',
    startDate: '2026-06-15',
    endDate: '2026-06-20',
    location: 'Berlin, Almanya',
    type: 'travel',
    status: 'planned'
  },
  {
    id: 'CAL-002',
    title: 'Antalya Tatili',
    startDate: '2026-07-01',
    endDate: '2026-07-10',
    location: 'Antalya, Türkiye',
    type: 'travel',
    status: 'planned'
  },
];

// Pattern anomalileri — AI tarafından tespit edilenler
export const detectedAnomalies = [
  {
    id: 'ANO-001',
    type: 'time_anomaly',
    severity: 'critical',
    title: 'Gece Saati İşlemi',
    description: 'Saat 03:24\'de yapılmaya çalışılan işlem. Kullanıcı normalde bu saatte işlem yapmaz.',
    timestamp: new Date().toISOString(),
    relatedTxn: 'TXN-009',
    action: 'blocked',
    source: 'BDDK - Bankacılık Denetleme ve Düzenleme Kurumu: 01:00-06:00 arası siber saldırı yoğunluğu en yüksek saatler.'
  },
  {
    id: 'ANO-002',
    type: 'location_anomaly',
    severity: 'critical',
    title: 'Planlanmamış Yurt Dışı Harcama',
    description: 'İngiltere\'den araç kiralama harcaması. Takvimde İngiltere seyahat planı bulunamadı.',
    timestamp: new Date().toISOString(),
    relatedTxn: 'TXN-008',
    action: 'blocked',
    source: 'Takvim Entegrasyonu & Coğrafi Profil Analizi'
  },
  {
    id: 'ANO-003',
    type: 'amount_anomaly',
    severity: 'high',
    title: 'Yüksek Tutarlı Mail Order',
    description: 'Romanya\'dan 8.900 TL tutarında mail order işlem. Ortalama işlem tutarının 4 katı.',
    timestamp: new Date().toISOString(),
    relatedTxn: 'TXN-011',
    action: 'blocked',
    source: 'Pattern Recognition Engine - Tutar Analizi'
  },
  {
    id: 'ANO-004',
    type: 'site_anomaly',
    severity: 'medium',
    title: 'Düşük Skorlu Site Alışverişi',
    description: 'Güvenlik skoru 35/100 olan sitede alışveriş girişimi.',
    timestamp: new Date().toISOString(),
    relatedTxn: 'TXN-007',
    action: 'virtual_card',
    source: 'Security Engine - Site Skor Analizi'
  },
];

// AI Agent öğrenme metrikleri
export const learningMetrics = {
  totalTransactionsAnalyzed: 1247,
  patternsIdentified: 23,
  anomaliesDetected: 18,
  fraudsPrevented: 7,
  falsePositives: 2,
  accuracy: 94.3,
  lastUpdated: new Date().toISOString(),
  confidenceScore: 87,
  iterationsCompleted: 156,
};
