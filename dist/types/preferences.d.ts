import type { LanguageRule, RulePreferences, Severity } from "./types";
export declare const PREFS_STORAGE_KEY = "un-default.rulePreferences.v1";
export declare const LEGACY_PREFS_STORAGE_KEY = "anti-default.rulePreferences.v1";
export declare function resolveRules(preferences?: RulePreferences | null): LanguageRule[];
export declare function defaultPreferences(): RulePreferences;
export declare function mergePreferences(stored: RulePreferences | null | undefined): RulePreferences;
export declare function countPreferenceDrift(prefs: RulePreferences): {
    disabled: number;
    severityChanged: number;
};
export declare function setRuleEnabled(prefs: RulePreferences, ruleId: string, enabled: boolean): RulePreferences;
export declare function setRuleSeverity(prefs: RulePreferences, ruleId: string, severity: Severity): RulePreferences;
export declare function setCategoryEnabled(prefs: RulePreferences, category: LanguageRule["category"], enabled: boolean): RulePreferences;
export declare function isValidPreferences(value: unknown): value is RulePreferences;
