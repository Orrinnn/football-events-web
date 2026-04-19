import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('session_token')?.value;

    if (!token) {
      return NextResponse.json(
        { error: 'Þú þarft að vera innskráður.' },
        { status: 401 },
      );
    }

    const incomingFormData = await request.formData();
    const outgoingFormData = new FormData();

    const image = incomingFormData.get('image');
    if (image) {
      outgoingFormData.append('image', image);
    }

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: outgoingFormData,
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error || data.message || 'Upload mistókst' },
        { status: response.status },
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: 'Villa kom upp við upphleðslu' },
      { status: 500 },
    );
  }
}