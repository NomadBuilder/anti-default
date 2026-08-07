import type { LanguageRule } from "./types";
/**
 * Curated inclusive-language rules.
 * Patterns are matched case-insensitively; prefer word boundaries to cut false positives.
 */
export declare const LANGUAGE_RULES: LanguageRule[];
export declare function getRuleById(id: string): LanguageRule | undefined;
export declare function rulesByCategory(): Record<string, LanguageRule[]>;
