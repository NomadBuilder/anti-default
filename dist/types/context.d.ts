/**
 * Context heuristics for matches — skip tech idioms, quotes, org names,
 * first-person illness stories; soft-flag remaining ambiguous cases.
 */
export type ContextMode = "quote" | "legal" | "selfDescription" | "techIdiom" | "orgName" | "illnessStory";
export interface MatchContext {
    modes: ContextMode[];
    /** Soft-flag: often a false positive; still shown. */
    likelyFalsePositive: boolean;
    /** Hard skip: do not emit a finding. */
    skip: boolean;
    note?: string;
}
/** True if the match sits inside quotation marks in the local window. */
export declare function isInsideQuotes(text: string, index: number, length: number): boolean;
/**
 * Proper-name / org-style uses: "Stupid Cancer", "Crazy Horse Foundation",
 * or “called/named …”. Avoids Title Case job titles like “Congressman Max”.
 */
export declare function looksLikeOrgOrProperName(text: string, index: number, length: number): boolean;
export interface RuleContextHints {
    /** If set, match is skipped unless this pattern appears nearby. */
    requireNear?: RegExp;
    /** If set, match is skipped when this pattern appears nearby. */
    excludeNear?: RegExp;
    /** Soft-flag when nearby (likely FP). */
    softExcludeNear?: RegExp;
}
/** Built-in context for known ambiguous rules. */
export declare function hintsForRule(ruleId: string): RuleContextHints | null;
export declare function evaluateMatchContext(text: string, index: number, length: number, ruleId: string): MatchContext;
