import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Magalhães Lopes - Advogados',
  description: 'Welcome to Magalhães Lopes - Advogados',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          body { font-family: Inter, system-ui, sans-serif; background: #0a0a0a; color: #f0f0f0; line-height: 1.6; }
          a { color: #3b82f6; text-decoration: none; }
          a:hover { opacity: 0.8; }
          h1, h2, h3 { line-height: 1.2; }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}