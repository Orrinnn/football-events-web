export function formatDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat('is-IS', {
    dateStyle: 'long',
    timeStyle: 'short',
  }).format(date);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}