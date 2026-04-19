import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';

export default async function Footer() {
  const user = await getSessionUser();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© 2026 Football Events. Vefforritun 2.</p>

        {user?.role === 'admin' && (
          <Link href="/admin/events/new" className="footer-link">
            Admin
          </Link>
        )}
      </div>
    </footer>
  );
}