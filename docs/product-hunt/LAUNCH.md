# Product Hunt launch kit — Un-Default

Paste-ready copy + checklist. You still submit from your Product Hunt account
(https://www.producthunt.com/posts/new). Nobody else can publish as maker for you.

**Recommended window:** Tuesday or Wednesday, schedule for **12:01 AM Pacific**.
Warm the PH account 1–2 weeks first (comment on other launches). Do not launch cold.

**Live URL to feature:** https://darkai.ca/un-default/for-agents/  
**Alt (shareable demo):** https://darkai.ca/un-default/?demo=1  
**Install:** `npx -y anti-default init`

---

## Should you launch?

Yes — if you treat PH as a **one-day distribution spike**, not proof of product-market fit.

npm is still mostly release/CI noise (~16 downloads/day on quiet days). LinkedIn reached
eyeballs without installs. PH can put Un-Default in front of builders who already upvote
devtools; it will not replace a warm list. Prep assets + maker comment *before* you schedule.

Skip or delay if you cannot spend launch day answering every comment within ~15 minutes.

**2026 reality check:** Only ~10% of launches get **Featured** (homepage / mobile). Featured
is editorial — Useful · Novel · High craft · Creative — not raw upvote count. Your sharpest
story for Featured: *a local, open, invitation-based check after agents write copy* — helpful
for belonging, not a lecture and not a scare.

---

## Pre-launch (do before you pick a date)

### 1. Open the product draft / forum early
Coming Soon pages are gone. Creating a draft opens a permanent thread at
`producthunt.com/p/un-default` (or similar). Post short build notes for 1–2 weeks so people
can **Follow** and get notified at go-live. Target **20–50 followers** before launch day.

Ideas for forum posts: new rule packs, “why local not LLM,” a finding screenshot, launch date.

### 2. Warm list (spreadsheet)
Aim for people who already care — not cold “upvote please”:
- Tried `npx` / opened for-agents
- Engaged on LinkedIn / Discord
- 8–15 founders launching nearby (mutual feedback, not vote farming)

Day-before message: “Going live tomorrow — would love your honest take on the page.” Never ask for upvotes.

### 3. Demo video (treat as required)
30–60s, muted-friendly, captions. Upload YouTube **public or unlisted** and test the PH embed
before launch day.

**Beat sheet (tone: clarity + care, not a scold):**
1. **0–5s** — Agent-written UI / job post; highlight a phrase that leaves people out
2. **5–35s** — `npx -y anti-default init` → finding with **why** + a welcoming rewrite
3. **35–50s** — Invitations, open rules, no account, no model for matching — skill / MCP / PR check
4. **50–60s** — URL: darkai.ca/un-default/for-agents/

### 4. PH profile
Photo, bio, Twitter/LinkedIn. Comment thoughtfully on 5–10 other launches this week.

---

## Listing fields

### Name
Un-Default

### Tagline (≤60 characters) — pick one

Product Hunt shows one line under the name. It should name **defaults in agent copy** and what you actually check — not vague “welcoming help.”

| Tagline | Chars | Notes |
|---------|-------|--------|
| **Catch racist, sexist & ableist defaults in AI copy** | 51 | Recommended — specific, matches site/meta |
| Un-default what agents write in your UI copy | 42 | Brand verb; slightly cryptic if name is new |
| After agents write, review what they defaulted to | 47 | Agent-native + “default” concept |
| Local rules for defaults agents ship in product copy | 50 | Differentiator (local, open rules) |
| Make agent copy leave room for more people | 41 | Belonging; less explicit about what it checks |

**Avoid on PH:** “Welcoming-language help…”, “Inclusive-language check…” (category labels, not a hook).

**Recommended:** `Catch racist, sexist & ableist defaults in AI copy`

### Topics (pick ~3)
- Developer Tools
- Artificial Intelligence
- Open Source
- Productivity (optional 4th — don’t lead with it)

### Website
https://darkai.ca/un-default/for-agents/

### Description (short — ~200–260 chars)
Agents draft job posts, UI strings, and docs in seconds. Un-Default helps that copy welcome more people — racist defaults, sexist assumptions, ableist metaphors, coded digs — with plain-language suggestions. Local rules, no AI calls, no account. One command for Claude, Cursor, and Copilot.

### Pricing
Free · Open source (MIT) · npm: `anti-default`

---

## First maker comment (post within 60 seconds of go-live)

Hey Product Hunt — I’m Aazir, maker of Un-Default.

Agents now write our UI copy, onboarding, and job posts in seconds. Those drafts often sound finished — and still ship racist defaults, sexist digs, and ableist metaphors. A README with master/slave. A meeting called a pow-wow. “Guys” for a mixed team. “Bossy” or “man up” in a review. Not malice — just defaults that decide who feels welcome.

So I built Un-Default to catch racist, sexist, and ableist language locally — plain-language suggestions, open catalog you can tune. Suggestions are invitations, not a single “correct” English. No model bill, no signup. One command installs skill, MCP, after-edit hooks, and a PR check:

`npx -y anti-default init`

What I’d love to learn from you today:
1. Where would this help your readers or teammates most — CI, the agent loop, or before publish?
2. What would make the suggestions feel more helpful (and less like a lecture)?
3. Any phrases we should explain better or flag that we miss today?

Happy to answer anything. Try the live sample or paste configs: https://darkai.ca/un-default/for-agents/

---

## Gallery (ready — `docs/product-hunt/gallery/`)

All shots are **1270×760** from the live site. Upload in this order (proof first — hunters skim):

| # | File | Caption |
|---|------|---------|
| 1 | `01-home-hero.png` | Catch racist, sexist & ableist defaults before they ship |
| 2 | `03-agents.png` | One command for Claude / Cursor / Copilot |
| 3 | `02-findings-summary.png` | Findings with why — and plain-language rewrites |
| 4 | `02b-finding-card.png` | One hit: match, category, suggestions |
| 5 | `04b-rules-list.png` | Open rules you can turn on or off |
| 6 | `05-dogwhistles.png` | Coded phrases explained in context |
| alt | `03b-agents-mcp.png` | Paste-ready MCP config |
| alt | `04-rules.png` | Rules hub (hero) |
| alt | `05b-dogwhistles-list.png` | Dogwhistle catalog |

If you have the demo video, make it the **first** gallery item (above these stills).

---

## Launch-day rhythm (Pacific)

| Time | Move |
|------|------|
| **12:01 AM** | Go live → paste maker comment → ping inner circle (20–50) for feedback |
| **6–8 AM** | LinkedIn / X / Discord / relevant Slacks — “check it out / tell me what’s unclear,” never “please upvote” |
| **All day** | Reply to every comment within ~15 min (aim &lt;9 early); ask one follow-up to deepen the thread |
| **12–3 PM** | Second wave to people who haven’t opened yet; share a good comment thread |
| **Evening** | Thank substantive commenters; note ranking + npm / site spike |

Keep https://darkai.ca/un-default/ and npm healthy all day.

---

## Launch-day checklist

### Before (this week)
- [ ] Product Hunt maker profile complete (photo, bio, Twitter/LinkedIn)
- [ ] Product **draft / forum** open; 2–4 short posts; chase Follows
- [ ] Comment on 5–10 other launches this week (real notes, not “congrats!”)
- [ ] Warm-list spreadsheet ready; day-before soft-notify sent
- [ ] Thumbnail 240×240 uploaded (`thumbnail-240.png`)
- [x] Gallery images ready (`docs/product-hunt/gallery/`, 1270×760)
- [ ] **Demo video** recorded, on YouTube, embed tested
- [ ] Schedule post for Tue/Wed **12:01 AM PT**

### Day of
- [ ] Maker comment pasted in first **60 seconds**
- [ ] Inner circle pinged; then 6–8 AM social wave; then PM second wave
- [ ] Reply to every comment; one follow-up each
- [ ] Share PH link — ask people to **check it out**, never “please upvote”

### Week after (this is where launches compound)
- [ ] Thank substantive commenters personally
- [ ] Embed **Leave a Review** badge on the site (PH emails this after launch)
- [ ] Ask 5 people who tried it for a short PH review
- [ ] Reply to every review
- [ ] Post 1 forum update (what you shipped from launch feedback)
- [ ] Note ranking + real installs; capture phrases into rules backlog
- [ ] If Featured / PotD: add Featured badge to for-agents (static SVG, not the voting widget)

---

## Optional: hunter

A known hunter can help credibility and early visibility; they do **not** replace maker replies or a warm list. Self-submitting as maker is fine if you stay in the comments all day.

---

## What I cannot do from this repo

Submit the listing, schedule the day, or hunt for you — that requires your logged-in Product Hunt account.
This folder is the paste kit + thumbnail source.
