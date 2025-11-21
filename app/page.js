import Link from 'next/link';

async function getLigler() {
  // const endpoint1 = 'http://localhost:3000/api/football/ligler';
  const endpoint1 = '';
  try {
    const res = await fetch(endpoint1, {
      cache: 'no-store'
    });
    return await res.json();
  } catch (error) {
    return { success: false, ligler: [] };
  }
}

// Database takımlarını getir
async function getDatabaseTakimlar() {
  try {
    const res = await fetch('http://localhost:3000/api/takimlar', {
      cache: 'no-store'
    });
    return await res.json();
  } catch (error) {
    return { success: false, takimlar: [] };
  }
}

export default async function Home() {
  const [footballData, dbTakimlar] = await Promise.all([
    getLigler(),
    getDatabaseTakimlar()
  ]);

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
      
      {/* Database Takımları */}
      {dbTakimlar.success && dbTakimlar.takimlar && dbTakimlar.takimlar.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {dbTakimlar.takimlar.map(takim => (
            <div key={takim.id} style={{ 
              border: '1px solid #ddd', 
              padding: '15px', 
              borderRadius: '8px',
              backgroundColor: '#f0f8ff'
            }}>
              <h3>🏟️ {takim.ad}</h3>
              <p><strong>Ülke:</strong> {takim.ulke}</p>
              <p><strong>Kuruluş:</strong> {takim.kurulus_yili}</p>
              {takim.stadi && <p><strong>Stad:</strong> {takim.stadi}</p>}
              {takim.teknik_direktor && <p><strong>Teknik Direktör:</strong> {takim.teknik_direktor}</p>}
              <Link href={`/api/takimlar/${takim.id}`} style={{ color: 'blue', textDecoration: 'none' }}>
                🔍 Detayları Gör →
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>❌ Database bağlantı hatası veya henüz takım eklenmemiş.</p>
          <div style={{ marginTop: '10px' }}>
            <Link href="/api/football/countries" style={{ color: 'green', textDecoration: 'none' }}>
              🌍 Ülkeleri Yükle
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}