FROM node:18-bullseye

WORKDIR /app

# Aynı context'teki dosyaları kopyala (artık ../ gerek yok)
COPY package*.json ./
COPY scripts ./scripts
COPY .env.development ./

RUN npm install

# Cron kurulumu
RUN apt-get update && apt-get install -y cron

# Cron job - Her gün saat 02:00'da çalışsın
RUN echo "0 2 * * * cd /app && /usr/local/bin/node scripts/update-countries.js >> /var/log/cron.log 2>&1" > /etc/cron.d/countries-cron
RUN chmod 0644 /etc/cron.d/countries-cron

# Cron'u çalıştır
CMD ["cron", "-f"]