import Link from 'next/link';

async function getLeagues() {
  try {
    const res = await fetch('http://localhost:3000/api/football/ligler', {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Ligler API hatası:', error);
    return { success: false, ligler: [] }; // Eski yapıyı koru
  }
}

async function getDatabaseTeams() {
  try {
    const res = await fetch('http://localhost:3000/api/teams', {
      cache: 'no-store'
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Teams API hatası:', error);
    return { success: false, teams: [] };
  }
}

export default async function Home() {
  const [footballData, dbTeams] = await Promise.all([
    getLeagues(),
    getDatabaseTeams()
  ]);

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>⚽ Football App - LIVE DATA</h1>
      <p>Working with real API-Football data!</p>
      
      <h2>🇹🇷 Turkey Leagues:</h2>
      
      {footballData.success && footballData.ligler && footballData.ligler.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {footballData.ligler.map((lig, index) => (
            <div key={index} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>🏆 {lig.league?.name || 'Unknown League'}</h3>
              <p><strong>Season:</strong> {lig.seasons?.[0]?.year || 'Unknown'}</p>
              <p><strong>Start:</strong> {lig.seasons?.[0]?.start || 'Unknown'}</p>
              <p><strong>End:</strong> {lig.seasons?.[0]?.end || 'Unknown'}</p>
              {lig.league?.logo && (
                <img 
                  src={lig.league.logo} 
                  alt={lig.league.name}
                  style={{ width: '50px', height: '50px' }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>❌ API connection error or no leagues found.</p>
          <div style={{ marginTop: '10px' }}>
            <Link href="/api/football/ligler" style={{ color: 'blue', textDecoration: 'none' }}>
              🔄 Retry Leagues API
            </Link>
          </div>
        </div>
      )}
      
      <hr style={{ margin: '30px 0' }} />
      
      <h2>🗄️ Database Teams:</h2>
      
      {dbTeams.success && dbTeams.teams && dbTeams.teams.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {dbTeams.teams.map(team => (
            <div key={team.id} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#f0f8ff'
            }}>
              <h3>🏟️ {team.name}</h3>
              <p><strong>Country:</strong> {team.country}</p>
              <p><strong>Founded:</strong> {team.founded_year}</p>
              {team.stadium && <p><strong>Stadium:</strong> {team.stadium}</p>}
              {team.manager && <p><strong>Manager:</strong> {team.manager}</p>}
              {team.league && <p><strong>League:</strong> {team.league}</p>}
              <Link href={`/api/teams/${team.id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                🔍 View Details →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>❌ Database connection error or no teams added yet.</p>
          <div style={{ marginTop: '10px' }}>
            <Link href="/api/football/countries" style={{ color: 'green', textDecoration: 'none' }}>
              🌍 Load Countries
            </Link>
            <span style={{ margin: '0 10px' }}>|</span>
            <Link href="/api/teams" style={{ color: 'purple', textDecoration: 'none' }}>
              🏟️ View Teams API
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}