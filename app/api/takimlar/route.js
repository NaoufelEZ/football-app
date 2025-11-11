import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'football-db',
  database: 'football',
  password: 'mysecretpassword',
  port: 5432,
});

export async function GET() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM takimlar');
    client.release();
    
    return Response.json({ 
      success: true,
      takimlar: result.rows 
    });
  } catch (error) {
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}