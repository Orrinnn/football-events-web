import type {
  ApiErrorShape,
  Category,
  Event,
  PaginatedResponse,
  SingleResponse,
  Team,
  Venue,
} from '@/types';
import { getSessionToken } from '@/lib/auth';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error('NEXT_PUBLIC_API_URL is not defined');
}

async function parseJson<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error('API did not return JSON');
  }

  return response.json() as Promise<T>;
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await parseJson<T | ApiErrorShape>(response);

  if (!response.ok) {
    const errorMessage =
      (data as ApiErrorShape).error ||
      (data as ApiErrorShape).message ||
      'Óþekkt villa kom upp';

    throw new Error(errorMessage);
  }

  return data as T;
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  authenticated = false,
): Promise<T> {
  const headers = new Headers(options.headers);

  headers.set('Content-Type', headers.get('Content-Type') ?? 'application/json');

  if (authenticated) {
    const token = await getSessionToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: 'no-store',
  });

  return handleResponse<T>(response);
}

export async function apiFetchForm<T>(
  path: string,
  formData: FormData,
  authenticated = false,
): Promise<T> {
  const headers = new Headers();

  if (authenticated) {
    const token = await getSessionToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  const response = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers,
    body: formData,
    cache: 'no-store',
  });

  return handleResponse<T>(response);
}

export async function getEvents(page = 1, limit = 6) {
  return apiFetch<PaginatedResponse<Event>>(`/events?page=${page}&limit=${limit}`);
}

export async function getEvent(id: string | number) {
  return apiFetch<SingleResponse<Event>>(`/events/${id}`);
}

export async function getTeams() {
  return apiFetch<PaginatedResponse<Team>>('/teams?page=1&limit=50');
}

export async function getVenues() {
  return apiFetch<PaginatedResponse<Venue>>('/venues?page=1&limit=50');
}

export async function getCategories() {
  return apiFetch<PaginatedResponse<Category>>('/categories?page=1&limit=50');
}