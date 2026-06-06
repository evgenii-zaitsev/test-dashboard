/** Detaches returned data from the in-memory db so callers can't mutate it by reference. */
export const clone = <T>(value: T): T => structuredClone(value);
