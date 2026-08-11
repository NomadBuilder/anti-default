import type { Finding } from "./types";
/**
 * True when a suggestion can be dropped into the matched phrase without
 * producing nonsense. Advice like “name the behavior” stays guidance-only.
 */
export declare function isLexicalSuggestion(suggestion: string): boolean;
/** Replace the matched phrase in context (first case-insensitive hit). */
export declare function previewRewrite(finding: Finding, suggestion: string): {
    before: string;
    after: string;
} | null;
/** Apply suggestion into full source text at finding.index when possible. */
export declare function applySuggestionToText(source: string, finding: Finding, suggestion: string): string;
export interface PassageRewriteResult {
    text: string;
    applied: number;
    skippedSoft: number;
    skippedCoded: number;
    skippedNoSuggestion: number;
}
/**
 * Walk findings and apply the first suggestion to each, right-to-left so
 * indices stay valid. Soft-flags and coded/dogwhistle hits are never applied.
 */
export declare function applyPassageRewrites(source: string, findings: Finding[], options?: {
    skipSoft?: boolean;
    skipCoded?: boolean;
}): PassageRewriteResult;
