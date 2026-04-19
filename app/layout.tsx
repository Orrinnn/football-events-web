import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Football Events',
  description: 'Next.js framendi fyrir Football Events API',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get('x-pathname') || '/';

  return (
    <html lang="is">
      <body>
        <Header pathname={pathname} />
        <main className="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}