#!/usr/bin/env tsx
/**
 * Fetch public pages and run Anti-Default on visible text.
 *
 *   npx tsx scripts/analyze-urls.ts https://livingoutloud.life/ https://livingoutloud.life/self/
 */
import { analyzeText } from "../src/lib/analyzer";

async function fetchText(url: string): Promise<{ title: string; text: string }> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "AntiDefaultInclusiveReview/1.0 (+https://darkai.ca/anti-default)",
      Accept: "text/html",
    },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  const html = await res.text();
  const title =
    html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || url;
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
  return { title, text };
}

async function main() {
  const urls = process.argv.slice(2);
  if (!urls.length) {
    console.error("Usage: npx tsx scripts/analyze-urls.ts <url> [url…]");
    process.exit(1);
  }

  for (const url of urls) {
    process.stdout.write(`\n=== ${url}\n`);
    try {
      const { title, text } = await fetchText(url);
      const result = analyzeText(text, {
        sourceType: "url",
        sourceLabel: url,
        title,
      });
      console.log(`Title: ${title}`);
      console.log(`Chars: ${text.length} · Findings: ${result.findings.length}`);
      const byRule = new Map<string, number>();
      for (const f of result.findings) {
        byRule.set(f.ruleId, (byRule.get(f.ruleId) ?? 0) + 1);
      }
      if (byRule.size) {
        console.log("By rule:");
        [...byRule.entries()]
          .sort((a, b) => b[1] - a[1])
          .forEach(([id, n]) => console.log(`  ${n}\t${id}`));
      }
      for (const f of result.findings.slice(0, 40)) {
        const soft = f.likelyFalsePositive ? " [soft]" : "";
        console.log(`\n[${f.label}]${soft}`);
        console.log(`  “${f.match}”`);
        console.log(`  ${f.why}`);
        console.log(`  try: ${f.suggestions.slice(0, 3).join(" · ")}`);
        console.log(`  …${f.context}`);
      }
      if (result.findings.length > 40) {
        console.log(`\n…and ${result.findings.length - 40} more`);
      }
    } catch (err) {
      console.error(err instanceof Error ? err.message : err);
    }
  }
}

main();
