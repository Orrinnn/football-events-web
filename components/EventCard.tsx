import Link from 'next/link';
import type { Event } from '@/types';
import { formatDate } from '@/lib/utils';

type Props = {
  event: Event;
};

export default function EventCard({ event }: Props) {
  return (
    <article className="card event-card">
      <div className="event-image-wrapper">
        <img
          src={
            event.imageUrl ||
            'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80'
          }
          alt={event.title}
          className="event-image"
        />
      </div>

      <div className="card-body">
        <div className="pill-row">
          <span className="pill">{event.category?.name ?? 'Óflokkað'}</span>
          <span className={`pill ${event.isOpen ? 'pill-open' : 'pill-closed'}`}>
            {event.isOpen ? 'Opið' : 'Lokað'}
          </span>
        </div>

        <h3>{event.title}</h3>
        <p className="muted-text">{formatDate(event.eventDate)}</p>
        <p>{event.description?.slice(0, 120) || 'Engin lýsing tiltæk.'}</p>

        <div className="card-meta">
          <span>{event.team?.name ?? 'Óþekkt lið'}</span>
          <span>{event.venue?.name ?? 'Óþekktur völlur'}</span>
        </div>

        <Link href={`/events/${event.id}`} className="primary-button">
          Skoða nánar
        </Link>
      </div>
    </article>
  );
}