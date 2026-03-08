export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTimeLeft(endDate) {
  if (!endDate) return '-';
  const normalized = /^\d{4}-\d{2}-\d{2}$/.test(endDate) ? `${endDate}T23:59:59` : endDate;
  const end = new Date(normalized);
  if (Number.isNaN(end.getTime())) return '-';

  const diffMs = end.getTime() - Date.now();
  if (diffMs <= 0) return 'Ended';
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins} mins left`;
  const hours = Math.floor(diffMs / 3600000);
  if (hours < 24) return `${hours} hours left`;
  const days = Math.floor(diffMs / 86400000);
  return `${days} days left`;
}

export function formatTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
  
  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour ago`;
  return `${Math.floor(diffInMinutes / 1440)} days ago`;
}