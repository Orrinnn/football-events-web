import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { User } from '@/types';

const TOKEN_COOKIE = 'session_token';
const USER_COOKIE = 'session_user';

export async function getSessionToken() {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_COOKIE)?.value ?? null;
}

export async function getSessionUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(USER_COOKIE)?.value;

  if (!raw) return null;

  try {
    return JSON.parse(decodeURIComponent(raw)) as User;
  } catch {
    return null;
  }
}

export async function requireUser() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function requireAdmin() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login');
  }

  if (user.role !== 'admin') {
    redirect('/unauthorized');
  }

  return user;
}