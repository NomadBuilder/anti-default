import type { LanguageRule, RuleSuggestion, SuggestionKind } from "./types";
/**
 * Advice-shaped strings are never safe drop-in rewrites.
 * Prefer declaring `kind: "guidance"` on the rule; this is the fallback.
 */
export declare function inferSuggestionKind(text: string): SuggestionKind;
export declare function normalizeSuggestion(value: string | RuleSuggestion): RuleSuggestion;
export declare function normalizeSuggestions(rule: Pick<LanguageRule, "suggestions" | "guidance">): {
    swaps: string[];
    guidance: string[];
    all: RuleSuggestion[];
};
/** Flat suggestion texts for findings / exports (swaps first, then guidance). */
export declare function suggestionTexts(rule: Pick<LanguageRule, "suggestions" | "guidance">): string[];
export declare function suggestionDisplayTexts(suggestions: Array<string | {
    text: string;
}>): string[];
