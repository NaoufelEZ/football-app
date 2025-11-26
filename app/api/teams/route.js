import { Pool } from 'pg';

// Database connection - both production and development
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'mysecretpassword'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'football'}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function GET() {
  try {
    console.log('🔍 Fetching teams from database...');
    
    const result = await pool.query(`
      SELECT * FROM teams 
      ORDER BY name
    `);
    
    console.log(`✅ Found ${result.rows.length} teams`);
    
    return Response.json({
      success: true,
      teams: result.rows
    });
  } catch (error) {
    console.error('❌ Database error:', error.message);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}