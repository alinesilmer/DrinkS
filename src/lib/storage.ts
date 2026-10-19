// Browser storage that never throws (private mode, blocked cookies) and never trusts what it reads.

export function readStored<T>(key: string, isValid: (v: unknown) => v is T, fallback: T): T {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(key: string, value: unknown): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable: the app still works, it just forgets on reload.
  }
}
