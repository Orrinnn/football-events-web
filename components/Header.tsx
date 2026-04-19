import Link from 'next/link';
import { getSessionUser } from '@/lib/auth';
import { cn } from '@/lib/utils';

const links = [
  { href: '/', label: 'Forsíða' },
  { href: '/events', label: 'Viðburðir' },
  { href: '/register', label: 'Nýskráning' },
  { href: '/login', label: 'Innskráning' },
  { href: '/upload', label: 'Myndaupphleðsla' },
];

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname.startsWith(href);
}

export default async function Header({ pathname }: { pathname: string }) {
  const user = await getSessionUser();

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          Football Events
        </Link>

        <nav aria-label="Aðalvalmynd" className="nav">
          {links.map((link) => {
            if (link.href === '/login' && user) return null;
            if (link.href === '/register' && user) return null;
            if (link.href === '/upload' && user?.role !== 'admin') return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn('nav-link', isActive(pathname, link.href) && 'nav-link-active')}
              >
                {link.label}
              </Link>
            );
          })}

          {user?.role === 'admin' && (
            <Link
              href="/admin/events/new"
              className={cn(
                'nav-link',
                isActive(pathname, '/admin/events/new') && 'nav-link-active',
              )}
            >
              Nýr viðburður
            </Link>
          )}
        </nav>

        <div className="header-user">
          {user ? (
            <>
              <span className="user-badge">
                {user.username} ({user.role})
              </span>
              <form action="/api/auth/logout" method="POST">
                <button className="ghost-button" type="submit">
                  Útskrá
                </button>
              </form>
            </>
          ) : (
            <span className="muted-text">Ekki innskráður</span>
          )}
        </div>
      </div>
    </header>
  );
}