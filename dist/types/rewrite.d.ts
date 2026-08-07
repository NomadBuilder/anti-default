import type { Finding } from "./types";
/** Replace the matched phrase in context (first case-insensitive hit). */
export declare function previewRewrite(finding: Finding, suggestion: string): {
    before: string;
    after: string;
};
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
