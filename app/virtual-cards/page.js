'use client';
import { useState } from 'react';
import { mockVirtualCards, getCardStatusColor } from '@/data/mock-virtual-cards';
import styles from './page.module.css';

export default function VirtualCardsPage() {
  const [cards, setCards] = useState(mockVirtualCards);
  const [showCreate, setShowCreate] = useState(false);
  const [newCardAmount, setNewCardAmount] = useState('');
  const [newCardMerchant, setNewCardMerchant] = useState('');
  const [creating, setCreating] = useState(false);

  const handleCreate = () => {
    if (!newCardAmount || !newCardMerchant) return;
    setCreating(true);
    setTimeout(() => {
      const newCard = {
        id: `VC-${String(cards.length + 1).padStart(3, '0')}`,
        cardNumber: `5412 •••• •••• ${Math.floor(1000 + Math.random() * 9000)}`,
        last4: String(Math.floor(1000 + Math.random() * 9000)),
        status: 'active',
        statusLabel: 'Aktif',
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 3600000).toISOString(),
        balance: parseFloat(newCardAmount),
        originalAmount: parseFloat(newCardAmount),
        merchant: newCardMerchant,
        merchantUrl: '',
        siteScore: null,
        reason: 'Kullanıcı tarafından manuel oluşturuldu.',
        usedAmount: 0,
        autoCancel: true,
        cvv: '***',
      };
      setCards([newCard, ...cards]);
      setShowCreate(false);
      setNewCardAmount('');
      setNewCardMerchant('');
      setCreating(false);
    }, 1500);
  };

  const handleCancel = (cardId) => {
    setCards(cards.map(c => c.id === cardId ? { ...c, status: 'cancelled', statusLabel: 'İptal Edildi', cancelledAt: new Date().toISOString(), balance: 0 } : c));
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>🃏 Sanal Kart Yönetimi</h1>
          <p className={styles.subtitle}>Güvensiz siteler için tek kullanımlık sanal kartlar. Ödeme sonrası otomatik iptal.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowCreate(!showCreate)}>
          ➕ Yeni Kart Oluştur
        </button>
      </div>

      {/* Create Card Form */}
      {showCreate && (
        <div className={`glass-card ${styles.createForm}`}>
          <h3 className={styles.formTitle}>🃏 Yeni Sanal Kart Oluştur</h3>
          <p className={styles.formDesc}>Kart bakiyesi, alınacak ürün fiyatı kadar tanımlanır. Ödeme sonrası kart otomatik iptal edilir.</p>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label>Mağaza / Site Adı</label>
              <input
                type="text"
                value={newCardMerchant}
                onChange={(e) => setNewCardMerchant(e.target.value)}
                placeholder="örn: SuperDeals Shop"
                className="input-field"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Ürün Fiyatı (₺)</label>
              <input
                type="number"
                value={newCardAmount}
                onChange={(e) => setNewCardAmount(e.target.value)}
                placeholder="örn: 299.90"
                className="input-field"
              />
            </div>
          </div>
          <div className={styles.formActions}>
            <button className="btn-primary" onClick={handleCreate} disabled={creating}>
              {creating ? '⟳ Oluşturuluyor...' : '🃏 Sanal Kart Oluştur'}
            </button>
            <button className="btn-secondary" onClick={() => setShowCreate(false)}>İptal</button>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        {cards.map((card, i) => (
          <div key={card.id} className={`glass-card ${styles.cardWrapper}`} style={{ animationDelay: `${i * 0.08}s` }}>
            {/* 3D Card Visual */}
            <div className={`${styles.card3d} ${card.status === 'cancelled' ? styles.cardCancelled : card.status === 'used' ? styles.cardUsed : ''}`}>
              <div className={styles.cardFront}>
                <div className={styles.cardTopRow}>
                  <span className={styles.cardBrand}>SentinelX Virtual</span>
                  <span className={`badge badge-${card.status === 'active' ? 'safe' : card.status === 'used' ? 'warning' : 'danger'}`}>
                    {card.statusLabel}
                  </span>
                </div>
                <div className={styles.cardChip}>
                  <div className={styles.chipLines}>
                    <span /><span /><span /><span />
                  </div>
                </div>
                <div className={styles.cardNumber}>{card.cardNumber}</div>
                <div className={styles.cardBottomRow}>
                  <div>
                    <span className={styles.cardLabel}>BAKİYE</span>
                    <span className={styles.cardBalance}>₺{card.balance.toLocaleString('tr-TR')}</span>
                  </div>
                  <div>
                    <span className={styles.cardLabel}>CVV</span>
                    <span className={styles.cardCvv}>{card.cvv}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Info */}
            <div className={styles.cardInfo}>
              <div className={styles.cardInfoRow}>
                <span className={styles.cardInfoLabel}>Mağaza</span>
                <span className={styles.cardInfoValue}>{card.merchant}</span>
              </div>
              <div className={styles.cardInfoRow}>
                <span className={styles.cardInfoLabel}>Orijinal Tutar</span>
                <span className={styles.cardInfoValue}>₺{card.originalAmount.toLocaleString('tr-TR')}</span>
              </div>
              <div className={styles.cardInfoRow}>
                <span className={styles.cardInfoLabel}>Oluşturulma</span>
                <span className={styles.cardInfoValue}>{new Date(card.createdAt).toLocaleString('tr-TR')}</span>
              </div>
              {card.reason && (
                <div className={styles.cardReason}>
                  <span>💡</span> {card.reason}
                </div>
              )}
              {card.status === 'active' && (
                <button className="btn-danger" style={{ width: '100%', marginTop: '10px' }} onClick={() => handleCancel(card.id)}>
                  ❌ Kartı İptal Et
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Info Banner */}
      <div className={`glass-card ${styles.infoBanner}`}>
        <h3>🔒 Sanal Kart Nasıl Çalışır?</h3>
        <div className={styles.steps}>
          <div className={styles.step}><span className={styles.stepNum}>1</span><span>Düşük güvenlik skorlu site tespit edilir</span></div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}><span className={styles.stepNum}>2</span><span>Ürün fiyatı kadar bakiyeli sanal kart oluşturulur</span></div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}><span className={styles.stepNum}>3</span><span>Ödeme yapılır</span></div>
          <div className={styles.stepArrow}>→</div>
          <div className={styles.step}><span className={styles.stepNum}>4</span><span>Kart anında iptal edilir — bilgi güvenliği sağlanır</span></div>
        </div>
      </div>
    </div>
  );
}
