import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 
    `postgresql://${process.env.DB_USER || 'postgres'}:${process.env.DB_PASSWORD || 'mysecretpassword'}@${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || 5432}/${process.env.DB_NAME || 'football'}`,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function GET(request, { params }) {
  try {
    const { id } = params;
    console.log(`🔍 Fetching team with ID: ${id}`);
    
    const result = await pool.query(
      'SELECT * FROM teams WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return Response.json({
        success: false,
        error: 'Team not found'
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      team: result.rows[0]
    });
  } catch (error) {
    console.error('❌ Database error:', error.message);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}