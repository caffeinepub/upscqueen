// Utility functions for converting between calendar dates and backend day keys

/**
 * Convert a Date object to a day key (days since Unix epoch)
 */
export function dateToDayKey(date: Date): bigint {
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSinceEpoch = Math.floor(date.getTime() / msPerDay);
  return BigInt(daysSinceEpoch);
}

/**
 * Convert a day key to a Date object
 */
export function dayKeyToDate(dayKey: bigint): Date {
  const msPerDay = 24 * 60 * 60 * 1000;
  const ms = Number(dayKey) * msPerDay;
  return new Date(ms);
}

/**
 * Convert an HTML date input value (YYYY-MM-DD) to a day key
 */
export function dateStringToDayKey(dateString: string): bigint {
  const date = new Date(dateString + 'T00:00:00Z');
  return dateToDayKey(date);
}

/**
 * Convert a day key to an HTML date input value (YYYY-MM-DD)
 */
export function dayKeyToDateString(dayKey: bigint): string {
  const date = dayKeyToDate(dayKey);
  return date.toISOString().split('T')[0];
}

/**
 * Format a day key into a human-readable date label
 */
export function formatDayKey(dayKey: bigint): string {
  const date = dayKeyToDate(dayKey);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get the day key for today
 */
export function getTodayDayKey(): bigint {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateToDayKey(today);
}

/**
 * Get an array of recent day keys (today and previous days)
 */
export function getRecentDayKeys(count: number = 7): bigint[] {
  const today = getTodayDayKey();
  const keys: bigint[] = [];
  for (let i = 0; i < count; i++) {
    keys.push(today - BigInt(i));
  }
  return keys;
}
