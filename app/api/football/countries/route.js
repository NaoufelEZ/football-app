
import { Pool } from 'pg';

// Doğrudan Pool oluştur
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function GET() {
  console.log('🔗 Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
  
  try {
    // Önce basit bir test
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as current_time');
    client.release();
    
    return Response.json({
      success: true,
      message: 'Neon.tech bağlantısı başarılı!',
      current_time: result.rows[0].current_time,
      environment: process.env.NODE_ENV
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
      database_url: process.env.DATABASE_URL ? 'Set' : 'Not set'
    }, { status: 500 });
  }
}


// import { Pool } from 'pg';

// const pool = new Pool({
//   user: process.env.DB_USER || 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   database: process.env.DB_NAME || 'football',
//   password: process.env.DB_PASSWORD || 'mysecretpassword',
//   port: parseInt(process.env.DB_PORT) || 5432,
// });

// export async function GET() {
//   console.log(`🔗 Database connection: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
  
//   const options = {
//     method: 'GET',
//     headers: {
//       'X-RapidAPI-Key': process.env.API_FOOTBALL_KEY,
//       'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
//     }
//   };

//   try {
//     const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/countries', options);
//     const data = await response.json();
    
//     const client = await pool.connect();
    
//     let inserted = 0;
//     let updated = 0;
    
//     for (const country of data.response) {
//       if (!country.code) continue;
      
//       const result = await client.query(`
//         INSERT INTO countries (name, code, flag_url) 
//         VALUES ($1, $2, $3)
//         ON CONFLICT (code) 
//         DO UPDATE SET 
//           name = EXCLUDED.name,
//           flag_url = EXCLUDED.flag_url
//         RETURNING xmax::text::int
//       `, [country.name, country.code, country.flag]);
      
//       if (result.rows[0].xmax === 0) {
//         inserted++;
//       } else {
//         updated++;
//       }
//     }
    
//     client.release();

//     return Response.json({
//       success: true,
//       message: `${inserted} yeni ülke eklendi, ${updated} ülke güncellendi`,
//       db_host: process.env.DB_HOST,
//       total: data.response.length
//     });
//   } catch (error) {
//     return Response.json({
//       success: false,
//       error: error.message,
//       db_host: process.env.DB_HOST
//     }, { status: 500 });
//   }
// }