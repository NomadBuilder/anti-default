import type { Finding } from "./types";
/** Preserve ALLCAPS / Title Case when swapping a phrase. */
export declare function preserveCase(original: string, replacement: string): string;
export declare function isSafeAutofixRule(ruleId: string): boolean;
export declare function safeReplacementFor(finding: Finding): string | null;
export interface SafeFixPlan {
    finding: Finding;
    replacement: string;
}
export declare function planSafeFixes(findings: Finding[]): {
    plans: SafeFixPlan[];
    skipped: number;
};
