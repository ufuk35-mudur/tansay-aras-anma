import { list } from '@vercel/blob';

export default async function Home() {
  let images = [];
  
  // Try to fetch images from Vercel Blob
  try {
    // If BLOB_READ_WRITE_TOKEN is available, fetch from blob
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { blobs } = await list();
      images = blobs.map(blob => blob.url);
    } else {
      // Fallback for local development if token is not set
      images = [
        '/gallery1.jpg',
        '/gallery2.png',
        '/gallery3.png',
        '/gallery4.png',
        '/gallery5.png'
      ];
    }
  } catch (error) {
    console.error("Blob fetch error:", error);
    images = [
        '/gallery1.jpg',
        '/gallery2.png',
        '/gallery3.png',
        '/gallery4.png',
        '/gallery5.png'
    ];
  }

  return (
    <div className="main-container">
        {/* ================= HERO ALANI ================= */}
        <header className="hero">
            <div className="profile-pic-container">
                <img src="/profile.jpg" alt="Tansay Aras" className="profile-pic" />
            </div>
            
            <h1 className="name-title">TANSAY ARAS</h1>
            <div className="date-line">(xxxx - 22/01/2026)</div>
            <div className="memorial-quote">&quot;Sonsuz sevgi ve özlemle anıyoruz...&quot;</div>
        </header>

        {/* ================= HAYAT HİKAYESİ ================= */}
        <section className="content-section">
            <div className="content-inner">
                <div className="section-header">
                    <h2 className="section-title">HAYAT HİKAYESİ</h2>
                    <div className="section-subtitle">Bir Ömürden Sayfalar</div>
                </div>
                <div className="life-story">
                    <p>
                        Tansay Aras, hayatı boyunca çevresine yaydığı pozitif enerji, güler yüzü ve tükenmek bilmeyen yaşam sevinciyle tanınırdı. Ailesine olan derin bağlılığı ve dostlarına gösterdiği koşulsuz sevgi, onu tanıyan herkesin kalbinde özel bir yer edinmesini sağladı.
                    </p>
                    <p>
                        Zorluklar karşısında asla pes etmeyen duruşu, çalışkanlığı ve dürüstlüğü ile hepimize örnek oldu. Onun bilgeliği, sıcak sohbetleri ve şefkatli yaklaşımı, bıraktığı bu güzel hatıralarla sonsuza dek yaşayacak.
                    </p>
                </div>
            </div>
        </section>

        {/* ================= GALERİ ================= */}
        <section className="content-section" style={{ paddingTop: 0 }}>
            <div className="section-header">
                <h2 className="section-title">GALERİ</h2>
            </div>
            
            <div className="gallery-grid">
                {images.map((imgSrc, index) => (
                    <div className="gallery-item" key={index}>
                        <img src={imgSrc} alt={`Anı fotoğrafı ${index + 1}`} />
                    </div>
                ))}
            </div>
        </section>

        {/* ================= ANMA KUTUSU ================= */}
        <div className="memorial-box-container">
            <div className="memorial-box">
                <h2 className="section-title">Anma Kutusu</h2>
                <div className="memorial-box-quote">
                    &quot;Onu daima güler yüzü ve engin sevgisiyle hatırlayacağız...&quot;
                </div>
            </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="footer">
            <div className="ornament"></div>
            <div className="footer-creator">Oluşturan: <span>Sevgili Ailesi</span></div>
            <div className="footer-note">Bu sayfa, onun aziz hatırasını yaşatmak için hazırlanmıştır.</div>
            
            {/* Gizli Admin Girişi - Sağ alt köşede çok küçük ve saydam */}
            <a href="/admin" style={{ opacity: 0.4, fontSize: '11px', textDecoration: 'none', color: 'inherit', display: 'block', marginTop: '10px' }}>Yönetim</a>

        </footer>
    </div>
  );
}
