# Anti-Default

Inclusive language review for websites, docs, and code — colonial defaults, gendered assumptions, ableist metaphors, and a careful set of documented dogwhistles.

**Try it live:** [https://darkai.ca/anti-default](https://darkai.ca/anti-default)

Not a purity test. Soft heads-ups and sources are built in so you can decide in context.

## What you get

| Surface | What it’s for |
| --- | --- |
| **Web UI** | Paste text, upload a doc, or review a URL · Swap a phrase · Dogwhistles guide · tune Rules · export a style guide |
| **CLI** | Scan your own repo / content offline |
| **Browser extension** | Highlight matches on any live page (local rules, no AI) |

Analysis runs from curated rules in `src/lib/rules.ts` — no LLM required for matching.

## Quick start

```bash
git clone https://github.com/NomadBuilder/anti-default.git
cd anti-default
npm install
```

### Scan your own project (CLI)

```bash
# Current directory
npm run analyze -- .

# Specific paths
npm run analyze -- ./src ./docs ./README.md
```

### Run the web app locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Paste copy, upload PDF/DOCX/text, or look up a phrase on **Swap**.

### Practice-test the rule set

```bash
npm run corpus
```

## Browser extension

```bash
npm run extension:pack
```

Then Chrome/Edge → Developer mode → **Load unpacked** → `extension/`. See [`extension/README.md`](extension/README.md).

## Tune rules

- In the UI: `/rules`
- In code: `src/lib/rules.ts`
- Sources that informed the catalog: `/sources` (and `src/lib/sources.ts`)

## Deploy your own static build

```bash
# Root-relative (Vercel, Netlify, GitHub Pages at domain root)
npm run build

# Or with a subpath, e.g. /anti-default
NODE_ENV=production STATIC_EXPORT=true BASE_PATH=/anti-default npm run build
```

Output is in `out/`. URL scrape on the live DarkAI host uses a small Flask helper; local Review still works with paste/upload without that API.

## Part of DarkAI

Hosted production lives at [darkai.ca/anti-default](https://darkai.ca/anti-default). A copy is also vendored in the [DarkAI](https://github.com/NomadBuilder/DarkAI) monorepo for that deploy. **This repo is the shareable home** for people who want to run Anti-Default on their own content.

## License

MIT — see [LICENSE](LICENSE).
