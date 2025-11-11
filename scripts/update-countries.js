require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'football',
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  port: parseInt(process.env.DB_PORT) || 5432,
});


async function updateCountries() {
  console.log(`🔄 [${new Date().toISOString()}] Countries güncelleme başlıyor...`);
  console.log(`🔗 Script database: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  // console.log(`📍 Database host: ${dbHost}:${pool.options.port}`);
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_FOOTBALL_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/countries', options);
    
    if (!response.ok) {
      throw new Error(`API hatası: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    console.log(`📊 API'den ${data.response?.length || 0} ülke alındı`);
    
    const client = await pool.connect();
    
    let inserted = 0;
    let updated = 0;
    
    for (const country of data.response || []) {
      if (!country.code) continue;
      
      const result = await client.query(`
        INSERT INTO countries (name, code, flag_url) 
        VALUES ($1, $2, $3)
        ON CONFLICT (code) 
        DO UPDATE SET 
          name = EXCLUDED.name,
          flag_url = EXCLUDED.flag_url
        RETURNING xmax::text::int
      `, [country.name, country.code, country.flag]);
      
      if (result.rows[0].xmax === 0) {
        inserted++;
      } else {
        updated++;
      }
    }
    
    client.release();

    console.log(`✅ [${new Date().toISOString()}] ${inserted} yeni eklendi, ${updated} güncellendi`);
    
  } catch (error) {
    console.error(`❌ [${new Date().toISOString()}] Hata:`, error.message);
  } finally {
    await pool.end();
  }
}

// Script doğrudan çalıştırılıyorsa
if (require.main === module) {
  updateCountries();
}

module.exports = updateCountries;