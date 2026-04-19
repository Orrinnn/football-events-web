import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function HomePage() {
  return (
    <PageContainer>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">Football Events 2026</span>
          <h1>Velkomin á Football Events</h1>
          <p>
            Finndu leiki, æfingar, mót og félagsviðburði á einum stað. Þetta er
            Next.js framendi ofan á REST API með innskráningu, myndastuðningi og
            admin virkni.
          </p>

          <div className="hero-actions">
            <Link href="/events" className="primary-button">
              Skoða viðburði
            </Link>
            <Link href="/register" className="secondary-button">
              Búa til aðgang
            </Link>
          </div>
        </div>

        <div className="hero-image-card">
          <img
            src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=80"
            alt="Football stadium"
            className="hero-image"
          />
        </div>
      </section>

      <section className="feature-grid">
  <article className="card">
    <h2>Viðburðir</h2>
    <p>Skoðaðu alla komandi leiki, æfingar og mót á einum stað.</p>
  </article>

  <article className="card">
    <h2>Notendur</h2>
    <p>Stofnaðu aðgang, skráðu þig inn og fáðu aðgang að fleiri möguleikum.</p>
  </article>

  <article className="card">
    <h2>Myndir</h2>
    <p>Settu inn myndir og tengdu þær við viðburði.</p>
  </article>
</section>
    </PageContainer>
  );
}