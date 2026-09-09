'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [images, setImages] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const router = useRouter();

  const fetchImages = async () => {
    setLoadingImages(true);
    try {
      const res = await fetch('/api/images');
      if (res.ok) {
        const data = await res.json();
        setImages(data);
      }
    } catch (e) {
      console.error("Resimler çekilemedi", e);
    }
    setLoadingImages(false);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchImages();
    }
  }, [isLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin.35' && password === 'aras3545') {
      setIsLoggedIn(true);
    } else {
      alert('Hatalı kullanıcı adı veya şifre!');
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage('Yükleniyor, lütfen bekleyin...');

    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });

      const newBlob = await response.json();
      
      if (newBlob.url) {
          setMessage('✅ Resim başarıyla yüklendi!');
          setFile(null);
          // Galeriyi yenile
          fetchImages();
          router.refresh();
      } else {
          setMessage('❌ Yükleme hatası: ' + JSON.stringify(newBlob));
      }
    } catch (error) {
      console.error(error);
      setMessage('❌ Beklenmeyen bir hata oluştu.');
    }

    setUploading(false);
  };

  const handleDelete = async (url) => {
    if (!window.confirm('Bu resmi silmek istediğinize emin misiniz?')) return;
    
    try {
      const res = await fetch('/api/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      
      if (res.ok) {
        setMessage('✅ Resim başarıyla silindi.');
        fetchImages();
        router.refresh();
      } else {
        setMessage('❌ Silme hatası.');
      }
    } catch (error) {
      setMessage('❌ Beklenmeyen bir hata oluştu.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="main-container" style={{ alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F9F9F6' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Playfair Display', color: '#C5A059', marginBottom: '20px' }}>Yönetici Girişi</h2>
          <input 
            type="text" 
            placeholder="Kullanıcı Adı" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '16px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <input 
            type="password" 
            placeholder="Şifre" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ display: 'block', width: '100%', padding: '12px', marginBottom: '24px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <button type="submit" style={{ width: '100%', padding: '14px', background: '#C5A059', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Giriş Yap</button>
        </form>
      </div>
    );
  }

  return (
    <div className="main-container" style={{ alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', background: '#F9F9F6', padding: '40px 20px' }}>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', textAlign: 'center', width: '100%', maxWidth: '600px', marginBottom: '30px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', color: '#C5A059', marginBottom: '10px' }}>Fotoğraf Yükle</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Anma sayfasına eklenecek yeni fotoğrafı seçin.</p>
        
        <form onSubmit={handleUpload}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setFile(e.target.files[0])} 
            style={{ display: 'block', width: '100%', marginBottom: '20px' }}
          />
          <button 
            type="submit" 
            disabled={!file || uploading} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              background: file && !uploading ? '#C5A059' : '#ccc', 
              color: 'white', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: 'bold', 
              cursor: file && !uploading ? 'pointer' : 'not-allowed' 
            }}>
            {uploading ? 'Yükleniyor...' : 'Yükle'}
          </button>
        </form>
        {message && <p style={{ marginTop: '15px', fontWeight: 'bold', color: message.includes('✅') ? 'green' : 'red' }}>{message}</p>}
      </div>

      <div style={{ background: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '600px' }}>
        <h2 style={{ fontFamily: 'Playfair Display', color: '#333', marginBottom: '20px', textAlign: 'center' }}>Mevcut Fotoğraflar</h2>
        
        {loadingImages ? <p style={{textAlign: 'center'}}>Yükleniyor...</p> : (
          images.length === 0 ? <p style={{textAlign: 'center', color: '#999'}}>Henüz yüklenmiş fotoğraf yok.</p> : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '15px' }}>
              {images.map((img) => (
                <div key={img.url} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee' }}>
                  <img src={img.url} alt="Galeri" style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                  <button 
                    onClick={() => handleDelete(img.url)}
                    style={{ position: 'absolute', top: '5px', right: '5px', background: 'rgba(255,0,0,0.8)', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px' }}
                  >
                    Sil
                  </button>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <a href="/" style={{ display: 'block', marginTop: '30px', color: '#666', textDecoration: 'underline' }}>Ana Sayfaya Dön</a>
    </div>
  );
}
