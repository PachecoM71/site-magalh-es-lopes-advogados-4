import { NextRequest, NextResponse } from 'next/server';
import { getDb, SITE_ID } from '../../../lib/db';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { error } = await getDb().from('reservations').insert({
      site_id: SITE_ID,
      name: body.name ?? '',
      email: body.email ?? null,
      phone: body.phone ?? null,
      requested_date: body.date ?? null,
      guests: body.guests ? Number(body.guests) : null,
      message: body.message ?? null,
      status: 'pending',
      source_url: req.headers.get('referer') ?? null,
    });
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}