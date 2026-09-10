import { del } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url } = await request.json();
    await del(url, { token: 'vercel_blob_rw_7scSW8M0W9AIAZoW_W8w42HNEwhwwCTfZv3nSENuoFDKq5X' });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Silme işlemi başarısız.' }, { status: 500 });
  }
}
