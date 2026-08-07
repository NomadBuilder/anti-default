import type { AnalysisResult, RulePreferences } from "./types";
declare function escapeRegex(value: string): string;
export interface AnalyzeOptions {
    sourceType: AnalysisResult["sourceType"];
    sourceLabel: string;
    title?: string;
    sourceTag?: string;
    preferences?: RulePreferences | null;
}
export declare function analyzeText(text: string, options?: Partial<AnalyzeOptions>): AnalysisResult;
export declare function analyzeSegments(segments: Array<{
    text: string;
    source: string;
}>, options: Omit<AnalyzeOptions, "sourceTag">): AnalysisResult;
/** Exported for tests / CLI helpers */
export declare function ruleCount(): number;
export declare function isSafeHttpUrl(raw: string): boolean;
export { escapeRegex };
