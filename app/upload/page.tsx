import PageContainer from '@/components/PageContainer';
import UploadForm from '@/components/UploadForm';
import { requireAdmin } from '@/lib/auth';

export default async function UploadPage() {
  await requireAdmin();

  return (
    <PageContainer>
      <UploadForm />
    </PageContainer>
  );
}