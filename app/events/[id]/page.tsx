import { notFound } from 'next/navigation';
import PageContainer from '@/components/PageContainer';
import { getEvent } from '@/lib/api';
import { formatDate } from '@/lib/utils';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EventDetailPage({ params }: Props) {
  const { id } = await params;

  let event;

  try {
    const response = await getEvent(id);
    event = response.data;
  } catch (error) {
    if (error instanceof Error && /not found/i.test(error.message)) {
      notFound();
    }

    throw error;
  }

  return (
    <PageContainer>
      <article className="detail-layout">
        <div className="detail-image-card">
          <img
            src={
              event.imageUrl ||
              'https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1400&q=80'
            }
            alt={event.title}
            className="detail-image"
          />
        </div>

        <div className="detail-content card">
          <div className="pill-row">
            <span className="pill">{event.category?.name ?? 'Óflokkað'}</span>
            <span className={`pill ${event.isOpen ? 'pill-open' : 'pill-closed'}`}>
              {event.isOpen ? 'Opið fyrir skráningu' : 'Lokað'}
            </span>
          </div>

          <h1>{event.title}</h1>
          <p className="muted-text">{formatDate(event.eventDate)}</p>

          <p>{event.description || 'Engin lýsing tiltæk fyrir þennan viðburð.'}</p>

          <div className="detail-list">
            <div>
              <strong>Lið:</strong> {event.team?.name ?? 'Óþekkt'}
            </div>
            <div>
              <strong>Völlur:</strong> {event.venue?.name ?? 'Óþekktur'}
            </div>
            <div>
              <strong>Borg:</strong> {event.venue?.city ?? 'Óþekkt'}
            </div>
            <div>
              <strong>Hámarksfjöldi:</strong> {event.maxParticipants ?? 'Ekki skilgreint'}
            </div>
            <div>
              <strong>Skráningar:</strong> {event.registrations?.length ?? 0}
            </div>
            <div>
              <strong>Stofnað af:</strong> {event.createdBy?.username ?? 'Óþekktur notandi'}
            </div>
          </div>
        </div>
      </article>
    </PageContainer>
  );
}
