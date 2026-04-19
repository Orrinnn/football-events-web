'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Category, Team, Venue } from '@/types';

type Props = {
  categories: Category[];
  teams: Team[];
  venues: Venue[];
};

export default function EventCreateForm({ categories, teams, venues }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
    maxParticipants: '',
    imageUrl: '',
    isOpen: true,
    categoryId: '',
    venueId: '',
    teamId: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/events/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description || null,
          eventDate: new Date(form.eventDate).toISOString(),
          maxParticipants: form.maxParticipants ? Number(form.maxParticipants) : null,
          imageUrl: form.imageUrl || null,
          isOpen: form.isOpen,
          categoryId: Number(form.categoryId),
          venueId: Number(form.venueId),
          teamId: Number(form.teamId),
        }),
      });

      const data = (await response.json()) as { error?: string; data?: { id: number } };

      if (!response.ok) {
        throw new Error(data.error || 'Ekki tókst að stofna viðburð');
      }

      router.push(`/events/${data.data?.id ?? ''}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Villa kom upp');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="form card">
      <h1>Stofna nýjan viðburð</h1>

      <label>
        Titill
        <input
          value={form.title}
          onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
          required
        />
      </label>

      <label>
        Lýsing
        <textarea
          value={form.description}
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
          rows={5}
        />
      </label>

      <label>
        Dagsetning og tími
        <input
          type="datetime-local"
          value={form.eventDate}
          onChange={(e) => setForm((prev) => ({ ...prev, eventDate: e.target.value }))}
          required
        />
      </label>

      <label>
        Hámarksfjöldi
        <input
          type="number"
          min="1"
          value={form.maxParticipants}
          onChange={(e) => setForm((prev) => ({ ...prev, maxParticipants: e.target.value }))}
        />
      </label>

      <label>
        Myndaslóð
        <input
          value={form.imageUrl}
          onChange={(e) => setForm((prev) => ({ ...prev, imageUrl: e.target.value }))}
          placeholder="https://..."
        />
      </label>

      <label>
        Flokkur
        <select
          value={form.categoryId}
          onChange={(e) => setForm((prev) => ({ ...prev, categoryId: e.target.value }))}
          required
        >
          <option value="">Veldu flokk</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Lið
        <select
          value={form.teamId}
          onChange={(e) => setForm((prev) => ({ ...prev, teamId: e.target.value }))}
          required
        >
          <option value="">Veldu lið</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name}
            </option>
          ))}
        </select>
      </label>

      <label>
        Völlur
        <select
          value={form.venueId}
          onChange={(e) => setForm((prev) => ({ ...prev, venueId: e.target.value }))}
          required
        >
          <option value="">Veldu völl</option>
          {venues.map((venue) => (
            <option key={venue.id} value={venue.id}>
              {venue.name} - {venue.city}
            </option>
          ))}
        </select>
      </label>

      <label className="checkbox-row">
        <input
          type="checkbox"
          checked={form.isOpen}
          onChange={(e) => setForm((prev) => ({ ...prev, isOpen: e.target.checked }))}
        />
        Opið fyrir skráningu
      </label>

      {error && <p className="error-text">{error}</p>}

      <button type="submit" className="primary-button" disabled={loading}>
        {loading ? 'Vista...' : 'Stofna viðburð'}
      </button>
    </form>
  );
}