import Link from 'next/link';
import { getDb, SITE_ID } from '../../lib/db';

export const revalidate = 60;

export default async function BlogPage() {
  const db = getDb();
  const { data: posts } = await db
    .from('blog_posts')
    .select('id, title, slug, excerpt, cover_image_url, published_at, created_at')
    .eq('site_id', SITE_ID)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  return (
    <div style={{ minHeight: '100vh' }}>
      <header style={{ height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', background: '#111', borderBottom: '1px solid #1a1a1a',
        position: 'sticky', top: 0, zIndex: 50 }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
          Magalhães Lopes - Advogados
        </Link>
        <Link href="/" style={{ fontSize: '0.85rem', color: '#888' }}>← Back to site</Link>
      </header>
      <main style={{ maxWidth: 860, margin: '0 auto', padding: '3rem 1.5rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>Blog</h1>
        <p style={{ color: '#666', marginBottom: '2.5rem', fontSize: '0.9rem' }}>
          {posts?.length ? posts.length + ' articles' : 'No posts yet.'}
        </p>
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {posts?.map((post) => (
            <Link key={post.id} href={'/blog/' + post.slug}
              style={{ display: 'block', background: '#111', border: '1px solid #1a1a1a',
                borderRadius: 12, padding: '1.5rem', color: 'inherit', textDecoration: 'none' }}>
              {post.cover_image_url && (
                <img src={post.cover_image_url} alt={post.title}
                  style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: '1rem' }} />
              )}
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
                {post.title}
              </h2>
              {post.excerpt && (
                <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '0.75rem' }}>{post.excerpt}</p>
              )}
              <span style={{ fontSize: '0.8rem', color: '#3b82f6', fontWeight: 600 }}>Read more →</span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}