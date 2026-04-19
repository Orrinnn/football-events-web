import Link from 'next/link';
import PageContainer from '@/components/PageContainer';

export default function UnauthorizedPage() {
  return (
    <PageContainer>
      <div className="card centered-card">
        <h1>Ekki heimild</h1>
        <p>Þú hefur ekki heimild til að skoða þessa síðu.</p>
        <Link href="/" className="primary-button">
          Til baka á forsíðu
        </Link>
      </div>
    </PageContainer>
  );
}