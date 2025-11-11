import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function GET() {
  const currentYear = new Date().getFullYear();
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.API_FOOTBALL_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(
      `https://api-football-v1.p.rapidapi.com/v3/leagues?country=Turkey&season=${currentYear}`, 
      options
    );
    const data = await response.json();

    return Response.json({
      success: true,
      ligler: data.response || [],
      season: currentYear
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}