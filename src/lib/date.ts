export function formatDate(
  value: string | Date | undefined | null,
  showTime = false
): string | null {
  if (!value) return null;

  const date = new Date(value);
  if (isNaN(date.getTime())) return null;

  return showTime ? date.toISOString() : date.toISOString().split('T')[0];
}
