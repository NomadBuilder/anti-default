---
name: anti-default
description: Reviews public-facing copy, documentation, UI text, and code strings for inclusive-language defaults using the Anti-Default CLI. Use after writing or editing user-facing language, before publishing content, or when reviewing a pull request for thoughtful and inclusive wording.
---

# Anti-Default

## Workflow

1. Run `npx anti-default . --format json --fail-on never`.
2. Read each finding in its surrounding context.
3. Fix clear, unambiguous findings in user-facing language.
4. For identity, quoted, historical, legal, or self-descriptive language, explain the finding and ask before changing it.
5. Do not rewrite identifiers, APIs, proper names, quotations, or community self-description without confirmation.
6. Run the scan again and report what remains.

Respect `.antidefaultignore` and `.antidefaultbaseline.json`. Suggestions are starting points; context and the named community's own language take priority.
