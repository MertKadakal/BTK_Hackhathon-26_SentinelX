// SentinelX — Mock Sanal Kart Verileri

export const mockVirtualCards = [
  {
    id: 'VC-001',
    cardNumber: '5412 •••• •••• 8901',
    last4: '8901',
    status: 'active',
    statusLabel: 'Aktif',
    createdAt: new Date(Date.now() - 1800000).toISOString(), // 30 dk önce
    expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 saat sonra
    balance: 189.90,
    originalAmount: 189.90,
    merchant: 'SuperDeals Shop',
    merchantUrl: 'superdeals-shop.xyz',
    siteScore: 35,
    reason: 'Düşük güvenlik skorlu site (35/100). 3D Secure desteği yok.',
    usedAmount: 0,
    autoCancel: true,
    cvv: '***',
  },
  {
    id: 'VC-002',
    cardNumber: '5412 •••• •••• 3456',
    last4: '3456',
    status: 'used',
    statusLabel: 'Kullanıldı & İptal Edildi',
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
    expiresAt: null,
    cancelledAt: new Date(Date.now() - 82800000).toISOString(),
    balance: 0,
    originalAmount: 649.00,
    merchant: 'Pazarama',
    merchantUrl: 'pazarama.com',
    siteScore: 62,
    reason: 'Orta seviye güvenlik skoru (62/100). 3D Secure 1.0 (zayıf).',
    usedAmount: 649.00,
    autoCancel: true,
    cvv: '***',
  },
  {
    id: 'VC-003',
    cardNumber: '5412 •••• •••• 7890',
    last4: '7890',
    status: 'cancelled',
    statusLabel: 'İptal Edildi',
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 gün önce
    expiresAt: null,
    cancelledAt: new Date(Date.now() - 172000000).toISOString(),
    balance: 0,
    originalAmount: 299.90,
    merchant: 'Ucuz Elektronik',
    merchantUrl: 'ucuzelektronik.net',
    siteScore: 28,
    reason: 'Tehlikeli site tespit edildi (28/100). Kart otomatik iptal edildi.',
    usedAmount: 0,
    autoCancel: true,
    cvv: '***',
  },
];

export const getCardStatusColor = (status) => {
  switch (status) {
    case 'active': return '#00E676';
    case 'used': return '#FFB300';
    case 'cancelled': return '#FF3B5C';
    default: return '#94A3B8';
  }
};
