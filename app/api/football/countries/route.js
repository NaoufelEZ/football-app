import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // Neon için şart
});

export async function GET() {
  try {
    const apiKey = process.env.API_FOOTBALL_KEY;
    if (!apiKey) {
      return Response.json({ success: false, error: "API key missing" }, { status: 500 });
    }

    // 1️⃣ API-Football’dan ülke verilerini çek
    const res = await fetch("https://v3.football.api-sports.io/countries", {
      headers: {
        "x-apisports-key": apiKey,
      },
    });

    const data = await res.json();
    if (!data.response) {
      return Response.json({ success: false, error: "Invalid API response" }, { status: 500 });
    }

    // 2️⃣ Ülkeleri veritabanına ekle
    const client = await pool.connect();
    for (const country of data.response) {
      await client.query(
        `INSERT INTO countries (name, code, flag)
         VALUES ($1, $2, $3)
         ON CONFLICT (code) DO NOTHING`,
        [country.name, country.code, country.flag]
      );
    }
    client.release();

    // 3️⃣ Geri dönüş
    return Response.json({
      success: true,
      message: "Ülkeler başarıyla kaydedildi!",
      count: data.response.length,
    });
  } catch (error) {
    console.error("API error:", error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
