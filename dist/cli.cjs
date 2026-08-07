#!/usr/bin/env tsx
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// scripts/cli.ts
var import_node_fs5 = require("node:fs");
var import_node_path5 = __toESM(require("node:path"));
var import_node_url = require("node:url");

// src/lib/rules.ts
var LANGUAGE_RULES = [
  // ── Colonial / Eurocentric ──────────────────────────────────────────
  {
    id: "discover-land",
    pattern: "\\bdiscovered\\b",
    category: "colonial",
    severity: "high",
    label: "Discovery framing",
    why: "\u201CDiscovered\u201D often erases Indigenous presence and agency. Prefer language that names arrival, contact, or colonization.",
    suggestions: [
      "encountered",
      "arrived in",
      "first documented by [who] among [people already living there]"
    ]
  },
  {
    id: "new-world",
    pattern: "\\bnew world\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CNew World\u201D",
    why: "Treats the Americas as empty or newly real only upon European arrival.",
    suggestions: ["the Americas", "Turtle Island (when appropriate)", "Abya Yala"]
  },
  {
    id: "old-world",
    pattern: "\\bold world\\b",
    category: "colonial",
    severity: "medium",
    label: "\u201COld World\u201D",
    why: "Reinforces a Eurocentric map of history as the default timeline.",
    suggestions: ["Europe, Africa, and Asia", "Afro-Eurasia", "name the regions"]
  },
  {
    id: "third-world",
    pattern: "\\bthird[- ]world\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CThird World\u201D",
    why: "Cold War hierarchy that ranks countries as behind a Western \u201Cfirst.\u201D",
    suggestions: [
      "Global South",
      "low- and middle-income countries",
      "name the specific regions or countries"
    ]
  },
  {
    id: "first-world",
    pattern: "\\bfirst[- ]world\\b",
    category: "colonial",
    severity: "medium",
    label: "\u201CFirst World\u201D",
    why: "Implies Western nations are the developmental default.",
    suggestions: ["high-income countries", "Global North", "name the countries"]
  },
  {
    id: "developing-country",
    pattern: "\\bdeveloping (?:country|countries|nation|nations|world)\\b",
    category: "colonial",
    severity: "medium",
    label: "\u201CDeveloping\u201D countries",
    why: "Implies a single Western path of \u201Cdevelopment.\u201D Use more precise economic or geographic terms when possible.",
    suggestions: [
      "low- and middle-income countries",
      "countries with emerging economies",
      "name the region or country"
    ]
  },
  {
    id: "underdeveloped",
    pattern: "\\bunderdeveloped\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CUnderdeveloped\u201D",
    why: "Ranks societies against a Western industrial ideal.",
    suggestions: [
      "low-income",
      "describe the specific infrastructure or resource gap",
      "name the place"
    ]
  },
  {
    id: "civilized",
    pattern: "\\bcivilized\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CCivilized\u201D",
    why: "Historically used to rank cultures and justify colonization.",
    suggestions: ["complex", "organized", "describe the specific practice or society"]
  },
  {
    id: "uncivilized",
    pattern: "\\buncivilized\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CUncivilized\u201D",
    why: "Dehumanizing colonial hierarchy language.",
    suggestions: ["describe the specific harm or difference without ranking cultures"]
  },
  {
    id: "primitive",
    pattern: "\\bprimitive\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CPrimitive\u201D",
    why: "Positions non-Western or Indigenous societies as less advanced.",
    suggestions: [
      "early",
      "ancestral",
      "foundational",
      "describe the specific technology or practice"
    ]
  },
  {
    id: "savage",
    pattern: "\\bsavages?\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CSavage\u201D",
    why: "Colonial slur used to justify violence against Indigenous and African peoples.",
    suggestions: ["describe the specific behavior without dehumanizing groups"]
  },
  {
    id: "tribe-generic",
    pattern: "\\btribe\\b",
    category: "colonial",
    severity: "medium",
    label: "Generic \u201Ctribe\u201D",
    why: "Often applied loosely to Indigenous or African peoples in ways that flatten political complexity. Prefer the community\u2019s own terms when known.",
    suggestions: ["nation", "people", "community", "use the specific nation\u2019s name"]
  },
  {
    id: "exotic",
    pattern: "\\bexotic\\b",
    category: "colonial",
    severity: "medium",
    label: "\u201CExotic\u201D",
    why: "Othering framing that treats people or cultures as curiosities relative to a Western norm.",
    suggestions: ["distinctive", "unfamiliar to [audience]", "name the culture or place"]
  },
  {
    id: "oriental-people",
    pattern: "\\borientals?\\b",
    category: "colonial",
    severity: "high",
    label: "\u201COriental\u201D (for people)",
    why: "Outdated othering term for Asian people; fine for rugs/design in some contexts, not for humans.",
    suggestions: ["Asian", "name the specific ethnicity or country"]
  },
  {
    id: "eskimo",
    pattern: "\\beskimos?\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CEskimo\u201D",
    why: "Often considered pejorative; many prefer Inuit, Yupik, or the specific nation\u2019s name.",
    suggestions: ["Inuit", "Yupik", "use the community\u2019s own name"]
  },
  {
    id: "pow-wow-metaphor",
    pattern: "\\bpow[- ]?wows?\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CPowwow\u201D as metaphor",
    why: "A powwow is a specific Indigenous gathering; using it for any meeting is appropriation.",
    suggestions: ["meeting", "huddle", "sync", "gathering"]
  },
  {
    id: "spirit-animal",
    pattern: "\\bspirit animals?\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CSpirit animal\u201D",
    why: "Trivializes Indigenous spiritual concepts.",
    suggestions: ["favorite", "kindred vibe", "I\u2019m drawn to"]
  },
  {
    id: "totem-pole",
    pattern: "\\b(low man on the )?totem poles?\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CTotem pole\u201D hierarchy metaphor",
    why: "Misuses sacred Northwest Coast cultural forms as a workplace ranking joke.",
    suggestions: ["lowest priority", "least senior", "bottom of the hierarchy"]
  },
  {
    id: "circle-the-wagons",
    pattern: "\\bcircle the wagons\\b",
    category: "colonial",
    severity: "medium",
    label: "\u201CCircle the wagons\u201D",
    why: "Settler-colonial frontier metaphor that casts outsiders as threat.",
    suggestions: ["rally together", "close ranks", "coordinate a response"]
  },
  {
    id: "indian-giver",
    pattern: "\\bindian giver\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CIndian giver\u201D",
    why: "Racist stereotype about Indigenous people; historically inverted who broke agreements.",
    suggestions: ["took back a gift", "changed the terms"]
  },
  {
    id: "guru",
    pattern: "\\bgurus?\\b",
    category: "colonial",
    severity: "low",
    label: "\u201CGuru\u201D as casual title",
    why: "A sacred role in South Asian traditions; casual workplace use can feel extractive.",
    suggestions: ["expert", "guide", "specialist", "mentor"]
  },
  {
    id: "native-speaker-only",
    pattern: "\\bnative (?:english )?speakers?(?: only| required| preferred)\\b",
    category: "colonial",
    severity: "medium",
    label: "Native-speaker gatekeeping",
    why: "Often excludes fluent multilingual people and centers colonial language hierarchies.",
    suggestions: [
      "fluent in English",
      "strong written/spoken English",
      "professional proficiency in\u2026"
    ]
  },
  {
    id: "mother-tongue-gate",
    pattern: "\\bmother tongue must be\\b|\\bmother[- ]tongue(?:\\s+english)?\\b",
    category: "colonial",
    severity: "medium",
    label: "Mother-tongue gatekeeping",
    why: "Often used to exclude fluent speakers and privilege a colonial language default.",
    suggestions: [
      "fluent in English",
      "professional proficiency in\u2026",
      "strong written and spoken English"
    ]
  },
  {
    id: "virgin-land",
    pattern: "\\bvirgin (?:land|territory|wilderness|soil)\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CVirgin land\u201D",
    why: "Settler framing that treats inhabited places as empty and unused before colonization.",
    suggestions: [
      "name who already lived there",
      "uncultivated by settlers",
      "land already stewarded by\u2026"
    ]
  },
  {
    id: "dark-continent",
    pattern: "\\bdark continent\\b",
    category: "colonial",
    severity: "high",
    label: "\u201CDark continent\u201D",
    why: "Colonial nickname for Africa that coded the continent as unknown or inferior.",
    suggestions: ["Africa", "name the country or region"]
  },
  {
    id: "colonize-metaphor",
    pattern: "\\bcoloniz(?:e|ing|ed)\\b",
    category: "colonial",
    severity: "low",
    label: "\u201CColonize\u201D as casual metaphor",
    why: "Using colonization as a cute synonym for \u201Cexpand into\u201D can trivialize historical violence. Keep when discussing actual colonialism.",
    suggestions: ["expand into", "enter", "open in", "build presence in"]
  },
  // ── Gender ──────────────────────────────────────────────────────────
  {
    id: "guys-generic",
    pattern: "\\bguys\\b",
    category: "gender",
    severity: "medium",
    label: "Generic \u201Cguys\u201D",
    why: "Often used for mixed or unknown groups, centering male as default.",
    suggestions: ["everyone", "folks", "team", "y\u2019all", "friends"]
  },
  {
    id: "mankind",
    pattern: "\\bmankind\\b",
    category: "gender",
    severity: "medium",
    label: "\u201CMankind\u201D",
    why: "Male-default language for all people.",
    suggestions: ["humankind", "humanity", "people"]
  },
  {
    id: "manpower",
    pattern: "\\bmanpower\\b",
    category: "gender",
    severity: "medium",
    label: "\u201CManpower\u201D",
    why: "Male-default framing of labor.",
    suggestions: ["workforce", "staffing", "labor", "people power"]
  },
  {
    id: "man-hours",
    pattern: "\\bman[- ]hours\\b",
    category: "gender",
    severity: "medium",
    label: "\u201CMan-hours\u201D",
    why: "Male-default unit of labor time.",
    suggestions: ["person-hours", "work hours", "staff hours"]
  },
  {
    id: "man-made",
    pattern: "\\bman[- ]made\\b",
    category: "gender",
    severity: "low",
    label: "\u201CMan-made\u201D",
    why: "Male-default for human-created things.",
    suggestions: ["human-made", "synthetic", "artificial", "manufactured"]
  },
  {
    id: "he-she",
    pattern: "\\bhe/she\\b|\\bhe or she\\b|\\bhis/her\\b|\\bhim/her\\b",
    category: "gender",
    severity: "medium",
    label: "Binary he/she pairing",
    why: "Excludes non-binary people; singular \u201Cthey\u201D is widely accepted.",
    suggestions: ["they", "the person", "rewrite to avoid pronouns"]
  },
  {
    id: "ladies-and-gentlemen",
    pattern: "\\bladies and gentlemen\\b",
    category: "gender",
    severity: "medium",
    label: "\u201CLadies and gentlemen\u201D",
    why: "Binary address that excludes non-binary people.",
    suggestions: ["everyone", "honored guests", "friends", "colleagues"]
  },
  {
    id: "both-genders",
    pattern: "\\bboth genders\\b|\\bopposite sex\\b",
    category: "gender",
    severity: "medium",
    label: "Binary gender framing",
    why: "Assumes only two genders or a strict opposite-sex binary.",
    suggestions: ["all genders", "another gender", "people of different genders"]
  },
  {
    id: "chairman",
    pattern: "\\bchair(?:man|woman)\\b",
    category: "gender",
    severity: "low",
    label: "Gendered chair title",
    why: "Prefer gender-neutral role titles when gender is irrelevant.",
    suggestions: ["chair", "chairperson", "chair of the board"]
  },
  {
    id: "policeman",
    pattern: "\\b(?:policeman|policewoman)\\b",
    category: "gender",
    severity: "low",
    label: "Gendered police title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["police officer"]
  },
  {
    id: "fireman",
    pattern: "\\bfireman\\b",
    category: "gender",
    severity: "low",
    label: "Gendered firefighter title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["firefighter"]
  },
  {
    id: "mailman",
    pattern: "\\bmailman\\b",
    category: "gender",
    severity: "low",
    label: "Gendered mail title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["mail carrier", "postal worker"]
  },
  {
    id: "salesman",
    pattern: "\\bsalesman\\b",
    category: "gender",
    severity: "low",
    label: "Gendered sales title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["salesperson", "sales representative"]
  },
  {
    id: "congressman",
    pattern: "\\bcongressman\\b",
    category: "gender",
    severity: "low",
    label: "Gendered Congress title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["member of Congress", "representative", "congressperson"]
  },
  {
    id: "stewardess",
    pattern: "\\bstewardess\\b",
    category: "gender",
    severity: "low",
    label: "Gendered cabin-crew title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["flight attendant"]
  },
  {
    id: "waitress",
    pattern: "\\bwaitress\\b",
    category: "gender",
    severity: "low",
    label: "Gendered server title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["server"]
  },
  {
    id: "businessman",
    pattern: "\\b(?:businessman|businesswoman)\\b",
    category: "gender",
    severity: "low",
    label: "Gendered business title",
    why: "Role titles can be gender-neutral without losing meaning.",
    suggestions: ["businessperson", "executive", "entrepreneur"]
  },
  {
    id: "freshman",
    pattern: "\\bfreshm[ae]n\\b",
    category: "gender",
    severity: "low",
    label: "\u201CFreshman\u201D",
    why: "Male-default academic year label; many schools use first-year.",
    suggestions: ["first-year", "first-year student"]
  },
  {
    id: "pregnant-women-only",
    pattern: "\\bpregnant women\\b",
    category: "gender",
    severity: "low",
    label: "\u201CPregnant women\u201D only",
    why: "Not all pregnant people identify as women. Context matters\u2014use the most accurate group term.",
    suggestions: ["pregnant people", "pregnant patients", "people who are pregnant"]
  },
  {
    id: "you-guys",
    pattern: "\\byou guys\\b",
    category: "gender",
    severity: "medium",
    label: "\u201CYou guys\u201D",
    why: "Common mixed-group address that still centers male as default.",
    suggestions: ["you all", "y\u2019all", "everyone", "folks"]
  },
  // ── Ableist ─────────────────────────────────────────────────────────
  {
    id: "crazy",
    pattern: "\\b(?:crazy|insane|psycho|lunatic)\\b",
    category: "ableist",
    severity: "medium",
    label: "Mental-health metaphor",
    why: "Uses psychiatric disability as intensifier or insult.",
    suggestions: ["wild", "intense", "unbelievable", "chaotic", "surprising"]
  },
  {
    id: "lame",
    pattern: "\\blame\\b",
    category: "ableist",
    severity: "medium",
    label: "\u201CLame\u201D",
    why: "Historically tied to physical disability; weak as a synonym for \u201Cbad.\u201D",
    suggestions: ["weak", "uninspired", "disappointing", "flat"]
  },
  {
    id: "dumb",
    pattern: "\\bdumb\\b",
    category: "ableist",
    severity: "medium",
    label: "\u201CDumb\u201D",
    why: "Historically linked to speech disability; often used to demean intelligence.",
    suggestions: ["unhelpful", "ill-considered", "confusing", "not useful"]
  },
  {
    id: "stupid-as-default",
    pattern: "\\bstupid\\b",
    category: "ableist",
    severity: "low",
    label: "\u201CStupid\u201D as dismissive default",
    why: "Often demeans intelligence; can land harder on people with cognitive disabilities. Context matters.",
    suggestions: ["unhelpful", "ill-considered", "poorly designed", "confusing"]
  },
  {
    id: "blind-to",
    pattern: "\\bblind(?:ed)? to\\b|\\bdeaf to\\b|\\bfall on deaf ears\\b",
    category: "ableist",
    severity: "low",
    label: "Sensory metaphor",
    why: "Uses blindness/deafness as metaphors for ignorance.",
    suggestions: ["unaware of", "ignoring", "overlooking", "not listening to", "went unheard"]
  },
  {
    id: "crippled",
    pattern: "\\bcrippled by\\b|\\bcrippling\\b",
    category: "ableist",
    severity: "high",
    label: "\u201CCrippled / crippling\u201D",
    why: "Uses disability as metaphor for damage or severity.",
    suggestions: ["hampered by", "severely limited", "devastating", "severe"]
  },
  {
    id: "wheelchair-bound",
    pattern: "\\bwheelchair[- ]bound\\b|\\bconfined to a wheelchair\\b",
    category: "ableist",
    severity: "high",
    label: "\u201CWheelchair-bound\u201D",
    why: "Frames a mobility aid as confinement rather than access.",
    suggestions: ["wheelchair user", "person who uses a wheelchair"]
  },
  {
    id: "suffers-from",
    pattern: "\\bsuffer(?:s)? from\\b",
    category: "ableist",
    severity: "low",
    label: "\u201CSuffers from\u201D",
    why: "Assumes misery; many prefer neutral \u201Chas\u201D or \u201Clives with.\u201D",
    suggestions: ["has", "lives with", "was diagnosed with"]
  },
  {
    id: "handicap",
    pattern: "\\bhandicapped\\b|\\bthe handicapped\\b",
    category: "ableist",
    severity: "medium",
    label: "\u201CHandicapped\u201D",
    why: "Outdated in many style guides; prefer \u201Cdisabled people\u201D or specific access language.",
    suggestions: ["disabled people", "people with disabilities", "accessible"]
  },
  {
    id: "special-needs",
    pattern: "\\bspecial needs\\b",
    category: "ableist",
    severity: "medium",
    label: "\u201CSpecial needs\u201D",
    why: "Vague and often othering; many prefer naming the disability or support needed.",
    suggestions: [
      "disabled children / disabled people (when accurate)",
      "children with disabilities",
      "name the specific support or disability"
    ]
  },
  {
    id: "retard",
    pattern: "\\b(?:retard|retarded)\\b",
    category: "ableist",
    severity: "high",
    label: "R-slur / \u201Cretarded\u201D",
    why: "Slur against people with intellectual disabilities.",
    suggestions: ["unhelpful", "ill-considered", "describe the specific problem"]
  },
  {
    id: "spaz",
    pattern: "\\b(?:spaz|spastic)\\b",
    category: "ableist",
    severity: "high",
    label: "\u201CSpaz / spastic\u201D",
    why: "Ableist insult rooted in spastic cerebral palsy.",
    suggestions: ["clumsy", "scattered", "overexcited"]
  },
  {
    id: "sanity-check",
    pattern: "\\bsanity checks?\\b",
    category: "ableist",
    severity: "low",
    label: "\u201CSanity check\u201D",
    why: "Uses mental health as a metaphor for correctness.",
    suggestions: ["quick check", "confidence check", "smoke test", "sense check"]
  },
  {
    id: "ocd-metaphor",
    pattern: "\\b(?:so |a bit |kind of |i'?m )?ocd\\b|\\bmy ocd\\b",
    category: "ableist",
    severity: "medium",
    label: "\u201COCD\u201D as personality quirk",
    why: "Trivializes a clinical condition when used for \u201Clikes things tidy.\u201D",
    suggestions: ["particular", "detail-oriented", "I like things organized"]
  },
  {
    id: "bipolar-metaphor",
    pattern: "\\bbipolar(?! disorder)\\b",
    category: "ableist",
    severity: "medium",
    label: "\u201CBipolar\u201D as metaphor",
    why: "Often used for \u201Cmoody\u201D or \u201Cinconsistent,\u201D which stigmatizes bipolar disorder.",
    suggestions: ["inconsistent", "volatile", "unpredictable"]
  },
  // ── Racialized / othering ───────────────────────────────────────────
  {
    id: "whitelist-blacklist",
    pattern: "\\b(?:whitelist|blacklist)(?:ed|ing|s)?\\b",
    category: "racialized",
    severity: "medium",
    label: "Whitelist / blacklist",
    why: "Pairs \u201Cwhite/black\u201D with good/bad. Prefer functional terms.",
    suggestions: ["allowlist / denylist", "permit list / block list"]
  },
  {
    id: "master-slave",
    pattern: "\\bmaster[/\\-]slave\\b",
    category: "racialized",
    severity: "high",
    label: "Master/slave metaphor",
    why: "Evokes slavery; many style guides recommend primary/replica or similar.",
    suggestions: ["primary/replica", "main/secondary", "leader/follower"]
  },
  {
    id: "skin-tone-nude",
    pattern: "\\bnude\\b(?=\\s+(?:color|tone|shade|lipstick|heel|nail))",
    category: "racialized",
    severity: "medium",
    label: "\u201CNude\u201D as default skin tone",
    why: "Often codes light skin as the neutral default.",
    suggestions: ["beige", "taupe", "name the actual shade", "skin-tone inclusive palette"]
  },
  {
    id: "ethnic-food",
    pattern: "\\bethnic (?:food|foods|hairstyle|hairstyles|look|restaurant)s?\\b",
    category: "racialized",
    severity: "medium",
    label: "Vague \u201Cethnic\u201D",
    why: "Treats non-white cultures as a single exotic other.",
    suggestions: ["name the cuisine, culture, or style"]
  },
  {
    id: "illegal-alien",
    pattern: "\\billegal aliens?\\b|\\billegals\\b",
    category: "racialized",
    severity: "high",
    label: "\u201CIllegal alien / illegals\u201D",
    why: "Dehumanizing. People aren\u2019t illegal; status descriptions can stay precise without slur.",
    suggestions: [
      "undocumented immigrant",
      "person without legal status",
      "asylum seeker (when accurate)"
    ]
  },
  {
    id: "ghetto-as-slur",
    pattern: "\\bghetto\\b",
    category: "racialized",
    severity: "high",
    label: "\u201CGhetto\u201D as insult",
    why: "Often used to demean Black and working-class aesthetics or spaces.",
    suggestions: ["under-resourced", "describe the specific condition"]
  },
  {
    id: "grandfathered",
    pattern: "\\bgrandfathered\\b",
    category: "racialized",
    severity: "medium",
    label: "\u201CGrandfathered\u201D",
    why: "Term has roots in Jim Crow voter-suppression \u201Cgrandfather clauses.\u201D",
    suggestions: ["legacy-exempt", "exempt under prior rules", "preexisting exception"]
  },
  {
    id: "colored-people",
    pattern: "\\bcolored (?:people|person|man|woman|folk)\\b|\\bthe colored\\b",
    category: "racialized",
    severity: "high",
    label: "\u201CColored\u201D (for people)",
    why: "Outdated racial label in the US (distinct from South African \u201CColoured\u201D identity).",
    suggestions: ["Black", "people of color (when accurate)", "name the specific group"]
  },
  {
    id: "chinese-wall",
    pattern: "\\bchinese walls?\\b",
    category: "racialized",
    severity: "medium",
    label: "\u201CChinese wall\u201D",
    why: "Finance/legal metaphor that racializes a firewall concept.",
    suggestions: ["ethical wall", "information barrier", "firewall"]
  },
  {
    id: "sold-down-the-river",
    pattern: "\\bsold down the river\\b",
    category: "racialized",
    severity: "high",
    label: "\u201CSold down the river\u201D",
    why: "Alludes to selling enslaved people further into the Deep South.",
    suggestions: ["betrayed", "abandoned", "undermined"]
  },
  {
    id: "peanut-gallery",
    pattern: "\\bpeanut gallery\\b",
    category: "racialized",
    severity: "medium",
    label: "\u201CPeanut gallery\u201D",
    why: "Historically referred to segregated cheap seats; often used to dismiss critics.",
    suggestions: ["critics", "hecklers", "the cheap seats (literal)"]
  },
  {
    id: "uppity",
    pattern: "\\buppity\\b",
    category: "racialized",
    severity: "high",
    label: "\u201CUppity\u201D",
    why: "Historically used to police Black people for not showing deference.",
    suggestions: ["assertive", "confident", "outspoken"]
  },
  {
    id: "thug",
    pattern: "\\bthugs?\\b",
    category: "racialized",
    severity: "medium",
    label: "\u201CThug\u201D",
    why: "Often racially coded when applied to Black people; describe the specific behavior instead.",
    suggestions: ["describe the specific harm or crime"]
  },
  {
    id: "no-can-do",
    pattern: "\\bno can do\\b",
    category: "racialized",
    severity: "low",
    label: "\u201CNo can do\u201D",
    why: "Mocks Chinese Pidgin English stereotypes.",
    suggestions: ["I can\u2019t do that", "that won\u2019t work", "I\u2019m unable to"]
  },
  {
    id: "long-time-no-see",
    pattern: "\\blong time no see\\b",
    category: "racialized",
    severity: "low",
    label: "\u201CLong time no see\u201D",
    why: "Mocks Chinese Pidgin English; many still use it casually\u2014context varies.",
    suggestions: ["it\u2019s been a while", "good to see you again"]
  },
  // ── LGBTQ+ ──────────────────────────────────────────────────────────
  {
    id: "homosexual",
    pattern: "\\bhomosexuals?\\b",
    category: "lgbtq",
    severity: "medium",
    label: "Clinical \u201Chomosexual\u201D",
    why: "Often reads as clinical or pathologizing outside formal/legal contexts.",
    suggestions: ["gay", "lesbian", "queer (if reclaimed/self-ID)", "LGBTQ+ people"]
  },
  {
    id: "sexual-preference",
    pattern: "\\bsexual preferences?\\b",
    category: "lgbtq",
    severity: "medium",
    label: "\u201CSexual preference\u201D",
    why: "Implies orientation is chosen. Prefer \u201Csexual orientation.\u201D",
    suggestions: ["sexual orientation", "orientation"]
  },
  {
    id: "lifestyle",
    pattern: "\\b(?:gay|homosexual|transgender) lifestyle\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CLifestyle\u201D framing",
    why: "Reduces identity to a voluntary lifestyle choice.",
    suggestions: ["lives", "identity", "LGBTQ+ people", "trans people"]
  },
  {
    id: "preferred-pronouns",
    pattern: "\\bpreferred pronouns\\b",
    category: "lgbtq",
    severity: "low",
    label: "\u201CPreferred pronouns\u201D",
    why: "Pronouns aren\u2019t a preference; they are the correct ones to use.",
    suggestions: ["pronouns", "personal pronouns"]
  },
  {
    id: "transgendered",
    pattern: "\\btransgendered\\b|\\ba transgender\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CTransgendered\u201D / \u201Ca transgender\u201D",
    why: "Outdated forms. Use \u201Ctransgender\u201D as an adjective: \u201Ca transgender person.\u201D",
    suggestions: ["transgender", "trans person", "transgender people"]
  },
  {
    id: "born-a-sex",
    pattern: "\\bborn a (?:man|woman|boy|girl)\\b|\\bbiological (?:man|woman|male|female)\\b",
    category: "lgbtq",
    severity: "medium",
    label: "\u201CBorn a\u2026\u201D / \u201Cbiological man/woman\u201D",
    why: "Often used to invalidate trans people. Prefer \u201Cassigned male/female at birth\u201D when medically relevant.",
    suggestions: [
      "assigned male at birth",
      "assigned female at birth",
      "cis man / cis woman (when accurate)"
    ]
  },
  {
    id: "sex-change",
    pattern: "\\bsex changes?\\b",
    category: "lgbtq",
    severity: "medium",
    label: "\u201CSex change\u201D",
    why: "Outdated; gender-affirming care is broader than a single \u201Cchange.\u201D",
    suggestions: [
      "gender-affirming surgery",
      "transition-related care",
      "gender confirmation surgery"
    ]
  },
  {
    id: "tranny-slur",
    pattern: "\\btrann(?:y|ies)\\b",
    category: "lgbtq",
    severity: "high",
    label: "Anti-trans slur",
    why: "Slur against transgender people.",
    suggestions: ["trans person", "transgender person"]
  },
  {
    id: "hermaphrodite",
    pattern: "\\bhermaphrodites?\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CHermaphrodite\u201D",
    why: "Outdated and often offensive; prefer intersex when accurate.",
    suggestions: ["intersex", "intersex person"]
  },
  {
    id: "transwomen-compound",
    pattern: "\\btrans(?:wo)?m[ae]n\\b|\\btrans-(?:wo)?m[ae]n\\b",
    category: "lgbtq",
    severity: "low",
    label: "\u201CTranswomen\u201D / \u201Ctransmen\u201D (closed compound)",
    why: "GLAAD and many style guides prefer \u201Ctrans woman\u201D / \u201Ctrans man\u201D \u2014 \u201Ctrans\u201D as an adjective, not a fused noun. Soft when the closed form is used neutrally.",
    suggestions: ["trans woman", "trans man", "transgender woman / man"],
    defaultSoft: true
  },
  {
    id: "shemale-slur",
    pattern: "\\bshe[- ]?males?\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CShe-male\u201D slur",
    why: "Dehumanizing anti-trans slur; never use it.",
    suggestions: ["trans woman", "transgender woman"]
  },
  {
    id: "trans-identified",
    pattern: "\\btrans[- ]?identified\\b|\\btrans[- ]?identifying\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CTrans-identified\u201D",
    why: "Common in anti-trans rhetoric to deny that someone is a woman or man. Prefer \u201Ctrans woman,\u201D \u201Ctrans man,\u201D or \u201Ctrans person.\u201D",
    suggestions: ["trans woman", "trans man", "trans person", "transgender people"]
  },
  {
    id: "adult-human-female",
    pattern: "\\badult human females?\\b",
    category: "lgbtq",
    severity: "medium",
    label: "\u201CAdult human female\u201D slogan",
    why: "Often used as a campaign slogan to exclude trans women rather than a neutral dictionary gloss. Soft-flagged \u2014 say what policy you mean.",
    suggestions: [
      "women (when that is accurate and inclusive of your intent)",
      "name the specific policy (sports, shelters, healthcare)"
    ],
    defaultSoft: true
  },
  {
    id: "rapid-onset-gd",
    pattern: "\\brapid[- ]onset gender dysphoria\\b|\\brogd\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CRapid-onset gender dysphoria\u201D / ROGD",
    why: "A contested, poorly evidenced framing often used to dismiss trans youth. Prefer clinical language from established medical bodies.",
    suggestions: [
      "gender dysphoria (with clinical sources)",
      "gender-affirming care for youth (if that\u2019s the topic)",
      "cite peer-reviewed guidance, not ROGD blogs"
    ]
  },
  {
    id: "social-contagion-trans",
    pattern: "\\b(?:trans|gender) (?:social )?contagion\\b|\\bsocial contagion\\b(?=.{0,40}\\b(?:trans|gender|dysphoria|pronoun))",
    category: "lgbtq",
    severity: "high",
    label: "\u201CSocial contagion\u201D framing of transition",
    why: "Casts being transgender as a trend or infection. Soft when \u201Csocial contagion\u201D is used in unrelated epidemiology.",
    suggestions: [
      "peer influence / social factors (if studying them carefully)",
      "gender dysphoria with clinical sources",
      "avoid contagion metaphors for identity"
    ],
    defaultSoft: true
  },
  {
    id: "transing-kids",
    pattern: "\\btrans(?:ed|ing)\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CTransing\u201D / \u201Ctransed\u201D",
    why: "Activist slang that frames transition as something done to people (especially kids) rather than care or self-determination.",
    suggestions: [
      "gender-affirming care",
      "transition / social transition",
      "name the specific medical or school policy"
    ]
  },
  {
    id: "mutilation-transition",
    pattern: "\\b(?:genital |chemical )?mutilat(?:e|ion|ing)\\b(?=.{0,50}\\b(?:trans|gender|transition|dysphoria|puberty|blocker))|\\bchemical(?:ly)? castrat(?:e|ion|ing)\\b(?=.{0,50}\\b(?:trans|gender|puberty|blocker|minor|child))",
    category: "lgbtq",
    severity: "high",
    label: "\u201CMutilation\u201D / \u201Cchemical castration\u201D for affirming care",
    why: "Inflammatory framing of gender-affirming care. Soft when discussing documented FGM or court-ordered chemical castration in other contexts.",
    suggestions: [
      "gender-affirming surgery / care",
      "puberty blockers / hormone therapy (clinical terms)",
      "name the specific procedure or medication"
    ],
    defaultSoft: true
  },
  {
    id: "erase-women",
    pattern: "\\beras(?:e|ing|ure) (?:of )?wom(?:an|en)\\b|\\bwom(?:an|en)['\u2019]?s? erasure\\b",
    category: "lgbtq",
    severity: "medium",
    label: "\u201CErasing women\u201D framing",
    why: "Often a campaign slogan casting trans inclusion as elimination of women. Soft \u2014 you can discuss sex discrimination without this frame.",
    suggestions: [
      "name the specific policy conflict",
      "women\u2019s rights and trans rights (both matter)",
      "avoid zero-sum erasure framing"
    ],
    defaultSoft: true
  },
  {
    id: "men-in-dresses",
    pattern: "\\bmen in (?:dresses|skirts|women['\u2019]?s? (?:spaces?|bathrooms?|toilets?|shelters?|sports?))\\b|\\bman in a dress\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CMen in dresses / women\u2019s spaces\u201D smear",
    why: "Reduces trans women to men in costume and frames their presence as threat. Prefer precise policy language if you have a safety concern.",
    suggestions: [
      "trans women",
      "name the facility policy you mean",
      "do not use costume framing for trans people"
    ]
  },
  {
    id: "gender-confused",
    pattern: "\\bgender[- ]confused\\b|\\bconfused about (?:their |his |her )?gender\\b",
    category: "lgbtq",
    severity: "high",
    label: "\u201CGender confused\u201D",
    why: "Dismisses transgender identity as confusion rather than a real identity or clinical diagnosis.",
    suggestions: [
      "trans / transgender",
      "gender dysphoria (clinical, when accurate)",
      "use the person\u2019s stated identity"
    ]
  },
  // ── Class ───────────────────────────────────────────────────────────
  {
    id: "poor-as-insult",
    pattern: "\\b(?:trailer trash|white trash)\\b|\\bthe poor are\\b",
    category: "class",
    severity: "high",
    label: "Classist insult",
    why: "Shames poverty and working-class people.",
    suggestions: ["describe material conditions without contempt"]
  },
  {
    id: "cheap-people",
    pattern: "\\b(?:cheapskate|tightwad)s?\\b",
    category: "class",
    severity: "low",
    label: "Penny-pinching insult",
    why: "Can shame thrift rooted in economic necessity.",
    suggestions: ["frugal", "budget-conscious", "cost-aware"]
  },
  {
    id: "welfare-queen",
    pattern: "\\bwelfare queens?\\b",
    category: "class",
    severity: "high",
    label: "\u201CWelfare queen\u201D",
    why: "Racialized classist stereotype used to shame public assistance.",
    suggestions: ["person receiving benefits", "describe the policy issue"]
  },
  {
    id: "inner-city-coded",
    pattern: "\\binner[- ]city\\b",
    category: "class",
    severity: "low",
    label: "Coded \u201Cinner city\u201D",
    why: "Often a coded stand-in for Black or poor urban communities. Be specific when you can.",
    suggestions: ["name the neighborhood", "under-invested urban area", "specific city district"]
  },
  // ── Age ─────────────────────────────────────────────────────────────
  {
    id: "elderly-as-burden",
    pattern: "\\bthe elderly\\b",
    category: "age",
    severity: "low",
    label: "\u201CThe elderly\u201D",
    why: "Can flatten older adults into a monolith. Prefer \u201Colder adults\u201D when possible.",
    suggestions: ["older adults", "older people", "elders (community-specific)"]
  },
  {
    id: "boomer-as-insult",
    pattern: "\\bok boomer\\b",
    category: "age",
    severity: "low",
    label: "Age put-down",
    why: "Dismisses people by generation rather than engaging the idea.",
    suggestions: ["I disagree because\u2026", "that framing overlooks\u2026"]
  },
  {
    id: "senile",
    pattern: "\\bsenile\\b",
    category: "age",
    severity: "medium",
    label: "\u201CSenile\u201D",
    why: "Often used as an ageist insult rather than a precise clinical description.",
    suggestions: ["describe the specific cognitive concern", "person with dementia (when accurate)"]
  },
  {
    id: "digital-native",
    pattern: "\\bdigital natives?\\b",
    category: "age",
    severity: "medium",
    label: "\u201CDigital native\u201D",
    why: "Ages people as inherently tech-fluent or obsolete; skills are learned, not born.",
    suggestions: ["experienced with\u2026", "proficient in\u2026", "familiar with digital tools"]
  },
  {
    id: "young-energetic",
    pattern: "\\byoung and energetic\\b|\\byoung,? energetic\\b",
    category: "age",
    severity: "medium",
    label: "\u201CYoung and energetic\u201D hiring filter",
    why: "Often codes age discrimination in job ads. Ask for the actual stamina or schedule needs.",
    suggestions: ["high-energy role", "fast-paced environment", "describe the schedule or physical demands"]
  },
  // ── Coded / dogwhistle (on by default; many soft — people may not know) ─
  {
    id: "cultural-marxism",
    pattern: "\\bcultural marxism\\b|\\bcultural marxists?\\b|\\bcultural bolshevism\\b",
    category: "coded",
    severity: "high",
    label: "\u201CCultural Marxism\u201D",
    why: "A conspiracy frame that casts social justice and multiculturalism as a secret plot \u2014 often with antisemitic undertones. Prefer naming the specific policy you mean.",
    suggestions: [
      "name the specific policy or critique",
      "describe the concrete disagreement",
      "avoid conspiracy framing"
    ]
  },
  {
    id: "great-replacement",
    pattern: "\\bgreat replacement\\b|\\bthe replacement\\b(?=\\s+(?:theory|myth|of))",
    category: "coded",
    severity: "high",
    label: "\u201CGreat Replacement\u201D",
    why: "A white-nationalist conspiracy theory about demographic change. Demographic data can be discussed without this frame.",
    suggestions: [
      "demographic change",
      "migration trends",
      "cite specific data without conspiracy framing"
    ]
  },
  {
    id: "blood-and-soil",
    pattern: "\\bblood and soil\\b|\\bblut und boden\\b",
    category: "coded",
    severity: "high",
    label: "\u201CBlood and soil\u201D",
    why: "A Nazi slogan tying ethnicity to land. Almost never neutral in public copy.",
    suggestions: [
      "remove the slogan",
      "describe land stewardship without racial purity framing"
    ]
  },
  {
    id: "echo-parentheses",
    pattern: "\\(\\(\\([^\\n)]{1,80}\\)\\)\\)",
    category: "coded",
    severity: "high",
    label: "(((Echo))) markers",
    why: "Triple parentheses are used by white supremacists to mark people or institutions as Jewish. If that isn\u2019t your intent, don\u2019t use the markup.",
    suggestions: [
      "remove the triple parentheses",
      "name the person or organization plainly"
    ]
  },
  {
    id: "fourteen-eighty-eight",
    pattern: "\\b1488\\b|\\b14\\s*/\\s*88\\b|\\b14/88\\b",
    category: "coded",
    severity: "high",
    label: "1488 / 14/88",
    why: "Combines white-supremacist \u201C14 words\u201D and \u201C88\u201D (HH). Numbers alone can be coincidental \u2014 soft-flagged so you can check context.",
    suggestions: [
      "avoid the number combo in usernames and copy if unintended",
      "use a different numeric ID"
    ],
    defaultSoft: true
  },
  {
    id: "globalist-smear",
    pattern: "\\bglobalists?\\b",
    category: "coded",
    severity: "medium",
    label: "\u201CGlobalist\u201D as smear",
    why: "Can mean trade policy \u2014 or a coded antisemitic / nativist smear about \u201Celites.\u201D Soft-flagged: say what you actually mean.",
    suggestions: [
      "multinational corporations",
      "trade policy you oppose",
      "name the institution or practice"
    ],
    defaultSoft: true
  },
  {
    id: "western-values-dogwhistle",
    pattern: "\\bwestern values\\b|\\bwestern culture\\b|\\bour way of life\\b",
    category: "coded",
    severity: "low",
    label: "\u201CWestern values / culture\u201D as code",
    why: "Sometimes ordinary geography or history \u2014 sometimes a euphemism for ethnonationalism or anti-Muslim / anti-LGBTQ politics. Soft-flagged so you can be specific.",
    suggestions: [
      "name the specific right or tradition (e.g. free press, due process)",
      "democracy and human rights",
      "avoid vague civilizational framing"
    ],
    defaultSoft: true
  },
  {
    id: "trans-agenda",
    pattern: "\\btrans(?:gender)? agenda\\b|\\bgender ideology\\b|\\bgender critical ideology\\b",
    category: "coded",
    severity: "high",
    label: "\u201CTrans agenda\u201D / \u201Cgender ideology\u201D",
    why: "Conspiracy framing that treats trans people\u2019s rights and existence as a coordinated plot. Prefer concrete policy disagreements.",
    suggestions: [
      "name the specific policy",
      "trans people\u2019s rights",
      "gender-affirming care policy (if that\u2019s the topic)"
    ]
  },
  {
    id: "groomer-smear",
    pattern: "\\bgroomers?\\b",
    category: "coded",
    severity: "high",
    label: "\u201CGroomer\u201D as smear",
    why: "Often used as a false, dangerous smear against LGBTQ+ people and educators. Soft-flagged around literal child-protection language; skipped for pet/salon groomers.",
    suggestions: [
      "do not use as a political smear",
      "name the specific harm or crime if one exists",
      "educator / librarian / advocate (when accurate)"
    ],
    defaultSoft: true
  },
  {
    id: "go-woke-go-broke",
    pattern: "\\bgo(?:t)? woke,? go broke\\b|\\bget woke,? go broke\\b",
    category: "coded",
    severity: "medium",
    label: "\u201CGo woke, go broke\u201D",
    why: "A stock anti-inclusion slogan. Soft-flagged \u2014 you can critique a business decision without the catchphrase.",
    suggestions: [
      "describe the specific business or creative disagreement",
      "avoid the slogan if you don\u2019t mean the culture-war frame"
    ],
    defaultSoft: true
  },
  {
    id: "modern-audience",
    pattern: "\\bmodern audiences?\\b",
    category: "coded",
    severity: "low",
    label: "\u201CModern audience\u201D (anti-inclusion code)",
    why: "In some gaming and media circles, a dogwhistle for resentment of diversity casting or inclusive writing. Soft-flagged \u2014 ordinary marketing use is common.",
    suggestions: [
      "today\u2019s viewers / players",
      "name the specific creative choice",
      "diverse casting (if that\u2019s what you mean positively)"
    ],
    defaultSoft: true
  },
  {
    id: "white-genocide",
    pattern: "\\bwhite genocide\\b",
    category: "coded",
    severity: "high",
    label: "\u201CWhite genocide\u201D",
    why: "White-supremacist conspiracy claim that white people are being deliberately erased. Closely tied to Great Replacement rhetoric.",
    suggestions: [
      "demographic change with cited data",
      "specific policy critique without eliminationist framing"
    ]
  },
  {
    id: "race-realism",
    pattern: "\\brace realism\\b|\\bhuman biodiversity\\b|\\bhbd\\b",
    category: "coded",
    severity: "high",
    label: "\u201CRace realism\u201D / HBD",
    why: "Euphemisms for scientific racism \u2014 fixed racial hierarchies of intelligence or behavior. Soft-flagged for the bare acronym HBD.",
    suggestions: [
      "reject racial hierarchy framing",
      "discuss inequality via history and policy, not racial essentialism"
    ],
    defaultSoft: true
  },
  {
    id: "iotbw",
    pattern: "\\bit['\u2019]?s okay to be white\\b|\\biotbw\\b",
    category: "coded",
    severity: "high",
    label: "\u201CIt\u2019s okay to be white\u201D / IOTBW",
    why: "4chan-origin campaign slogan used to normalize white-identity politics and bait media \u2014 not a generic anti-racism message.",
    suggestions: [
      "oppose racism without the campaign slogan",
      "affirm everyone\u2019s dignity without ethnonational branding"
    ]
  },
  {
    id: "remigration",
    pattern: "\\bremigration\\b|\\bre-?migrat(?:e|ion)\\b",
    category: "coded",
    severity: "high",
    label: "\u201CRemigration\u201D",
    why: "In far-right usage, a euphemism for mass removal of immigrants and often citizens of immigrant background. Soft-flagged when voluntary-return policy is clearly meant.",
    suggestions: [
      "voluntary return / assisted departure (if that\u2019s the policy)",
      "asylum or immigration law specifics",
      "avoid euphemisms for mass ethnic removal"
    ],
    defaultSoft: true
  },
  {
    id: "soy-boy",
    pattern: "\\bsoy[- ]?boys?\\b",
    category: "coded",
    severity: "medium",
    label: "\u201CSoy boy\u201D",
    why: "Misogynistic insult policing masculinity and mocking progressive men via pseudoscience about soy. Soft-flagged.",
    suggestions: [
      "drop the insult",
      "critique ideas without gendered food memes"
    ],
    defaultSoft: true
  },
  {
    id: "kalergi-plan",
    pattern: "\\bkalergi(?:\\s+plan)?\\b|\\bcoudenhove[- ]kalergi\\b",
    category: "coded",
    severity: "high",
    label: "\u201CKalergi plan\u201D",
    why: "Antisemitic conspiracy theory claiming a secret plan to destroy Europe through migration \u2014 related to Great Replacement myths.",
    suggestions: [
      "discuss EU migration policy with primary sources",
      "avoid secret-plot framing"
    ]
  },
  {
    id: "clown-world",
    pattern: "\\bclown world\\b|\\bhonkler\\b|\\bhonk honk\\b",
    category: "coded",
    severity: "medium",
    label: "\u201CClown world\u201D / Honkler",
    why: "Far-right meme framing diversity and LGBTQ+ rights as civilization collapsing into absurdity. Soft-flagged.",
    suggestions: [
      "describe the specific policy failure or news event",
      "avoid the meme branding if you don\u2019t mean that frame"
    ],
    defaultSoft: true
  },
  // ── General inclusion ───────────────────────────────────────────────
  {
    id: "ninja-rockstar",
    pattern: "\\b(?:coding )?ninjas?\\b|\\b(?:marketing )?rockstars?\\b",
    category: "general",
    severity: "low",
    label: "Hyperbolic job titles",
    why: "Can feel exclusionary in hiring copy and often imports cultural metaphors casually. (UI \u201Cwizard\u201D steps are not flagged.)",
    suggestions: ["skilled", "experienced", "strong contributor"]
  },
  {
    id: "culture-fit",
    pattern: "\\bculture fit\\b",
    category: "general",
    severity: "medium",
    label: "\u201CCulture fit\u201D",
    why: "Often codes for hiring people like the existing team and can shut out difference.",
    suggestions: ["values alignment", "ways of working", "collaboration style"]
  },
  {
    id: "master-branch",
    pattern: "\\bmaster branch\\b",
    category: "general",
    severity: "low",
    label: "\u201CMaster\u201D branch",
    why: "Many projects renamed default branches to avoid master/slave echoes. Optional depending on your norms.",
    suggestions: ["main branch", "default branch"]
  }
];

