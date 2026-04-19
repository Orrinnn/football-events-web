import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function NotFound() {
  return (
    <PageContainer>
      <div className="card centered-card">
        <h1>404</h1>
        <p>Síðan fannst ekki.</p>
        <Link href="/" className="primary-button">
          Fara á forsíðu
        </Link>
      </div>
    </PageContainer>
  );
}