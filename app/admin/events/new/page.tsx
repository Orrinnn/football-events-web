import PageContainer from '@/components/PageContainer';
import EventCreateForm from '@/components/EventCreateForm';
import { getCategories, getTeams, getVenues } from '@/lib/api';
import { requireAdmin } from '@/lib/auth';

export default async function NewEventPage() {
  await requireAdmin();

  const [categoriesRes, teamsRes, venuesRes] = await Promise.all([
    getCategories(),
    getTeams(),
    getVenues(),
  ]);

  return (
    <PageContainer>
      <EventCreateForm
        categories={categoriesRes.data}
        teams={teamsRes.data}
        venues={venuesRes.data}
      />
    </PageContainer>
  );
}