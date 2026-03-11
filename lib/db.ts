import { createClient } from '@supabase/supabase-js';

export function getDb() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_KEY env vars must be set');
  }
  return createClient(url, key, { auth: { persistSession: false } });
}

export const SITE_ID = Number(process.env.NEXT_PUBLIC_SITE_ID ?? 0);