import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');

  // Vercel Blob'a yükleme işlemi
  // process.env.BLOB_READ_WRITE_TOKEN otomatik olarak Vercel tarafından sağlanır
  try {
      const blob = await put(filename, request.body, {
        access: 'public',
        token: 'vercel_blob_rw_7scSW8M0W9AIAZoW_W8w42HNEwhwwCTfZv3nSENuoFDKq5X'
      });
    
      return NextResponse.json(blob);
  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Yükleme başarısız. Vercel Blob ayarlarını kontrol edin.' }, { status: 500 });
  }
}
