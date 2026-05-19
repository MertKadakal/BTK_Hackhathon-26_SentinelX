# BTK_Hackhathon-26_SentinelX
# 🛡️ SentinelX

**Beyond the Kernel** takımı tarafından **BTK & Google Hackathon 2026** için geliştirilmiş, tarayıcı katmanından banka çekirdek (core) sistemlerine uzanan, yapay zeka ajanları tabanlı web tabanlı finansal güvenlik platformu.

---

## 📌 Proje Vizyonu
> *"Dijital finansın sınırlarında, siber tehditler daha oluşmadan devreye giren en zeki kalkan olmak."*

Günümüz dijital bankacılık ekosisteminde dolandırıcılık tespiti genellikle reaktiftir (işlem gerçekleştikten sonra müdahale edilir). **SentinelX AI**, tarayıcı tabanlı yapay zeka ajanları, katlamalı öğrenme (ensemble learning) ve gelişmiş RAG mimarisi kullanarak tehditleri henüz işlem öncesinde (pre-transaction) engellemeyi hedefleyen, uçtan uca bir proaktif koruma döngüsüdür.

---

## ⚙️ Temel Özellikler & Çalışma Mimarisi

Sistem, her finansal etkileşim için kesintisiz bir **Öncesi - Sırası - Sonrası** döngüsü işletir:

### 1. İşlem Öncesi (Pre-Transaction) Koruması
*   **Web Güvenilirlik Skoru:** Kullanıcı bir e-ticaret ya da finans sitesini ziyaret ettiğinde, tarayıcı tabanlı yapay zeka ajanı sitenin sızıntı geçmişini, siber saldırı istatistiklerini ve 3D Secure altyapısını anlık olarak inceler ve bir güven skoru üretir.
*   **3D Secure & Zafiyet Analizi:** Üç boyutlu doğrulama altyapısı zayıf veya şüpheli olan sitelerde kullanıcıyı uyararak hassas kredi kartı bilgilerini girmesini engeller.

### 2. İşlem Sırası (In-Transaction) Dinamik Sanal Kart Motoru
*   **Anlık Dinamik Sanal Kart:** Güven skoru düşük sitelerde yapay zeka ajanı arka planda banka API'si ile konuşarak **yalnızca alınacak ürünün tutarı kadar** bakiye tanımlanmış geçici bir sanal kart üretir.
*   **Anında İmha:** Ödeme tamamlandığı an, üretilen sanal kart milisaniyeler içinde iptal edilerek gelecekteki olası veri sızıntılarına karşı mutlak koruma sağlanır.

### 3. İşlem Sonrası (Post-Transaction) & Otomatik Banka Entegrasyonu
*   **Doğrudan Veri Tabanı Güncellemesi:** Herhangi bir dolandırıcılık aktivitesi saptandığında, yapay zeka ajanı doğrudan banka merkezi veri tabanına (Core-DB) ilgili siteyi ve POS terminalini zararlı olarak ekler. Gelecekte o POS cihazından gelecek tüm istekler otomatik olarak reddedilir.
*   **IBAN Ağ Analizi (Graph Analysis):** IBAN tabanlı dolandırıcılıkların önlenmesi amacıyla, fon transferi yapılmak istenen IBAN'ın geçmiş işlem sıklığı, hacmi ve banka şikayet kayıtları grafik veri tabanı analitiği ile incelenerek risk haritası çıkarılır.

---

## 🧠 Yapay Zeka ve Alışkanlık Tanıma Motoru

KernShield AI, kullanıcının finansal davranış kalıplarını zaman serisi analizleri ve katlamalı öğrenme modelleriyle öğrenir.

*   **İzlenen Davranış Kalıpları:** Kredi kartı borcu ödeme sıklığı, fatura döngüleri, EFT/FAST/Havale/Virman alışkanlıkları ve internet alışverişi rutinleri.
*   **BDDK Uyumlu Zaman Analizi:** BDDK siber risk raporlarına dayanarak, siber saldırıların en yoğun olduğu **gece 01:00 ile sabah 06:00** saatleri arasındaki işlemler, kullanıcının lokal saatine ve biyometrik/davranışsal haritasına uymuyorsa (Mail Order dahil) ek yetkilendirmeye tabi tutulur.
*   **Takvim ve Lokasyon Doğrulaması:** Kullanıcının takvimi kontrol edilir; eğer yurt dışı seyahat planı bulunmuyorsa, uzak coğrafyalardan (Seyahat acenteleri, araç kiralama vb.) gelen şüpheli harcamalar anında bloke edilerek basılı kart iptal sürecine alınır, banka ve kullanıcı eş zamanlı uyarılır.

---

## 🛠️ Kullanılan Teknolojiler

*   **Yapay Zeka & Ajan Mimarisi:** Gelişmiş RAG (Retrieval-Augmented Generation), Çoklu Ajan Sistemleri (Multi-Agent Systems), Katlamalı Öğrenme (Ensemble Learning).
*   **Geliştirme Ortamı:** Google Antigravity Workspace (Otonom Ajan Entegrasyonlu IDE).
*   **Frontend / Tarayıcı Katmanı:** Web-based Browser Extension & Web Dashboard.
*   **Backend & Analitik:** Python (Veri analitiği ve modelleme), Node.js / Go (Yüksek performanslı finansal API geçitleri).
*   **Veri Tabanı & Ağ Analizi:** Graph Database (IBAN ilişkisel ağ takibi için), Güvenli İlişkisel Veri Tabanları.

---

## 🏗️ Kurulum ve Çalıştırma

### Gereksinimler
*   Node.js (v18+) veya Python (v3.10+)
*   Google Antigravity Workspace Kurulumu (Geliştirici Ajanları için)

### Adımlar
1. Projeyi klonlayın:
   ```bash
   git clone [https://github.com/username/kernshield-ai.git](https://github.com/username/kernshield-ai.git)
   cd kernshield-ai

2.Bağımlılıkları yükleyin:
  ```bash
  npm install  # Frontend ve extension bağımlılıkları için
  pip install -r requirements.txt  # Yapay zeka ve analitik motoru için

3.Çevre değişkenlerini yapılandırın (`.env` dosyasını oluşturun):
   ```env
   BANK_API_KEY=your_mock_bank_key
   AI_AGENT_MODEL=google-gemini-2026

4.Uygulamayı yerel ortamda başlatın:
   ```Bash
  npm run start

  ---

## 👥 Beyond the Kernel Takımı

Bu proje, BTK & Google Hackathon 2026 kapsamında finansal siber güvenliğe yeni bir standart kazandırmak amacıyla **Beyond the Kernel** ekibi tarafından geliştirilmiştir.

---
