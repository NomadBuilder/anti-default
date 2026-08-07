#!/usr/bin/env tsx
/**
 * Unified Anti-Default CLI — files, URL lists, text/json/sarif, CI exit codes.
 */
import { promises as fs, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { analyzeCodeFiles } from "../src/lib/code-scanner";
import { defaultPreferences } from "../src/lib/preferences";
import type { Finding, RulePreferences } from "../src/lib/types";
import { HELP, parseArgs, type FailOn } from "../src/cli/args";
import {
  buildSummary,
  formatJson,
  formatSarif,
  formatText,
  type ScanReport,
} from "../src/cli/format";
import { loadIgnoreFile } from "../src/cli/ignore";
import {
  analyzeUrlText,
  fetchPageText,
  loadUrlList,
} from "../src/cli/urls";
import { collectFiles, readFiles } from "../src/cli/walk";
import {
  applyBaseline,
  loadBaseline,
  writeBaseline,
} from "../src/cli/baseline";
import { changedFiles } from "../src/cli/changed";
import { initializeProject } from "../src/cli/init";

declare const __ANTI_DEFAULT_VERSION__: string | undefined;

function packageVersion(): string {
  if (
    typeof __ANTI_DEFAULT_VERSION__ !== "undefined" &&
    __ANTI_DEFAULT_VERSION__
  ) {
    return __ANTI_DEFAULT_VERSION__;
  }
  try {
    const here = path.dirname(fileURLToPath(import.meta.url));
    const pkg = JSON.parse(
      readFileSync(path.join(here, "..", "package.json"), "utf8"),
    ) as { version?: string };
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}

function prefsWithDisabled(disabled: Set<string>): RulePreferences {
  const prefs = defaultPreferences();
  for (const id of disabled) {
    prefs[id] = { ...prefs[id], enabled: false };
  }
  return prefs;
}

function shouldFail(findings: Finding[], failOn: FailOn): boolean {
  if (failOn === "never") return false;
  if (failOn === "any") return findings.length > 0;
  return findings.some((f) => !f.likelyFalsePositive);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const version = packageVersion();

  if (args.help) {
    console.log(HELP);
    return;
  }
  if (args.version) {
    console.log(version);
    return;
  }

  const cwd = process.cwd();
  if (args.command === "init") {
    const created = await initializeProject(cwd);
    if (created.length) {
      console.log("Anti-Default initialized:");
      for (const item of created) console.log(`  + ${item}`);
    } else {
      console.log("Anti-Default is already initialized; no files changed.");
    }
    return;
  }

  const ignore = await loadIgnoreFile(cwd, args.ignorePath);
  const preferences = prefsWithDisabled(ignore.disabledRules);

  let urls = [...args.urls];
  if (args.urlsFile) {
    urls = urls.concat(await loadUrlList(path.resolve(cwd, args.urlsFile)));
  }

  const mode = urls.length > 0 ? "urls" : "files";
  let rawFindings: Finding[] = [];
  let filesScanned: number | undefined;
  let urlsScanned: number | undefined;
  let targets =
    mode === "urls" ? urls : args.paths.length ? args.paths : ["."];
  if (mode === "files" && args.changedFrom) {
    targets = await changedFiles(cwd, args.changedFrom, targets);
    if (targets.length === 0) {
      console.log(`No supported files changed from ${args.changedFrom}.`);
      return;
    }
  }

  if (mode === "urls") {
    urlsScanned = 0;
    for (const url of urls) {
      try {
        const page = await fetchPageText(url);
        urlsScanned += 1;
        rawFindings = rawFindings.concat(analyzeUrlText(page, preferences));
      } catch (err) {
        console.error(
          `warn: ${err instanceof Error ? err.message : String(err)}`,
        );
      }
    }
    if (urlsScanned === 0) {
      console.error("No URLs could be fetched.");
      process.exit(1);
    }
  } else {
    const paths = await collectFiles(cwd, targets, ignore);
    const files = await readFiles(cwd, paths);
    filesScanned = files.length;
    if (files.length === 0) {
      console.error("No readable source files found.");
      process.exit(1);
    }
    const result = analyzeCodeFiles(files, preferences);
    rawFindings = result.findings;
  }

  if (args.command === "baseline") {
    const baselinePath = await writeBaseline(
      cwd,
      rawFindings,
      args.baselinePath,
    );
    console.log(
      `Wrote ${rawFindings.length} finding fingerprint(s) to ${path.relative(
        cwd,
        baselinePath,
      )}`,
    );
    return;
  }

  let findings = rawFindings;
  let suppressedByBaseline = 0;
  if (args.useBaseline) {
    const baseline = await loadBaseline(cwd, args.baselinePath);
    const applied = applyBaseline(findings, baseline);
    findings = applied.findings;
    suppressedByBaseline = applied.suppressed;
  }

  const report: ScanReport = {
    tool: "anti-default",
    version,
    scannedAt: new Date().toISOString(),
    mode,
    targets,
    filesScanned,
    urlsScanned,
    suppressedByBaseline,
    findings,
    summary: buildSummary(findings),
  };

  let output: string;
  if (args.format === "json") output = formatJson(report);
  else if (args.format === "sarif") output = formatSarif(report);
  else output = formatText(report);

  if (args.outPath) {
    await fs.writeFile(path.resolve(cwd, args.outPath), output, "utf8");
    if (args.format === "text") {
      console.log(output);
    } else {
      console.error(`Wrote ${args.format} → ${args.outPath}`);
      console.error(
        `Findings: ${report.summary.total} (${report.summary.hard} hard · ${report.summary.soft} soft)`,
      );
    }
  } else {
    console.log(output);
  }

  if (shouldFail(findings, args.failOn)) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
