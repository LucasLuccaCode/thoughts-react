export function formatDate(dateString) {
  const date = new Date(dateString);
  const diff = Date.now() - date.getTime();
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = day * 365;

  if (diff >= year) {
    return `${Math.floor(diff / year)} year${Math.floor(diff / year) > 1 ? 's' : ''}`;
  }
  if (diff >= month) {
    return `${Math.floor(diff / month)} month${Math.floor(diff / month) > 1 ? 's' : ''}`;
  }
  if (diff >= day) {
    return `${Math.floor(diff / day)} day${Math.floor(diff / day) > 1 ? 's' : ''}`;
  }
  if (diff >= hour) {
    return `${Math.floor(diff / hour)} hour${Math.floor(diff / hour) > 1 ? 's' : ''}`;
  }
  if (diff >= minute) {
    return `${Math.floor(diff / minute)} minute${Math.floor(diff / minute) > 1 ? 's' : ''}`;
  }
  return `${Math.floor(diff / second)} second${Math.floor(diff / second) > 1 ? 's' : ''}`;
}
