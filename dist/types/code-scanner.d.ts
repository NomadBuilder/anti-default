import type { AnalysisResult, RulePreferences } from "./types";
export interface CodeFileInput {
    path: string;
    content: string;
}
export declare function extractReviewableSegments(file: CodeFileInput): Array<{
    text: string;
    source: string;
}>;
export declare function analyzeCodeFiles(files: CodeFileInput[], preferences?: RulePreferences | null): AnalysisResult;
export declare const CODE_EXTENSIONS: string[];
export declare function hasSupportedExtension(filename: string): boolean;
