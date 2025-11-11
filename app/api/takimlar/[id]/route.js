import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'football-db',
  database: 'football',
  password: 'mysecretpassword',
  port: 5432,
});

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const client = await pool.connect();
    
    const result = await client.query(`
      SELECT 
        dt.*,
        l.ad as lig_adi,
        l.ulke as lig_ulkesi
      FROM detayli_takimlar dt
      LEFT JOIN ligler l ON dt.lig_id = l.id
      WHERE dt.id = $1
    `, [id]);
    
    client.release();

    if (result.rows.length === 0) {
      return Response.json({ 
        success: false,
        error: 'Takım bulunamadı' 
      }, { status: 404 });
    }

    return Response.json({ 
      success: true,
      takim: result.rows[0]
    });
  } catch (error) {
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}