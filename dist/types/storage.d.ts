/**
 * Migrate browser storage keys from the former Anti-Default brand.
 * Reads the new key first; if missing, copies from the legacy key once.
 */
export declare function readMigratedStorage(key: string, legacyKey: string): string | null;
