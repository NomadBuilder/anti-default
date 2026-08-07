import type { Finding } from "./types";
export type FeedbackKind = "fine_in_context" | "false_positive" | "bad_suggestion";
export interface FeedbackEvent {
    version: 1;
    kind: FeedbackKind;
    createdAt: string;
    ruleId: string;
    match: string;
    label?: string;
    category?: string;
    context: string;
    source?: string;
    contextModes?: Finding["contextModes"];
    soft?: boolean;
    note?: string;
    /** Helps shared-model training without shipping private paths. */
    sourceKind?: "web" | "cli" | "extension" | "mcp";
}
export declare function feedbackEventFromFinding(finding: Finding, kind: FeedbackKind, options?: {
    note?: string;
    sourceKind?: FeedbackEvent["sourceKind"];
}): FeedbackEvent;
/** Pre-filled issue so “fine in context” can improve the shared catalog. */
export declare const FEEDBACK_STORAGE_KEY = "anti-default.feedbackEvents.v1";
/** Browser-only queue so web dismissals can later be exported / shared. */
export declare function recordFeedbackLocally(event: FeedbackEvent): void;
export declare function fineInContextIssueUrl(event: FeedbackEvent): string;
