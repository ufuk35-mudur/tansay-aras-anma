import { list } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { blobs } = await list({ token: 'vercel_blob_rw_7scSW8M0W9AIAZoW_W8w42HNEwhwwCTfZv3nSENuoFDKq5X' });
    return NextResponse.json(blobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blobs' }, { status: 500 });
  }
}
