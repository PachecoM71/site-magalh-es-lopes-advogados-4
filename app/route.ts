import { NextResponse } from 'next/server';
// site-content.json is baked at deploy time with the generated HTML.
// To update content, trigger a redeploy from SiteStarter.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const siteContent = require('../site-content.json') as { html: string };

export const dynamic = 'force-static';

export async function GET() {
  return new NextResponse(siteContent.html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}