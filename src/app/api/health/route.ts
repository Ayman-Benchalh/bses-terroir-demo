import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'bses-terroir-demo',
    studio: 'BSES — Benchalh Solution E-commerce System',
    timestamp: new Date().toISOString(),
    locales: ['fr', 'en', 'ar'],
    productsCount: 50,
  });
}
