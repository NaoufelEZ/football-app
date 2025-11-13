
<span id="ENG"></span>

# ⚽ Football App

[Türkçe](#TUR)


A modern football application with real-time match data, team information, and league standings. Built with Docker, Next.js 14, PostgreSQL, and API-Football integration.

![Docker](https://img.shields.io/badge/Docker-✓-blue)
![NextJS](https://img.shields.io/badge/NextJS-✓-black)
![React](https://img.shields.io/badge/React-✓-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)
![Vercel](https://img.shields.io/badge/Vercel_Deploy-✓-black)

## ✨ Features

- **🏆 Real-time Data**: Live league and team information via API-Football
- **🐳 Docker Containerization**: Entire app runs in Docker containers
- **🗄️ Cloud PostgreSQL**: Neon.tech cloud database with local backup
- **⚡ Next.js 14**: Latest App Router, Server Components, API Routes
- **⏰ Automated Sync**: Daily cron jobs for data synchronization
- **🚀 Production Ready**: Vercel deployment with CI/CD pipeline

## 🛠️ Tech Stack

**Frontend & Backend:**
- Next.js 14 + React 18
- API Routes + Server Components
- Tailwind CSS (optional)

**Database:**
- PostgreSQL (Primary: Neon.tech, Backup: Local Docker)
- pg node.js driver

**DevOps & Infrastructure:**
- Docker + Docker Compose
- GitHub Actions CI/CD
- Vercel Deployment
- Cron Jobs for automation

**APIs:**
- API-Football (https://www.api-football.com/)

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- API-Football account (free tier available)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/football-app.git
cd football-app
```

2. **Set up environment variables:**
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. **Run with Docker (Recommended):**
```bash
docker compose up --build -d
```

4. **Access the application:**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/football/ligler

### Environment Variables
```env
DATABASE_URL=postgresql://user:pass@neon-host/db?sslmode=require
API_FOOTBALL_KEY=your_api_football_key_here
```

## 🏗️ Project Structure
```
football-app/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   │   └── football/   # Football API endpoints
│   └── page.js         # Main page
├── lib/                # Utilities & database
├── scripts/            # Cron job scripts
├── cron-job/           # Docker cron container
├── docker-compose.yml  # Multi-container setup
└── Dockerfile          # Next.js container
```

## 🔄 API Endpoints

- `GET /api/football/ligler` - Get Turkish leagues
- `GET /api/football/countries` - Get countries data
- `GET /api/cron/update-countries` - Manual data sync (cron)

## 🐳 Docker Services

- **app**: Next.js application (port 3000)
- **db**: PostgreSQL database (port 5433)
- **cron-job**: Automated data synchronization

## 🚀 Deployment

### Vercel (Recommended)
1. Fork this repository
2. Connect to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on git push

### Manual Vercel Deploy
```bash
npm i -g vercel
vercel --prod
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [API-Football](https://www.api-football.com/) for sports data
- [Vercel](https://vercel.com) for hosting
- [Neon.tech](https://neon.tech) for PostgreSQL hosting

---

<span id="TUR"></span>

# ⚽ Futbol Uygulaması

[English](#ENG)

Gerçek zamanlı maç verileri, takım bilgileri ve lig sıralamaları içeren modern bir futbol uygulaması. Docker, Next.js 14, PostgreSQL ve API-Football entegrasyonu ile geliştirilmiştir.

![Docker](https://img.shields.io/badge/Docker-✓-blue)
![NextJS](https://img.shields.io/badge/NextJS-✓-black)
![React](https://img.shields.io/badge/React-✓-black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-✓-blue)
![Vercel](https://img.shields.io/badge/Vercel_Deploy-✓-black)

## ✨ Özellikler

- **🏆 Gerçek Zamanlı Veriler**: API-Football ile canlı lig ve takım bilgileri
- **🐳 Docker Containerization**: Tüm uygulama Docker container'larında çalışır
- **🗄️ Cloud PostgreSQL**: Neon.tek cloud veritabanı + local yedek
- **⚡ Next.js 14**: En son App Router, Server Components, API Routes
- **⏰ Otomatik Senkronizasyon**: Günlük cron job'lar ile veri senkronizasyonu
- **🚀 Production Hazır**: CI/CD pipeline ile Vercel deployment

## 🛠️ Teknoloji Stack

**Frontend & Backend:**
- Next.js 14 + React 18
- API Routes + Server Components
- Tailwind CSS (opsiyonel)

**Veritabanı:**
- PostgreSQL (Ana: Neon.tech, Yedek: Local Docker)
- pg node.js driver

**DevOps & Altyapı:**
- Docker + Docker Compose
- GitHub Actions CI/CD
- Vercel Deployment
- Cron Jobs ile otomasyon

**API'ler:**
- API-Football (https://www.api-football.com/)

## 📦 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- Docker & Docker Compose
- API-Football hesabı (ücretsiz tier mevcut)

### Kurulum

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/kullaniciadiniz/football-app.git
cd football-app
```

2. **Environment variables'ı ayarlayın:**
```bash
cp .env.example .env
# .env dosyasını düzenleyin
```

3. **Docker ile çalıştırın (Önerilen):**
```bash
docker compose up --build -d
```

4. **Uygulamaya erişin:**
- Frontend: http://localhost:3000
- API: http://localhost:3000/api/football/ligler

### Environment Variables
```env
DATABASE_URL=postgresql://user:pass@neon-host/db?sslmode=require
API_FOOTBALL_KEY=api_football_anahtarınız
```

## 🏗️ Proje Yapısı
```
football-app/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   │   └── football/   # Football API endpoint'leri
│   └── page.js         # Ana sayfa
├── lib/                # Utilities & veritabanı
├── scripts/            # Cron job script'leri
├── cron-job/           # Docker cron container
├── docker-compose.yml  # Multi-container setup
└── Dockerfile          # Next.js container
```

## 🔄 API Endpoint'leri

- `GET /api/football/ligler` - Türkiye liglerini getir
- `GET /api/football/countries` - Ülke verilerini getir
- `GET /api/cron/update-countries` - Manuel veri senkronizasyonu (cron)

## 🐳 Docker Servisleri

- **app**: Next.js uygulaması (port 3000)
- **db**: PostgreSQL veritabanı (port 5433)
- **cron-job**: Otomatik veri senkronizasyonu

## 🚀 Deployment

### Vercel (Önerilen)
1. Bu repository'yi fork edin
2. Vercel'e bağlayın
3. Environment variables'ı Vercel dashboard'da ayarlayın
4. Git push'ta otomatik deploy

### Manuel Vercel Deploy
```bash
npm i -g vercel
vercel --prod
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır - detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- Spor verileri için [API-Football](https://www.api-football.com/)
- Hosting için [Vercel](https://vercel.com)
- PostgreSQL hosting için [Neon.tech](https://neon.tech)

---

**⭐ Eğer bu projeyi beğendiyseniz, yıldız vermeyi unutmayın!**