export type Role = 'admin' | 'user';

export type User = {
  id: number;
  username: string;
  email: string;
  role: Role;
};

export type Category = {
  id: number;
  name: string;
  createdAt?: string;
};

export type Team = {
  id: number;
  name: string;
  shortName: string;
  description?: string | null;
  logoUrl?: string | null;
  createdAt?: string;
};

export type Venue = {
  id: number;
  name: string;
  address: string;
  city: string;
  capacity?: number | null;
  imageUrl?: string | null;
  createdAt?: string;
};

export type Registration = {
  id: number;
  createdAt: string;
  userId?: number;
  eventId?: number;
  user?: Pick<User, 'id' | 'username' | 'email'>;
};

export type Event = {
  id: number;
  title: string;
  description?: string | null;
  eventDate: string;
  maxParticipants?: number | null;
  imageUrl?: string | null;
  isOpen: boolean;
  createdAt: string;
  categoryId: number;
  venueId: number;
  teamId: number;
  createdById?: number;
  category?: Category;
  venue?: Venue;
  team?: Team;
  createdBy?: User;
  registrations?: Registration[];
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};

export type SingleResponse<T> = {
  data: T;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: User;
};

export type ApiErrorShape = {
  error?: string;
  message?: string;
  details?: unknown;
};