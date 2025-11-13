import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET(request) {
  // Cron secret kontrolü (Vercel cron'ları için)
  const authHeader = request.headers.get('Authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_FOOTBALL_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/countries', options);
    const data = await response.json();
    
    const client = await pool.connect();
    let inserted = 0;
    let updated = 0;
    
    for (const country of data.response) {
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
      
      if (result.rows[0].xmax === 0) inserted++;
      else updated++;
    }
    
    client.release();

    return Response.json({
      success: true,
      message: `${inserted} yeni ülke eklendi, ${updated} ülke güncellendi`
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}