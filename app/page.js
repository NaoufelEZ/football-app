import Link from 'next/link';

async function getLigler() {
  try {
    const res = await fetch('http://localhost:3000/api/football/ligler', {
      cache: 'no-store'
    });
    return await res.json();
  } catch (error) {
    return { success: false, ligler: [] };
  }
}

export default async function Home() {
  const footballData = await getLigler();

  return (
    <main style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>⚽ Football App - CANLI VERİLER</h1>
      <p>API-Football gerçek verileri ile çalışıyor!</p>
      
      <h2>🇹🇷 Türkiye Ligleri:</h2>
      
      {footballData.success ? (
        <div style={{ display: 'grid', gap: '15px' }}>
          {footballData.ligler.map((lig, index) => (
            <div key={index} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#f9f9f9'
            }}>
              <h3>🏆 {lig.league.name}</h3>
              <p><strong>Sezon:</strong> {lig.seasons[0]?.year || 'Bilinmiyor'}</p>
              <p><strong>Başlangıç:</strong> {lig.seasons[0]?.start || 'Bilinmiyor'}</p>
              <p><strong>Bitiş:</strong> {lig.seasons[0]?.end || 'Bilinmiyor'}</p>
              <img 
                src={lig.league.logo} 
                alt={lig.league.name}
                style={{ width: '50px', height: '50px' }}
              />
            </div>
          ))}
        </div>
      ) : (
        <p>❌ API bağlantı hatası. Mock verileri kullanıyorum...</p>
      )}
      
      <hr style={{ margin: '30px 0' }} />
      
      <h2>🗄️ Database Takımları:</h2>
      {/* Bu kısmı önceki gibi tutalım */}
    </main>
  );
}