import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { AuthResponse, ApiErrorShape } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = (await response.json()) as AuthResponse & ApiErrorShape;

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || 'Nýskráning mistókst' },
        { status: response.status },
      );
    }

    const cookieStore = await cookies();

    cookieStore.set('session_token', data.token, {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    cookieStore.set('session_user', encodeURIComponent(JSON.stringify(data.user)), {
      httpOnly: false,
      sameSite: 'lax',
      secure: false,
      path: '/',
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: 'Villa kom upp í nýskráningu' },
      { status: 500 },
    );
  }
}