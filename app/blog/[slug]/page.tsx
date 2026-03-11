import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDb, SITE_ID } from '../../../lib/db';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await getDb()
    .from('blog_posts').select('title, excerpt')
    .eq('site_id', SITE_ID).eq('slug', slug).eq('status', 'published').single();
  if (!post) return { title: 'Not found' };
  return { title: post.title + ' | Magalhães Lopes - Advogados', description: post.excerpt ?? '' };
}

function renderContent(text: string): string {
  return text
    .replace(/^### (.+)$/gm, '<h3 style="margin:1.5rem 0 0.5rem">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="margin:2rem 0 0.75rem;font-size:1.5rem">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 style="margin:2rem 0 1rem;font-size:2rem">$1</h1>')
    .split(/\n\n+/)
    .map((p) => p.startsWith('<h') ? p : '<p style="margin:0 0 1.25rem;color:#ccc">' + p.replace(/\n/g, '<br>') + '</p>')
    .join('\n');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await getDb()
    .from('blog_posts').select('*')
    .eq('site_id', SITE_ID).eq('slug', slug).eq('status', 'published').single();
  if (!post) notFound();

  const dateStr = new Date(post.published_at ?? post.created_at)
    .toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', background: '#111', borderBottom: '1px solid #1a1a1a',
        position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>Magalhães Lopes - Advogados</Link>
        <Link href="/blog" style={{ fontSize: '0.85rem', color: '#888' }}>← All posts</Link>
      </header>
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.5rem' }}>
        {post.cover_image_url && (
          <img src={post.cover_image_url} alt={post.title}
            style={{ width: '100%', height: 280, objectFit: 'cover', borderRadius: 12, marginBottom: '2rem' }} />
        )}
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.75rem' }}>
          {post.title}
        </h1>
        <p style={{ color: '#555', fontSize: '0.85rem', marginBottom: '2rem' }}>{dateStr}</p>
        <div style={{ fontSize: '1.05rem', lineHeight: 1.8 }}
          dangerouslySetInnerHTML={{ __html: renderContent(post.content ?? '') }} />
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid #1a1a1a' }}>
          <Link href="/blog" style={{ color: '#3b82f6', fontWeight: 600 }}>← Back to blog</Link>
        </div>
      </main>
    </div>
  );
}