// src/lib/preferences.ts
function resolveRules(preferences) {
  return LANGUAGE_RULES.flatMap((rule) => {
    const pref = preferences?.[rule.id];
    if (pref?.enabled === false) return [];
    return [
      {
        ...rule,
        severity: pref?.severity ?? rule.severity
      }
    ];
  });
}
function defaultPreferences() {
  const prefs = {};
  for (const rule of LANGUAGE_RULES) {
    prefs[rule.id] = { enabled: true, severity: rule.severity };
  }
  return prefs;
}

// src/lib/context.ts
var WINDOW = 90;
var TECH_DISCOVER = /\b(?:a\s+bug|the\s+bug|bugs?\b|issues?\b|vulnerabilit(?:y|ies)|errors?\b|flaws?\b|problems?\b|exploits?\b|leaks?\b|race\s+condition|regression|zero[- ]day|security\s+hole)\b/i;
var PLACE_OR_PEOPLE = /\b(?:land|lands|america|americas|continent|island|islands|country|countries|nation|nations|people|peoples|tribe|tribes|world|africa|asia|australia|india|canada|mexico|brazil|territory|territories|shore|coast|caribbean|pacific|atlantic|indigenous|native|aboriginal|settler|colony|colon(?:y|ies)|voyage|explorer|expedition)\b/i;
var LEGAL_NEAR = /\b(?:pursuant\s+to|hereinafter|whereas|plaintiff|defendant|statute|section\s+\d|u\.?s\.?\s*c\.|cfr|herein|thereof|notwithstanding|exhibit\s+[A-Z]|bill\s+\d+|regulation|ordinance|code\s+of\s+conduct|terms\s+of\s+(?:use|service)|privacy\s+policy)\b/i;
var SELF_DESC_NEAR = /\b(?:i\s+am|i'm|we\s+are|we're|as\s+a|identify\s+as|my\s+pronouns|our\s+pronouns)\b/i;
var FIRST_PERSON_NEAR = /\b(?:i|i'm|i've|i'd|me|my|myself|we|we're|we've|our|ours)\b/i;
var ILLNESS_NEAR = /\b(?:cancer|illness|disease|diagnos(?:is|ed)|depression|anxiety|ptsd|bipolar|schizophrenia|chronic|pain|hospital|symptom|flare|remission|chemotherapy|treatment|disability|disabled|neurodiverg)\w*\b/i;
var ORG_SUFFIX_NEAR = /\b(?:cancer|foundation|society|campaign|organization|organisation|initiative|project|coalition|alliance|network|fund|institute|association|collective)\b/i;
var ABLEIST_METAPHOR_RULES = /* @__PURE__ */ new Set([
  "crazy",
  "lame",
  "dumb",
  "stupid-as-default",
  "blind-to",
  "crippled",
  "suffers-from",
  "spaz",
  "sanity-check",
  "ocd-metaphor",
  "bipolar-metaphor",
  "wheelchair-bound",
  "handicapped",
  "retarded"
]);
function windowAround(text, index, length) {
  const start = Math.max(0, index - WINDOW);
  const end = Math.min(text.length, index + length + WINDOW);
  return text.slice(start, end);
}
function isInsideQuotes(text, index, length) {
  const before = text.slice(Math.max(0, index - 120), index);
  const after = text.slice(index + length, index + length + 120);
  const openStraight = (before.match(/"/g) || []).length;
  const closeStraight = (after.match(/"/g) || []).length;
  if (openStraight % 2 === 1 && closeStraight >= 1) return true;
  const openCurly = (before.match(/[“«]/g) || []).length;
  const closeCurly = (after.match(/[”»]/g) || []).length;
  if (openCurly > closeCurly) return true;
  const openSingle = (before.match(/(?:^|[\s([{])'/g) || []).length;
  const closeSingle = (after.match(/'(?:$|[\s)\]}.,;:!?])/g) || []).length;
  if (openSingle > 0 && closeSingle > 0 && openSingle >= closeSingle) return true;
  return false;
}
function looksLikeOrgOrProperName(text, index, length) {
  const matched = text.slice(index, index + length);
  if (!matched || matched[0] !== matched[0].toUpperCase()) return false;
  const after = text.slice(index + length, index + length + 48);
  const before = text.slice(Math.max(0, index - 48), index);
  const afterWord = after.match(/^\s+([A-Za-z']+)/)?.[1];
  if (afterWord && /^[A-Z]/.test(afterWord) && ORG_SUFFIX_NEAR.test(afterWord)) {
    return true;
  }
  if (/\b(?:called|named|known\s+as)\b/i.test(before) && /^[A-Z]/.test(matched)) {
    return true;
  }
  return false;
}
function hintsForRule(ruleId) {
  if (ruleId === "discover-land") {
    return {
      requireNear: PLACE_OR_PEOPLE,
      excludeNear: TECH_DISCOVER
    };
  }
  if (ruleId === "colonize-metaphor") {
    return {
      softExcludeNear: /\b(?:actual|historical|settler|indigenous|anti[- ]?colonial|decolon)\w*\b/i
    };
  }
  if (ruleId === "primitive") {
    return {
      softExcludeNear: /\b(?:type|data\s+type|int|integer|value|javascript|python|stack)\b/i
    };
  }
  if (ruleId === "tribe-generic") {
    return {
      softExcludeNear: /\b(?:product|engineering|sales|marketing|customer\s+success)\s+tribe\b/i
    };
  }
  if (ruleId === "guru") {
    return {
      softExcludeNear: /\b(?:sikh|hindu|spiritual|religious|ashram|teacher)\b/i
    };
  }
  if (ruleId === "groomer-smear") {
    return {
      excludeNear: /\b(?:dog|cat|pet|horse|animal|hair|nail|salon|spa)\b.{0,20}\bgroomers?\b|\bgroomers?\b.{0,20}\b(?:dog|cat|pet|salon|spa|business)\b/i
    };
  }
  if (ruleId === "globalist-smear") {
    return {
      softExcludeNear: /\b(?:trade|WTO|IMF|World Bank|multilateral|supply chain|offshoring)\b/i
    };
  }
  if (ruleId === "remigration") {
    return {
      softExcludeNear: /\b(?:voluntary|assisted)\s+(?:return|departure|repatriation)\b|\brepatriation\s+program/i
    };
  }
  if (ruleId === "soy-boy") {
    return {
      softExcludeNear: /\b(?:tofu|edamame|soy\s+(?:milk|sauce|protein|beans?))\b/i
    };
  }
  if (ruleId === "mutilation-transition") {
    return {
      softExcludeNear: /\bfemale genital mutilation\b|\bFGM\b|\bcourt[- ]ordered\b|\bchemical castration (?:of|for) (?:sex )?offenders?\b/i
    };
  }
  if (ruleId === "social-contagion-trans") {
    return {
      softExcludeNear: /\b(?:measles|influenza|covid|epidemiolog|virus|infection rate)\b/i
    };
  }
  return null;
}
function evaluateMatchContext(text, index, length, ruleId) {
  const modes = [];
  let skip = false;
  let likelyFalsePositive = false;
  let note;
  const nearby = windowAround(text, index, length);
  const hints = hintsForRule(ruleId);
  const ableistMetaphor = ABLEIST_METAPHOR_RULES.has(ruleId);
  if (hints?.excludeNear?.test(nearby)) {
    skip = true;
    note = "Skipped \u2014 looks like a non-colonial idiom (e.g. discovered a bug).";
  } else if (hints?.requireNear && !hints.requireNear.test(nearby)) {
    skip = true;
    note = "Skipped \u2014 no place/people context near \u201Cdiscovered.\u201D";
  }
  if (!skip && looksLikeOrgOrProperName(text, index, length)) {
    modes.push("orgName");
    skip = true;
    note = "Skipped \u2014 looks like an organization or proper name.";
  }
  if (!skip && ableistMetaphor && FIRST_PERSON_NEAR.test(nearby) && ILLNESS_NEAR.test(nearby)) {
    modes.push("illnessStory");
    skip = true;
    note = "Skipped \u2014 first-person illness or disability story; not treating lived experience as a metaphor to \u201Cfix.\u201D";
  }
  if (!skip && hints?.softExcludeNear?.test(nearby)) {
    likelyFalsePositive = true;
    note = "Likely fine in this context \u2014 soft-flagged.";
  }
  if (!skip && isInsideQuotes(text, index, length)) {
    modes.push("quote");
    if (ableistMetaphor) {
      skip = true;
      note = "Skipped \u2014 inside quotation marks (cited speech, not author framing).";
    } else {
      likelyFalsePositive = true;
      note = note ?? "Inside quotation marks \u2014 often a cited speaker, not the author\u2019s framing.";
    }
  }
  if (!skip && LEGAL_NEAR.test(nearby)) {
    modes.push("legal");
    if (ableistMetaphor || ruleId === "master-slave" || ruleId === "whitelist-blacklist" || ruleId === "grandfathered") {
      skip = true;
      note = "Skipped \u2014 near legal or policy language; may be a required term of art.";
    } else {
      likelyFalsePositive = true;
      note = note ?? "Near legal or policy boilerplate \u2014 may be a required term of art.";
    }
  }
  if (!skip && SELF_DESC_NEAR.test(nearby)) {
    modes.push("selfDescription");
    if (/^(guys|ladies|homosexual|transgendered|biological-|preferred-pronoun)/.test(
      ruleId
    ) || ruleId.includes("pronoun") || ruleId.includes("guys") || ruleId.includes("ladies")) {
      likelyFalsePositive = true;
      note = note ?? "Near self-description \u2014 the speaker may be naming their own identity.";
    }
  }
  if (hints?.excludeNear && TECH_DISCOVER.test(nearby) && ruleId === "discover-land") {
    modes.push("techIdiom");
  }
  return { modes, likelyFalsePositive, skip, note };
}

// src/lib/analyzer.ts
var CONTEXT_RADIUS = 72;
function buildRegex(pattern, matchWholeWord = false) {
  const body = matchWholeWord ? `\\b(?:${pattern})\\b` : pattern;
  return new RegExp(body, "gi");
}
function snippetAround(text, index, length) {
  const start = Math.max(0, index - CONTEXT_RADIUS);
  const end = Math.min(text.length, index + length + CONTEXT_RADIUS);
  const prefix = start > 0 ? "\u2026" : "";
  const suffix = end < text.length ? "\u2026" : "";
  return `${prefix}${text.slice(start, end).replace(/\s+/g, " ").trim()}${suffix}`;
}
function summarize(findings) {
  const byCategory = {};
  const bySeverity = {};
  for (const finding of findings) {
    byCategory[finding.category] = (byCategory[finding.category] ?? 0) + 1;
    bySeverity[finding.severity] = (bySeverity[finding.severity] ?? 0) + 1;
  }
  return {
    total: findings.length,
    byCategory,
    bySeverity
  };
}
function analyzeText(text, options = {}) {
  const findings = [];
  const normalized = text.replace(/\u00a0/g, " ");
  const rules = resolveRules(options.preferences);
  for (const rule of rules) {
    const regex = buildRegex(rule.pattern, rule.matchWholeWord);
    let match;
    while ((match = regex.exec(normalized)) !== null) {
      const matchedText = match[0];
      const ctx = evaluateMatchContext(
        normalized,
        match.index,
        matchedText.length,
        rule.id
      );
      if (ctx.skip) {
        if (match.index === regex.lastIndex) {
          regex.lastIndex += 1;
        }
        continue;
      }
      findings.push({
        id: `${rule.id}-${match.index}-${findings.length}`,
        ruleId: rule.id,
        match: matchedText,
        category: rule.category,
        severity: rule.severity,
        label: rule.label,
        why: rule.why,
        suggestions: rule.suggestions,
        context: snippetAround(normalized, match.index, matchedText.length),
        index: match.index,
        source: options.sourceTag,
        likelyFalsePositive: ctx.likelyFalsePositive || rule.defaultSoft || void 0,
        contextNote: ctx.note ?? (rule.defaultSoft ? "Coded language often spreads without intent \u2014 a heads-up to check context, not a verdict." : void 0),
        contextModes: ctx.modes.length ? ctx.modes : void 0
      });
      if (match.index === regex.lastIndex) {
        regex.lastIndex += 1;
      }
    }
  }
  findings.sort((a, b) => {
    const severityRank = {
      high: 0,
      medium: 1,
      low: 2
    };
    const severityDiff = severityRank[a.severity] - severityRank[b.severity];
    if (severityDiff !== 0) return severityDiff;
    const fpDiff = Number(Boolean(a.likelyFalsePositive)) - Number(Boolean(b.likelyFalsePositive));
    if (fpDiff !== 0) return fpDiff;
    return a.index - b.index;
  });
  return {
    sourceType: options.sourceType ?? "text",
    sourceLabel: options.sourceLabel ?? "text",
    title: options.title,
    excerptCount: normalized.trim().length,
    findings,
    summary: summarize(findings),
    analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
function analyzeSegments(segments, options) {
  const findings = [];
  let totalChars = 0;
  for (const segment of segments) {
    const partial = analyzeText(segment.text, {
      ...options,
      sourceTag: segment.source
    });
    totalChars += segment.text.trim().length;
    findings.push(...partial.findings);
  }
  findings.sort((a, b) => {
    const severityRank = {
      high: 0,
      medium: 1,
      low: 2
    };
    const severityDiff = severityRank[a.severity] - severityRank[b.severity];
    if (severityDiff !== 0) return severityDiff;
    return Number(Boolean(a.likelyFalsePositive)) - Number(Boolean(b.likelyFalsePositive));
  });
  return {
    sourceType: options.sourceType,
    sourceLabel: options.sourceLabel,
    title: options.title,
    excerptCount: totalChars,
    findings,
    summary: summarize(findings),
    analyzedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}

// src/lib/code-scanner.ts
var STRING_LITERAL_RE = /(?<!\\)(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|`(?:\\.|[^`\\]|\$\{[^}]*\})*`)/g;
var COMMENT_RE = /\/\/[^\n]*|\/\*[\s\S]*?\*\/|<!--[\s\S]*?-->|#(?!\!)[^\n]*/g;
var JSX_TEXT_RE = />([^<>{][^<>]*)</g;
var PROSE_EXTENSION_RE = /\.(?:md|mdx|txt|rst|adoc)$/i;
function stripQuotes(literal) {
  if (literal.startsWith('"') && literal.endsWith('"') || literal.startsWith("'") && literal.endsWith("'") || literal.startsWith("`") && literal.endsWith("`")) {
    return literal.slice(1, -1);
  }
  return literal;
}
function isLikelyUserFacing(text) {
  const trimmed = text.trim();
  if (trimmed.length < 3) return false;
  if (/^[A-Z0-9_./:-]+$/.test(trimmed) && !/\s/.test(trimmed)) return false;
  if (/^https?:\/\//i.test(trimmed)) return false;
  if (/^[\w.-]+@[\w.-]+$/.test(trimmed)) return false;
  if (/^[.#]?[a-z]+(-[a-z0-9]+)+$/.test(trimmed)) return false;
  if (/^\$\{/.test(trimmed)) return false;
  return /[A-Za-z]/.test(trimmed);
}
function extractReviewableSegments(file) {
  const segments = [];
  const { path: path6, content } = file;
  if (PROSE_EXTENSION_RE.test(path6)) {
    let inFence = false;
    for (const [index, line] of content.split(/\r?\n/).entries()) {
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        continue;
      }
      const text = line.replace(/^\s{0,3}#{1,6}\s+/, "").replace(/!\[[^\]]*\]\([^)]*\)/g, " ").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      if (!inFence && isLikelyUserFacing(text)) {
        segments.push({ text, source: `${path6}:${index + 1}` });
      }
    }
    return segments;
  }
  for (const match of content.matchAll(STRING_LITERAL_RE)) {
    const text = stripQuotes(match[0]).replace(/\\n/g, " ").replace(/\\t/g, " ").replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\s+/g, " ").trim();
    if (!isLikelyUserFacing(text)) continue;
    const line = content.slice(0, match.index ?? 0).split("\n").length;
    segments.push({ text, source: `${path6}:${line}` });
  }
  for (const match of content.matchAll(COMMENT_RE)) {
    const text = match[0].replace(/^\/\/\s?/, "").replace(/^\/\*+/, "").replace(/\*+\/$/, "").replace(/^<!--/, "").replace(/-->$/, "").replace(/^#\s?/, "").replace(/\s+/g, " ").trim();
    if (!isLikelyUserFacing(text) || text.length < 8) continue;
    const line = content.slice(0, match.index ?? 0).split("\n").length;
    segments.push({ text, source: `${path6}:${line} (comment)` });
  }
  if (/\.(tsx|jsx|vue|svelte|html?|cshtml|razor)$/i.test(path6)) {
    for (const match of content.matchAll(JSX_TEXT_RE)) {
      const text = (match[1] ?? "").replace(/\s+/g, " ").trim();
      if (!isLikelyUserFacing(text)) continue;
      const line = content.slice(0, match.index ?? 0).split("\n").length;
      segments.push({ text, source: `${path6}:${line} (markup)` });
    }
  }
  if (/\.(cshtml|razor)$/i.test(path6)) {
    for (const match of content.matchAll(/@\*([\s\S]*?)\*@/g)) {
      const text = (match[1] ?? "").replace(/\s+/g, " ").trim();
      if (!isLikelyUserFacing(text) || text.length < 8) continue;
      const line = content.slice(0, match.index ?? 0).split("\n").length;
      segments.push({ text, source: `${path6}:${line} (razor comment)` });
    }
  }
  return segments;
}
function analyzeCodeFiles(files, preferences) {
  const segments = files.flatMap(extractReviewableSegments);
  const label = files.length === 1 ? files[0].path : `${files.length} files`;
  return analyzeSegments(segments, {
    sourceType: "code",
    sourceLabel: label,
    title: "Code language review",
    preferences
  });
}
var CODE_EXTENSIONS = [
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".cs",
  ".cshtml",
  ".razor",
  ".py",
  ".rb",
  ".go",
  ".java",
  ".kt",
  ".swift",
  ".rs",
  ".php",
  ".vue",
  ".svelte",
  ".html",
  ".htm",
  ".md",
  ".mdx",
  ".txt",
  ".rst",
  ".adoc",
  ".json",
  ".yml",
  ".yaml"
];
function hasSupportedExtension(filename) {
  const lower = filename.toLowerCase();
  return CODE_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

// src/cli/args.ts
function parseArgs(argv) {
  const args = {
    command: "scan",
    help: false,
    version: false,
    format: "text",
    failOn: "hard",
    outPath: null,
    ignorePath: null,
    paths: [],
    urls: [],
    urlsFile: null,
    baselinePath: ".antidefaultbaseline.json",
    useBaseline: true,
    changedFrom: null
  };
  let i = 0;
  if (argv[0] === "init" || argv[0] === "baseline") {
    args.command = argv[0];
    i = 1;
  }
  while (i < argv.length) {
    const a = argv[i];
    if (a === "-h" || a === "--help") {
      args.help = true;
      i += 1;
      continue;
    }
    if (a === "-v" || a === "--version") {
      args.version = true;
      i += 1;
      continue;
    }
    if (a === "--format" || a === "-f") {
      const v = argv[++i];
      if (v === "text" || v === "json" || v === "sarif") args.format = v;
      else throw new Error(`Unknown format: ${v}`);
      i += 1;
      continue;
    }
    if (a === "--fail-on") {
      const v = argv[++i];
      if (v === "any" || v === "hard" || v === "never") args.failOn = v;
      else throw new Error(`Unknown --fail-on: ${v} (use any|hard|never)`);
      i += 1;
      continue;
    }
    if (a === "--out" || a === "-o") {
      args.outPath = argv[++i] ?? null;
      i += 1;
      continue;
    }
    if (a === "--ignore-file") {
      args.ignorePath = argv[++i] ?? null;
      i += 1;
      continue;
    }
    if (a === "--urls") {
      i += 1;
      while (i < argv.length && !argv[i].startsWith("-")) {
        args.urls.push(argv[i]);
        i += 1;
      }
      continue;
    }
    if (a === "--urls-file") {
      args.urlsFile = argv[++i] ?? null;
      i += 1;
      continue;
    }
    if (a === "--baseline-file") {
      args.baselinePath = argv[++i] ?? ".antidefaultbaseline.json";
      i += 1;
      continue;
    }
    if (a === "--no-baseline") {
      args.useBaseline = false;
      i += 1;
      continue;
    }
    if (a === "--changed-from") {
      args.changedFrom = argv[++i] ?? null;
      i += 1;
      continue;
    }
    if (a.startsWith("-")) {
      throw new Error(`Unknown option: ${a}`);
    }
    args.paths.push(a);
    i += 1;
  }
  return args;
}
var HELP = `Anti-Default \u2014 inclusive language scan for files and URLs

Usage:
  npx anti-default init
  npx anti-default [paths\u2026] [options]
  npx anti-default baseline [paths\u2026]
  npx anti-default --urls https://example.com https://example.com/about
  npx anti-default --urls-file urls.txt --format json

Options:
  --format, -f text|json|sarif   Output format (default: text)
  --fail-on any|hard|never       Exit 1 when findings match (default: hard)
                                 hard = non-soft findings; any = all findings
  --out, -o <file>               Write output to a file
  --ignore-file <path>           Path to ignore file (default: .antidefaultignore)
  --urls <url\u2026>                  Scan public HTML pages instead of files
  --urls-file <path>             File with one URL per line
  --changed-from <git-ref>       Scan files changed since a branch/SHA
  --baseline-file <path>         Baseline file (default: .antidefaultbaseline.json)
  --no-baseline                  Report findings already in the baseline
  -h, --help                     Show help
  -v, --version                  Show version

Ignore file (.antidefaultignore):
  node_modules/
  *.min.js
  rule:guys                      # disable a rule id for this scan

Examples:
  npx anti-default init
  npx anti-default .
  npx anti-default baseline .
  npx anti-default . --changed-from origin/main
  npx anti-default ./src ./README.md --format sarif -o results.sarif
  npx anti-default --urls https://example.com --fail-on any
`;

// src/cli/format.ts
function buildSummary(findings) {
  const byRule = {};
  let soft = 0;
  for (const f of findings) {
    byRule[f.ruleId] = (byRule[f.ruleId] ?? 0) + 1;
    if (f.likelyFalsePositive) soft += 1;
  }
  return {
    total: findings.length,
    hard: findings.length - soft,
    soft,
    byRule
  };
}
function formatText(report) {
  const lines = [];
  lines.push("Anti-Default \u2014 inclusive language scan");
  lines.push(`Mode: ${report.mode}`);
  if (report.filesScanned != null) {
    lines.push(`Files scanned: ${report.filesScanned}`);
  }
  if (report.urlsScanned != null) {
    lines.push(`URLs scanned: ${report.urlsScanned}`);
  }
  if (report.suppressedByBaseline) {
    lines.push(`Baseline: ${report.suppressedByBaseline} existing finding(s) hidden`);
  }
  lines.push(
    `Findings: ${report.summary.total} (${report.summary.hard} hard \xB7 ${report.summary.soft} soft)`
  );
  const top = Object.entries(report.summary.byRule).sort((a, b) => b[1] - a[1]).slice(0, 25);
  if (top.length) {
    lines.push("");
    lines.push("By rule:");
    for (const [id, n] of top) lines.push(`  ${n}	${id}`);
  }
  if (report.findings.length === 0) {
    lines.push("");
    lines.push("No phrases to reconsider in scanned content.");
    return lines.join("\n");
  }
  const show = report.findings.slice(0, 100);
  for (const f of show) {
    const soft = f.likelyFalsePositive ? " [soft]" : "";
    const where = f.source ? ` @ ${f.source}` : "";
    lines.push("");
    lines.push(`[${f.label}]${soft}${where}`);
    lines.push(`  match: "${f.match}"`);
    lines.push(`  why:   ${f.why}`);
    lines.push(`  try:   ${f.suggestions.join(" \xB7 ")}`);
    lines.push(`  ctx:   ${f.context}`);
  }
  if (report.findings.length > show.length) {
    lines.push("");
    lines.push(`\u2026and ${report.findings.length - show.length} more.`);
  }
  return lines.join("\n");
}
function formatJson(report) {
  return JSON.stringify(report, null, 2);
}
function formatSarif(report) {
  const rulesMap = /* @__PURE__ */ new Map();
  for (const f of report.findings) {
    if (!rulesMap.has(f.ruleId)) {
      rulesMap.set(f.ruleId, {
        id: f.ruleId,
        name: f.label,
        shortDescription: { text: f.why }
      });
    }
  }
  const results = report.findings.map((f) => {
    const uri = f.source?.split(":")[0] || "about:blank";
    const lineMatch = f.source?.match(/:(\d+)/);
    const line = lineMatch ? Number(lineMatch[1]) : 1;
    return {
      ruleId: f.ruleId,
      level: f.likelyFalsePositive ? "note" : "warning",
      message: {
        text: `${f.label}: \u201C${f.match}\u201D \u2014 ${f.why}${f.suggestions[0] ? ` Try: ${f.suggestions[0]}` : ""}`
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: { uri },
            region: { startLine: line }
          }
        }
      ],
      properties: {
        category: f.category,
        soft: Boolean(f.likelyFalsePositive),
        match: f.match
      }
    };
  });
  const sarif = {
    $schema: "https://json.schemastore.org/sarif-2.1.0.json",
    version: "2.1.0",
    runs: [
      {
        tool: {
          driver: {
            name: "Anti-Default",
            version: report.version,
            informationUri: "https://github.com/NomadBuilder/anti-default",
            rules: [...rulesMap.values()]
          }
        },
        results
      }
    ]
  };
  return JSON.stringify(sarif, null, 2);
}

// src/cli/ignore.ts
var import_node_fs = require("node:fs");
var import_node_path = __toESM(require("node:path"));
var DEFAULT_IGNORE = `.antidefaultignore`;
function emptyIgnore() {
  return { patterns: [], disabledRules: /* @__PURE__ */ new Set(), filePath: null };
}
async function loadIgnoreFile(cwd, explicitPath) {
  const candidates = explicitPath ? [import_node_path.default.resolve(cwd, explicitPath)] : [
    import_node_path.default.resolve(cwd, DEFAULT_IGNORE),
    import_node_path.default.resolve(cwd, ".antidefaultignore")
  ];
  for (const filePath of candidates) {
    try {
      const raw = await import_node_fs.promises.readFile(filePath, "utf8");
      return parseIgnore(raw, filePath);
    } catch {
    }
  }
  return emptyIgnore();
}
function parseIgnore(raw, filePath) {
  const patterns = [];
  const disabledRules = /* @__PURE__ */ new Set();
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const ruleMatch = /^rule:\s*([a-z0-9-]+)\s*$/i.exec(trimmed);
    if (ruleMatch?.[1]) {
      disabledRules.add(ruleMatch[1]);
      continue;
    }
    patterns.push(trimmed);
  }
  return { patterns, disabledRules, filePath };
}
function pathIgnored(relativePath, patterns) {
  const normalized = relativePath.replace(/\\/g, "/").replace(/^\.\//, "");
  for (const pattern of patterns) {
    if (matchGitish(normalized, pattern.replace(/\\/g, "/"))) return true;
  }
  return false;
}
function matchGitish(filePath, pattern) {
  let p = pattern;
  if (p.endsWith("/")) p = p.slice(0, -1);
  if (!p.includes("*") && !p.includes("?")) {
    if (filePath === p || filePath.startsWith(p + "/")) return true;
    if (filePath.split("/").includes(p)) return true;
    return false;
  }
  const regex = globToRegExp(p);
  return regex.test(filePath);
}
function globToRegExp(glob) {
  let g = glob;
  if (g.startsWith("**/")) g = g.slice(3);
  const escaped = g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "{{GLOBSTAR}}").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]").replace(/{{GLOBSTAR}}/g, ".*");
  return new RegExp(`(^|/)${escaped}($|/)`);
}

// src/cli/urls.ts
async function fetchPageText(url) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "AntiDefaultInclusiveReview/1.0 (+https://darkai.ca/anti-default)",
      Accept: "text/html"
    },
    redirect: "follow"
  });
  if (!res.ok) throw new Error(`${url} \u2192 HTTP ${res.status}`);
  const html = await res.text();
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || url;
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<noscript[\s\S]*?<\/noscript>/gi, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
  return { title, text, url: res.url || url };
}
function analyzeUrlText(page, preferences) {
  const result = analyzeText(page.text, {
    sourceType: "url",
    sourceLabel: page.url,
    title: page.title,
    preferences
  });
  return result.findings.map((f) => ({
    ...f,
    source: page.url
  }));
}
async function loadUrlList(filePath) {
  const { promises: fs6 } = await import("node:fs");
  const raw = await fs6.readFile(filePath, "utf8");
  return raw.split(/\r?\n/).map((l) => l.trim()).filter((l) => l && !l.startsWith("#") && /^https?:\/\//i.test(l));
}

// src/cli/walk.ts
var import_node_fs2 = require("node:fs");
var import_node_path2 = __toESM(require("node:path"));
var BUILTIN_IGNORE_DIRS = /* @__PURE__ */ new Set([
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "coverage",
  ".turbo",
  "out",
  "vendor",
  "__pycache__",
  "bin",
  "obj",
  "packages",
  "umbraco"
]);
var MAX_FILE_BYTES = 4e5;
var MAX_FILES = 2e3;
function shouldSkipBuiltin(filePath) {
  const base = import_node_path2.default.basename(filePath);
  if (base === "rules.ts" || base === "rules.js") return true;
  if (base === ".antidefaultbaseline.json" || base === "anti-default-report.json" || base === "anti-default.sarif") {
    return true;
  }
  const normalized = filePath.replace(/\\/g, "/");
  if (normalized.includes("/public/fixtures/")) return true;
  if (normalized.includes("/fixtures/corpus/")) return true;
  if (/\.min\.(js|css)$/i.test(base)) return true;
  if (/bootstrap|jquery|owl\.carousel|aos\.css/i.test(base)) return true;
  return false;
}
async function collectFiles(cwd, targets, ignore) {
  const acc = [];
  for (const target of targets) {
    const resolved = import_node_path2.default.resolve(cwd, target);
    await walk(resolved, cwd, ignore, acc);
    if (acc.length >= MAX_FILES) break;
  }
  return [...new Set(acc)].slice(0, MAX_FILES);
}
async function walk(target, cwd, ignore, acc) {
  let stat;
  try {
    stat = await import_node_fs2.promises.stat(target);
  } catch {
    return;
  }
  const rel = import_node_path2.default.relative(cwd, target) || import_node_path2.default.basename(target);
  if (stat.isFile()) {
    if (hasSupportedExtension(target) && !shouldSkipBuiltin(target) && !pathIgnored(rel, ignore.patterns)) {
      acc.push(target);
    }
    return;
  }
  if (!stat.isDirectory()) return;
  if (pathIgnored(rel, ignore.patterns) && rel !== "") return;
  const entries = await import_node_fs2.promises.readdir(target, { withFileTypes: true });
  for (const entry of entries) {
    if (BUILTIN_IGNORE_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith(".") && entry.name !== ".github") continue;
    const full = import_node_path2.default.join(target, entry.name);
    const childRel = import_node_path2.default.relative(cwd, full);
    if (pathIgnored(childRel, ignore.patterns)) continue;
    if (entry.isDirectory()) {
      await walk(full, cwd, ignore, acc);
    } else if (entry.isFile()) {
      const lower = entry.name.toLowerCase();
      if (CODE_EXTENSIONS.some((ext) => lower.endsWith(ext)) && !shouldSkipBuiltin(full)) {
        acc.push(full);
      }
    }
    if (acc.length >= MAX_FILES) return;
  }
}
async function readFiles(cwd, paths) {
  const files = [];
  for (const filePath of paths) {
    try {
      const stat = await import_node_fs2.promises.stat(filePath);
      if (stat.size > MAX_FILE_BYTES) continue;
      const content = await import_node_fs2.promises.readFile(filePath, "utf8");
      files.push({
        path: import_node_path2.default.relative(cwd, filePath) || filePath,
        content
      });
    } catch {
    }
  }
  return files;
}

// src/cli/baseline.ts
var import_node_crypto = require("node:crypto");
var import_node_fs3 = require("node:fs");
var import_node_path3 = __toESM(require("node:path"));
var DEFAULT_BASELINE_FILE = ".antidefaultbaseline.json";
function stableSource(source) {
  if (!source) return "";
  return source.replace(/:\d+(?: \([^)]*\))?$/, "").replace(/\\/g, "/");
}
function findingFingerprint(finding) {
  const input = [
    finding.ruleId,
    stableSource(finding.source),
    finding.match.toLowerCase().trim(),
    finding.context.toLowerCase().replace(/\s+/g, " ").trim()
  ].join("\0");
  return (0, import_node_crypto.createHash)("sha256").update(input).digest("hex").slice(0, 20);
}
async function loadBaseline(cwd, fileName = DEFAULT_BASELINE_FILE) {
  try {
    const raw = await import_node_fs3.promises.readFile(import_node_path3.default.resolve(cwd, fileName), "utf8");
    const parsed = JSON.parse(raw);
    if (parsed.version !== 1 || !Array.isArray(parsed.fingerprints)) {
      throw new Error("unsupported baseline format");
    }
    return new Set(parsed.fingerprints);
  } catch (error) {
    if (error.code === "ENOENT") return /* @__PURE__ */ new Set();
    throw new Error(
      `Could not read ${fileName}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function applyBaseline(findings, baseline) {
  const kept = findings.filter(
    (finding) => !baseline.has(findingFingerprint(finding))
  );
  return { findings: kept, suppressed: findings.length - kept.length };
}
async function writeBaseline(cwd, findings, fileName = DEFAULT_BASELINE_FILE) {
  const filePath = import_node_path3.default.resolve(cwd, fileName);
  const payload = {
    version: 1,
    fingerprints: [...new Set(findings.map(findingFingerprint))].sort()
  };
  await import_node_fs3.promises.writeFile(filePath, `${JSON.stringify(payload, null, 2)}
`, "utf8");
  return filePath;
}

// src/cli/changed.ts
var import_node_child_process = require("node:child_process");
var import_node_util = require("node:util");
var execFileAsync = (0, import_node_util.promisify)(import_node_child_process.execFile);
async function changedFiles(cwd, baseRef, pathspecs) {
  const args = [
    "diff",
    "--name-only",
    "--diff-filter=ACMR",
    `${baseRef}...HEAD`,
    "--",
    ...pathspecs.length ? pathspecs : ["."]
  ];
  try {
    const { stdout } = await execFileAsync("git", args, {
      cwd,
      maxBuffer: 2e6
    });
    return stdout.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
  } catch (error) {
    throw new Error(
      `Could not determine files changed from ${baseRef}: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

// src/cli/init.ts
var import_node_fs4 = require("node:fs");
var import_node_path4 = __toESM(require("node:path"));
var IGNORE = `# Generated by anti-default init
node_modules/
.next/
dist/
build/
out/
coverage/
*.min.js
*.min.css

# Disable a rule for this project:
# rule:rule-id
`;
var WORKFLOW = `name: Anti-Default

on:
  pull_request:

permissions:
  contents: read
  pull-requests: write

jobs:
  inclusive-language:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - uses: NomadBuilder/anti-default@v1
        with:
          changed-from: \${{ github.event.pull_request.base.sha }}
          format: json
          output-file: anti-default-report.json
          comment-on-pr: "true"
`;
var SKILL = `---
name: anti-default
description: Reviews public-facing copy, documentation, UI text, and code strings for inclusive-language defaults using the Anti-Default CLI. Use after writing or editing user-facing language, before publishing content, or when reviewing a pull request for thoughtful and inclusive wording.
---

# Anti-Default

## Workflow

1. Run \`npx anti-default . --format json --fail-on never\`.
2. Read each finding in its surrounding context.
3. Fix clear, unambiguous findings in user-facing language.
4. For identity, quoted, historical, legal, or self-descriptive language, explain the finding and ask before changing it.
5. Do not rewrite identifiers, APIs, proper names, quotations, or community self-description without confirmation.
6. Run the scan again and report what remains.

Respect \`.antidefaultignore\` and \`.antidefaultbaseline.json\`. Suggestions are starting points; context and the named community's own language take priority.
`;
async function writeIfMissing(filePath, contents) {
  try {
    await import_node_fs4.promises.access(filePath);
    return false;
  } catch {
    await import_node_fs4.promises.mkdir(import_node_path4.default.dirname(filePath), { recursive: true });
    await import_node_fs4.promises.writeFile(filePath, contents, "utf8");
    return true;
  }
}
async function initializeProject(cwd) {
  const created = [];
  const files = [
    [".antidefaultignore", IGNORE],
    [".github/workflows/anti-default.yml", WORKFLOW],
    [".cursor/skills/anti-default/SKILL.md", SKILL]
  ];
  for (const [relative, contents] of files) {
    if (await writeIfMissing(import_node_path4.default.join(cwd, relative), contents)) {
      created.push(relative);
    }
  }
  const packagePath = import_node_path4.default.join(cwd, "package.json");
  try {
    const raw = await import_node_fs4.promises.readFile(packagePath, "utf8");
    const pkg = JSON.parse(raw);
    pkg.scripts ??= {};
    if (!pkg.scripts["inclusive-check"]) {
      pkg.scripts["inclusive-check"] = "npx --yes anti-default .";
      await import_node_fs4.promises.writeFile(packagePath, `${JSON.stringify(pkg, null, 2)}
`, "utf8");
      created.push("package.json script: inclusive-check");
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw new Error(
        `Could not update package.json: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  return created;
}

// scripts/cli.ts
var import_meta = {};
function packageVersion() {
  if ("0.3.0") {
    return "0.3.0";
  }
  try {
    const here = import_node_path5.default.dirname((0, import_node_url.fileURLToPath)(import_meta.url));
    const pkg = JSON.parse(
      (0, import_node_fs5.readFileSync)(import_node_path5.default.join(here, "..", "package.json"), "utf8")
    );
    return pkg.version ?? "0.0.0";
  } catch {
    return "0.0.0";
  }
}
function prefsWithDisabled(disabled) {
  const prefs = defaultPreferences();
  for (const id of disabled) {
    prefs[id] = { ...prefs[id], enabled: false };
  }
  return prefs;
}
function shouldFail(findings, failOn) {
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
    urls = urls.concat(await loadUrlList(import_node_path5.default.resolve(cwd, args.urlsFile)));
  }
  const mode = urls.length > 0 ? "urls" : "files";
  let rawFindings = [];
  let filesScanned;
  let urlsScanned;
  let targets = mode === "urls" ? urls : args.paths.length ? args.paths : ["."];
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
          `warn: ${err instanceof Error ? err.message : String(err)}`
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
      args.baselinePath
    );
    console.log(
      `Wrote ${rawFindings.length} finding fingerprint(s) to ${import_node_path5.default.relative(
        cwd,
        baselinePath
      )}`
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
  const report = {
    tool: "anti-default",
    version,
    scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
    mode,
    targets,
    filesScanned,
    urlsScanned,
    suppressedByBaseline,
    findings,
    summary: buildSummary(findings)
  };
  let output;
  if (args.format === "json") output = formatJson(report);
  else if (args.format === "sarif") output = formatSarif(report);
  else output = formatText(report);
  if (args.outPath) {
    await import_node_fs5.promises.writeFile(import_node_path5.default.resolve(cwd, args.outPath), output, "utf8");
    if (args.format === "text") {
      console.log(output);
    } else {
      console.error(`Wrote ${args.format} \u2192 ${args.outPath}`);
      console.error(
        `Findings: ${report.summary.total} (${report.summary.hard} hard \xB7 ${report.summary.soft} soft)`
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
//# sourceMappingURL=cli.cjs.map
