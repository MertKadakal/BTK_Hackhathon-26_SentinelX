// SentinelX — Mock IBAN Verileri

export const mockIBANs = [
  {
    iban: 'TR12 0001 0012 3456 7890 1234 56',
    holder: 'Ahmet Yılmaz',
    bank: 'Ziraat Bankası',
    riskScore: 8,
    status: 'safe',
    statusLabel: 'Güvenli',
    totalTransfers: 156,
    uniqueContacts: 12,
    totalAmount: 245000,
    avgAmount: 1570,
    frequency: 'Düzenli (Aylık 8-10 işlem)',
    complaints: 0,
    lastActivity: '2026-05-19',
    registrationDate: '2018-03-15',
    notes: 'Uzun süredir aktif, düzenli kullanılan hesap. Şikayet kaydı yok.'
  },
  {
    iban: 'TR98 0006 4000 0011 2345 6789 01',
    holder: 'Elif Demir',
    bank: 'Akbank',
    riskScore: 35,
    status: 'warning',
    statusLabel: 'Riskli',
    totalTransfers: 45,
    uniqueContacts: 28,
    totalAmount: 89000,
    avgAmount: 1978,
    frequency: 'Düzensiz (Haftada 3-15 işlem arası değişken)',
    complaints: 3,
    lastActivity: '2026-05-18',
    registrationDate: '2024-08-10',
    notes: '3 adet banka şikayeti mevcut. Farklı kişilerden yüksek sayıda transfer alıyor. İzleme altında.'
  },
  {
    iban: 'TR55 0001 2345 6789 0123 4567 89',
    holder: 'Şüpheli Hesap A.Ş.',
    bank: 'İş Bankası',
    riskScore: 92,
    status: 'danger',
    statusLabel: 'Tehlikeli',
    totalTransfers: 890,
    uniqueContacts: 456,
    totalAmount: 2340000,
    avgAmount: 2629,
    frequency: 'Çok yoğun (Günde 20-50 işlem)',
    complaints: 47,
    lastActivity: '2026-05-19',
    registrationDate: '2025-01-05',
    notes: '⛔ DOLANDIRICILIK ŞÜPHESİ: 456 farklı kişiden transfer alınmış. 47 banka şikayeti mevcut. Günlük yoğun işlem hacmi. Hesap donduruluması için bankaya bildirim gönderildi.'
  },
  {
    iban: 'TR77 0006 7890 1234 5678 9012 34',
    holder: 'Mehmet Kara',
    bank: 'Garanti BBVA',
    riskScore: 5,
    status: 'safe',
    statusLabel: 'Güvenli',
    totalTransfers: 89,
    uniqueContacts: 8,
    totalAmount: 178000,
    avgAmount: 2000,
    frequency: 'Düzenli (Aylık 5-8 işlem)',
    complaints: 0,
    lastActivity: '2026-05-14',
    registrationDate: '2019-11-20',
    notes: 'Güvenilir hesap. Düzenli ve tutarlı işlem geçmişi.'
  },
  {
    iban: 'TR44 0001 5678 9012 3456 7890 12',
    holder: 'Online Kazanç Ltd.',
    bank: 'Yapı Kredi',
    riskScore: 78,
    status: 'danger',
    statusLabel: 'Tehlikeli',
    totalTransfers: 234,
    uniqueContacts: 189,
    totalAmount: 567000,
    avgAmount: 2423,
    frequency: 'Yoğun (Günde 5-15 işlem)',
    complaints: 22,
    lastActivity: '2026-05-19',
    registrationDate: '2025-06-01',
    notes: '⚠️ Yatırım dolandırıcılığı şüphesi. Çok sayıda farklı kişiden düzenli transfer alıyor. Ponzi şeması olasılığı.'
  },
  {
    iban: 'TR33 0001 0009 8765 4321 0987 65',
    holder: 'Zeynep Arslan',
    bank: 'Halkbank',
    riskScore: 15,
    status: 'safe',
    statusLabel: 'Güvenli',
    totalTransfers: 34,
    uniqueContacts: 5,
    totalAmount: 68000,
    avgAmount: 2000,
    frequency: 'Düzenli (Aylık 3-5 işlem)',
    complaints: 0,
    lastActivity: '2026-05-12',
    registrationDate: '2021-02-28',
    notes: 'Güvenilir hesap. Az sayıda düzenli alıcı ile işlem yapıyor.'
  }
];

export const getIBANStatusColor = (status) => {
  switch (status) {
    case 'safe': return '#00E676';
    case 'warning': return '#FFB300';
    case 'danger': return '#FF3B5C';
    default: return '#94A3B8';
  }
};

export const getIBANRiskLabel = (score) => {
  if (score <= 20) return 'Düşük Risk';
  if (score <= 50) return 'Orta Risk';
  if (score <= 75) return 'Yüksek Risk';
  return 'Çok Yüksek Risk';
};
