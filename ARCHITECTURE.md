# Codebase map and change guide

This is the navigation guide for maintaining Baltic Widgets. Paths below are relative to this repository. Start with the change guide, then follow the relevant module and domain documentation. This describes the current implementation, including local name-day changes; it is not a statement that every working-tree change has been deployed.

## Contents

- [System boundaries and data flow](#system-boundaries-and-data-flow)
- [Directory map](#directory-map)
- [Frontend modules and styling](#frontend-modules-and-styling)
- [Collection, storage and updates](#collection-storage-and-updates)
- [External resources](#external-resources)
- [Name-day pipeline](#name-day-pipeline)
- [Build, hosting and publication](#build-hosting-and-publication)
- [Common changes](#common-changes)
- [Commands, configuration and diagnostics](#commands-configuration-and-diagnostics)
- [Documentation and maintenance rules](#documentation-and-maintenance-rules)

## System boundaries and data flow

The frontend is plain HTML, CSS and browser ES modules. There is no frontend framework, bundler or browser-side database. Node.js 24+ runs collectors, SQLite storage, generation, tests and build tools. The public website is static; it does not collect upstream prices itself.

```text
External publishers
  -> parsers/*.mjs                  fetch, parse, validate, retain provenance
  -> private DATA_DIR              SQLite, collector state, raw source archives
  -> scripts/export-static.mjs     artifacts/static-site/data/
  -> scripts/update-data.mjs       tracked data/ snapshots
  -> scripts/build.mjs             public/ + data/ -> dist/
  -> GitHub Pages                  browser modules render published JSON

Name-day calendars + reviewed references
  -> scripts/generate-namedays.mjs
  -> public/data/namedays/ + data/namedays/
  -> the same static build
```

There are two runtime modes:

| Mode | Entry point | Behaviour |
| --- | --- | --- |
| Static website / local static preview | `dist/index.html`; `scripts/preview-static.mjs` | Reads published JSON. No SQLite or collectors required. Preview binds to loopback. |
| Optional Node API server | `services/server.mjs` | Serves `public/`, dynamic widget responses, health information and scheduled local collection using SQLite. |

Do not confuse a static preview with the API server: `npm run preview` serves **dist**, whereas `npm start` starts the API server and its collection lifecycle.

## Directory map

| Path | Responsibility | Edit directly? |
| --- | --- | --- |
| `public/index.html` | Portal markup, widget slots, shared dialog markup and script/style entry points | Yes |
| `public/*.js`, `public/*.css` | Browser behaviour, calculation helpers, translations and local styling | Yes |
| `public/namedays.html` | Standalone name-day embedding example | Yes |
| `public/assets/` | Local images, fonts, zodiac icons and asset attribution | Only deliberately; retain attribution |
| `public/reference/` | Saved portal styles and reference assets | Prefer local overrides rather than changing vendor snapshots |
| `public/data/` | Source-tree data used by the optional server, including generated name-day files | Generate relevant datasets; distinguish these from build inputs in `data/` |
| `data/` | Public, tracked JSON snapshots; includes localized directories and `namedays/` | Regenerate through collectors/generators |
| `parsers/` | Upstream clients/parsers, domain generators, editorial data and parser tests | Yes |
| `services/` | Database, localization, update orchestration, publication checks and shared integration tests | Yes |
| `scripts/` | CLI commands, PowerShell entry points, research, export, build and publication | Yes |
| `.github/workflows/` | Pages deployment and monthly name-count refresh | Yes |
| `var/` or configured `DATA_DIR` | Private SQLite, raw responses, caches, locks and collector state | Runtime-owned; never commit |
| `artifacts/` | Local reports, screenshots and intermediate static export | Generated; never use as the authoritative source |
| `dist/` | Final static build; deleted and rebuilt by the build script | Never hand-edit |
| `node_modules/` | Installed dependencies | Never hand-edit |
| `Dockerfile`, `compose.yaml` | Optional container runtime | Yes; keep deployment credentials outside the repository |
| `package.json`, `package-lock.json` | Commands, Node engine requirement and pinned dependency tree | Change together when updating dependencies |

The main runtime dependencies are `cheerio` for HTML parsing, `read-excel-file` for spreadsheet source archives and `astronomy-engine` for horoscope calculations. HTTP, SQLite, testing and filesystem operations use Node built-ins, including `fetch`, `node:sqlite` and `node:test`.

## Frontend modules and styling

### Browser responsibilities

| File(s) | Owns |
| --- | --- |
| `public/app.js` | Main Energy, Horoscope and Markets loaders/renderers; country controls; integration with comparison, chart and currency dialogs |
| `public/portal.js` | Behaviour around the saved portal: responsive placement, compact widget tabs, news navigation and local portal interactions. Does not run the original third-party portal JavaScript. |
| `public/modal.js` | Shared native-dialog opening, scroll-position preservation and gesture containment. Start here for page jumps or backdrop scrolling. |
| `public/station-comparison.js` | Fuel comparison dialog and search/filter UI |
| `public/station-comparison-core.js` | Pure station filtering, ranking, fuel-column sorting and network-option ordering |
| `public/fuel-freshness.js` | Fuel observation/publication freshness shared with server-side code |
| `public/electricity-time.js` | Selects the current delivery interval from cached electricity schedules |
| `public/charts.js` | Price-history dialog, SVG rendering, interaction and readout |
| `public/chart-math.js`, `public/chart-periods.js` | Pure chart calculations, units, trends and historical-series selection |
| `public/currency-core.js`, `public/currency-picker.js` | Supported configurable currencies, local preference storage and picker UI |
| `public/i18n-core.js` | Language resolution and locale definitions |
| `public/i18n.js` | Browser UI translations and translation lookup |
| `public/theme.js` | Theme selection and persisted browser preference |
| `public/zodiac.js`, `public/zodiac-icons.js` | Zodiac selection/date helpers and SVG geometry |
| `public/namedays.js` | Independent name-day widget, country/day/name selection, dialog tabs, cached copy and panel rendering |
| `public/namedays-core.js` | Calendar validation, country-specific name ordering, date helpers and compact-card fitting |
| `public/namedays-content.js` | Five-language name-day writer, UI strings, related-name context, greetings and writer version |
| `public/namedays-attestation.js` | Historical date precision and translated attestation labels |
| `public/namedays-history*.js`, `public/namedays-roots.js` | Reviewed, sourced histories and explicitly mapped roots/name families |
| `public/namedays-population.js` | Validation and display of sourced name-bearer counts |

`public/namedays-imagery.js` is legacy material, not the active historical writer. Do not reconnect spelling-based imagery as factual name history.

### CSS ownership and cascade

`index.html` loads local base styles, chart styles, the saved portal styles, local portal overrides and finally name-day styles. Inspect the actual link order when debugging specificity.

| File | Typical changes |
| --- | --- |
| `public/styles.css` | Base widget styling and shared presentation |
| `public/desktop-theme.css` | Chart/price controls and supporting dialog styles |
| `public/reference/portal-*.css`, `public/reference/news.css` | Saved original portal styling |
| `public/portal-local.css` | Portal integration overrides, responsive widget/news layouts, theme consistency and widget controls |
| `public/namedays.css` | Name-day card, name list, fixed dialog shell and independent text scrolling |

Use existing theme variables instead of hard-coded light surfaces. Some portal components use `--portal-*` tokens while standalone components also support local fallback tokens. A visual fix must be checked in both themes and in its actual host page, not only the standalone example.

For responsive placement, read [BREAKPOINTS.md](BREAKPOINTS.md). CSS and `portal.js` both participate: changing only one can leave duplicated, misplaced or incorrectly sized widgets. Long horoscope text and large name lists are useful layout stress cases.

## Collection, storage and updates

### Shared services

| File | Responsibility |
| --- | --- |
| `services/database.mjs` | Opens SQLite in WAL mode; stores station observations and national history; creates public fuel widget payloads |
| `services/collector-state.mjs` | Restores/coordinates fuel collector state from retained observations |
| `services/update-plan.mjs` | Task definitions, profiles, cadence, due decisions and failure cooldowns |
| `services/update-runner.mjs` | Executes the due plan, calls domain collectors and records attempts/success/errors |
| `services/localization.mjs` | Localizes exported/server-side JSON labels; separate from browser UI translation |
| `services/fuel-coverage.mjs` | Reports current-price coverage and reasons for gaps |
| `services/publication.mjs` | Evaluates deployment/public-data verification results |
| `services/server.mjs` | Optional HTTP API, static assets, health route and scheduled collection |

Domain modules initialize their own additional tables/cache metadata where needed; `database.mjs` alone is not the entire database schema. Look for `initialize*` and `CREATE TABLE` in the relevant parser before changing persistence.

### Parser ownership

| File(s) | Responsibility |
| --- | --- |
| `parsers/fuel.mjs` | Fuel collection orchestration, source parsing, station/price assembly and cached results |
| `parsers/fuel-http.mjs` | Shared upstream request policy, pacing, bounded retry and safe HTTP diagnostics |
| `parsers/circle-directory.mjs`, `parsers/lv-directories.mjs` | Official station directories and unambiguous address matching |
| `parsers/lv-extra.mjs` | KOOL, Neste and Rietumu-specific parsing/enrichment |
| `parsers/energijascenas.mjs` | Eligible recent community fallback observations with original source provenance |
| `parsers/oil-history.mjs` | European Commission national fuel averages and raw spreadsheet archives |
| `parsers/electricity.mjs` | Current/future Elering schedules and explicit historical initialization |
| `parsers/gas.mjs` | Regional EEX natural-gas series and export |
| `parsers/markets.mjs` | ECB currencies, NBP gold, Coin Metrics Bitcoin, World Bank archives and EUR conversions |
| `parsers/euribor.mjs` | Official delayed Euribor 6M act/360 daily series |
| `parsers/horoscope.mjs` | Astronomy context, date-keyed cache and validated output |
| `parsers/horoscope-copy.mjs`, `horoscope-advice.mjs`, `horoscope-life.mjs`, `horoscope-tones.mjs` | Horoscope editorial vocabulary, topic/advice composition and moods |
| `parsers/horoscope-policy.mjs` | Editorial validation before horoscope content is cached |
| `parsers/namedays.mjs`, `nameday-reference.mjs`, `nameday-glosses.mjs` | Name-day profile assembly, evidence extraction and multilingual etymological glosses |
| `parsers/namedays-population.mjs` | Official name-count parsing and normalization |

A source failure must retain the last valid observations and their original timestamps. Directory success cannot refresh a price timestamp. Network quotes, station observations, national averages and monthly benchmark series have different meanings; keep their scopes distinct in storage, export, sorting and charts. See [UPDATES.md](UPDATES.md) for the complete cadence and freshness policy.

## External resources

These are the implemented resource families, not a promise that every source currently publishes fresh values. Endpoint details and parsing assumptions live in the linked modules; provenance also travels in the JSON.

| Data/resource | Publishers and use | Code to inspect |
| --- | --- | --- |
| Latvian fuel | Circle K, Virši, Viada, Straujupīte, KOOL and Rietumu Nafta public pages; Neste station directory | `parsers/fuel.mjs`, directory modules and `lv-extra.mjs` |
| Lithuanian fuel | [Lithuanian Energy Agency price service](https://degalukainos.ena.lt/) | `parsers/fuel.mjs` |
| Estonian fuel | [FuelEst](https://fuelest.ee/) / Liitrihind community price services | `parsers/fuel.mjs` |
| Latvian community fallback | [EnergijasCenas](https://energijascenas.lv/), eligible recent Waze reports only | `parsers/energijascenas.mjs` |
| National fuel history | [European Commission Weekly Oil Bulletin](https://energy.ec.europa.eu/data-and-analysis/weekly-oil-bulletin_en) | `parsers/oil-history.mjs` |
| Electricity | [Elering dashboard](https://dashboard.elering.ee/), Nord Pool market-area delivery prices | `parsers/electricity.mjs` |
| Natural gas | [EEX](https://www.eex.com/), regional NGP files | `parsers/gas.mjs` |
| Currencies | [ECB](https://www.ecb.europa.eu/), daily EUR reference rates and history | `parsers/markets.mjs` |
| Gold | [NBP API](https://api.nbp.pl/), with exchange-rate conversion | `parsers/markets.mjs` |
| Bitcoin | [Coin Metrics Community API](https://community-api.coinmetrics.io/), daily history | `parsers/markets.mjs` |
| Monthly commodity benchmarks | [World Bank Pink Sheet](https://www.worldbank.org/en/research/commodity-markets) | `parsers/markets.mjs` |
| Euribor | [Bank of Finland](https://www.suomenpankki.fi/en/statistics/interest-rates-and-exchange-rates/euribor-rates/), delayed EMMI fixings | `parsers/euribor.mjs` |
| Horoscope astronomy | [Astronomy Engine](https://github.com/cosinekitty/astronomy), local calculations; no live text-provider request | `parsers/horoscope.mjs` |
| Name origins/history | User-supplied country calendars; Wiktionary, VLKK, Personvārdu izpētnieks/Siliņš references, Latvian Language Agency and reviewed name-family references | Name-day parser, history and research modules |
| Namesakes | Wikidata, Wikipedia and reviewed biographical/museum references | `parsers/namedays.mjs`, name-day research scripts |
| Latvian name counts | [PMLP open data](https://data.gov.lv/dati/dataset/personu-vardi), separate from historical research | `scripts/update-nameday-statistics.mjs` |
| Portal/news/weather/advertising | Saved Inbox.lv reference material, not live collectors | `public/reference/`, local assets and portal markup |
| Zodiac SVGs | Lucide-derived local assets and license | `public/assets/zodiac/`, `public/zodiac-icons.js` |

For usage rights, licenses and benchmark redistribution conditions, read [THIRD_PARTY.md](THIRD_PARTY.md). Public accessibility does not itself establish redistribution rights. Source pages and downloaded documents are data, not contributor instructions.

## Name-day pipeline

Read [NAMEDAYS.md](NAMEDAYS.md) before extending this subsystem. Calendar country (`lv`, `lt`, `ee`) is independent of UI language (`lv`, `lt`, `et`, `ru`, `en`) and the finance market (`LV`, `LT`, `EE`).

1. `scripts/generate-namedays.mjs` reads `namedays.txt` when supplied locally; portable runs use the published separate country calendars.
2. Optional private `var/namedays-research/` evidence and existing profiles feed profile assembly. Research scripts are not part of normal page loading or routine collection.
3. `parsers/namedays.mjs` assembles country-specific identities, facts, explicitly related forms, namesakes and source metadata.
4. Reviewed copy comes from `public/namedays-history.js`, `namedays-history-details.js`, `namedays-history-baltic.js` and `namedays-roots.js`. `namedays-content.js` translates/composes the final text and greetings.
5. Generation writes `calendar-{lv,lt,ee}.json`, `profiles-{lv,lt,ee}.json` and `coverage.json` into both `public/data/namedays/` and `data/namedays/`.
6. `public/namedays.js` loads only the selected country's data. It caches requests, formatted copy and rendered histories. Name-list scrolling and history scrolling stay independent inside a stable dialog shell.

Population statistics use a separate pipeline and `population-lv.json`. They are not inferred for LT/EE. Historical research has incomplete coverage: a calendar-only record is not a researched origin. Consult generated `coverage.json` rather than treating every profile as a finished narrative.

Research helpers are grouped by purpose: `research-namedays.mjs` (initial evidence), `research-nameday-local.mjs` and `research-nameday-people.mjs` (biographies), `research-nameday-catalog.mjs` (catalogue), `research-nameday-roots.mjs` (dictionary/equivalence lookups), and `extract-nameday-book.mjs` / `ocr-name-reference.ps1` (local reference extraction). Raw source paragraphs and OCR output stay private. Increment `WRITER_VERSION` and regenerate JSON after copy changes.

## Build, hosting and publication

| Step | Entry point | Important distinction |
| --- | --- | --- |
| Collect/export data | `scripts/update-data.mjs` | Runs due work and updates `data/`; does not deploy by itself |
| Intermediate export | `scripts/export-static.mjs` | Reads the local database and creates `artifacts/static-site/`; not the normal Pages build command |
| Static build | `scripts/build.mjs` | Recreates `dist/`, copies `public/`, then overlays `data/`; rewrites root-relative CSS asset URLs for subpath hosting |
| Static preview | `scripts/preview-static.mjs` | Serves the existing `dist/`; rebuild after source/data changes |
| Windows update wrapper | `scripts/update-widgets.ps1` | Collects, tests, builds and normally publishes data; use `-NoPublish` for local work |
| Data publication | `scripts/publish-data.mjs` | Commits only `data/` on `main`, pushes and invokes verification; does not release uncommitted code |
| Deployment verification | `scripts/verify-publication.mjs`, `services/publication.mjs` | Waits for the exact revision's Pages deployment and verifies live price JSON against local hashes |
| Pages workflow | `.github/workflows/pages.yml` | Installs dependencies, tests, builds and deploys `dist/`; no private database required |
| Name-count workflow | `.github/workflows/nameday-statistics.yml` | Refreshes monthly name counts, commits changed snapshots and explicitly calls the Pages workflow |

Because `data/` overlays `public/data/` during build, changing only a duplicate file under `public/data/` can appear to have no effect in static preview. Use the domain generator to update both copies where required. Never fix a build by hand-editing `dist/`.

## Common changes

| Task | Start here | Follow-through |
| --- | --- | --- |
| Widget spacing, height or dark-theme mismatch | `public/portal-local.css`, relevant component CSS | Check original stylesheet cascade, long content and compact/desktop placement |
| Move widgets or change compact tabs | `public/portal.js`, `public/index.html`, `public/portal-local.css` | Check [BREAKPOINTS.md](BREAKPOINTS.md) and all affected layouts |
| Modal jumps or slow scrolling | `public/modal.js`, dialog-specific CSS/renderer | Check focus restoration, wheel handling, backdrop effects and repeated layout work; preserve native scrolling |
| Fuel search or sort | `public/station-comparison-core.js`, `station-comparison.js` | Run comparison/freshness tests; rank actual fresh station prices |
| Missing/wrong station price | Source parser -> collector state -> `services/database.mjs` -> public JSON | Inspect publication time and matching evidence before changing UI |
| New upstream provider | Relevant parser plus `services/update-runner.mjs` and `update-plan.mjs` | Add fixture tests, validation, provenance, cadence, export and source documentation |
| New/update currency choice | `public/currency-core.js`, `currency-picker.js`, `parsers/markets.mjs` | Check saved preference, ECB coverage, history, translations and existing daily update task |
| Wrong chart range/unit/trend | `chart-math.js`, `chart-periods.js`, `charts.js`, domain export | Verify the selected series and observation dates before altering display |
| UI wording or new language | `public/i18n.js`, `i18n-core.js`, `services/localization.mjs` | Also check domain-specific name-day and horoscope copy; translations have multiple owners |
| Horoscope text | `HOROSCOPE_EDITORIAL_RULES.md`, horoscope writer/policy modules | Bump writer version, validate and regenerate; never edit generated JSON as the primary copy source |
| Name history or related form | Reviewed history/root modules, `namedays-content.js`, evidence parser | Preserve uncertainty and exact attested spelling, add sources, bump writer version and regenerate all countries |
| Name-day clipping/performance | `public/namedays.css`, `namedays.js`, `namedays-core.js` | Check many names, long text, repeated selection and small viewports |
| Update timing/retries | `services/update-plan.mjs`, `update-runner.mjs`, `parsers/fuel-http.mjs` | Inspect plan/state; do not reset source publication times |
| Production not reflecting a change | Git revision -> workflow -> live JSON -> browser reload | A successful build/push alone does not verify a live release |

## Commands, configuration and diagnostics

Run from this repository directory. On Windows, use `npm.cmd` when the PowerShell script shim is blocked.

```powershell
npm ci
npm run build
npm run preview

npm test
npm run test:namedays

# Inspect due work without contacting upstream sources or publishing.
npm run update:plan

# Run normal collection locally, test and build without publication.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/update-widgets.ps1 -NoPublish

# After changing name-day copy or evidence rules.
npm run generate:namedays
npm run test:namedays
npm run build
```

`npm run update:full` intentionally permits historical initialization; it is not the default command for a UI fix. `npm run update:offline` exports the local database without upstream collection, but should not be used with an empty database to replace a useful published history. See [UPDATES.md](UPDATES.md) for all profiles and exact cadence.

| Setting | Used by |
| --- | --- |
| `DATA_DIR` | Private database/archive/state directory for the server and collection tools; defaults to `var/` |
| `HOST`, `PORT`, `PUBLIC_DIR` | Optional API server binding and public source directory |
| `COLLECT_INTERVAL_HOURS` | API server fuel interval, constrained by its accepted range and shared scheduling policy |
| `STATIC_PORT`, `STATIC_PREFIX` | Static preview port and optional path-prefix test |
| `PUBLIC_SITE_URL` | Optional explicit public site URL for publication verification |

`.env.example` documents examples; the application does not automatically load `.env` files. Set process environment variables or container settings explicitly. Browser language, market, theme and currency preferences are frontend concerns; name-day country selection must remain separate from translation.

For diagnostics, inspect `artifacts/update-report.json`, `artifacts/publication-report.json`, the private `var/collector/fuel-stations.json` source statuses and `data/namedays/coverage.json`. `npm run diagnose:fuel` performs bounded HTTP/parser checks without updating widget data. Its local output is `artifacts/fuel-http-diagnostics.json`.

Tests live beside parsers, in `services/*.test.mjs` for integration/shared behaviour, and in `public/zodiac-icons.test.mjs` for icon geometry. `npm test` selects these through `package.json`; it does not call live upstream services. Documentation-only changes need link/path checks, not price collection or a deployment.

## Documentation and maintenance rules

| Document | Purpose |
| --- | --- |
| [README.md](README.md) | Quick start, public hosting and feature overview |
| [ARCHITECTURE.md](ARCHITECTURE.md) | This code navigation and change guide |
| [UPDATES.md](UPDATES.md) | Collection cadence, commands, logs, failure handling and verified publication |
| [NAMEDAYS.md](NAMEDAYS.md) | Name-day data contracts, editorial coverage, research and embedding |
| [BREAKPOINTS.md](BREAKPOINTS.md) | Responsive portal/widget layout reference |
| [HOROSCOPE_EDITORIAL_RULES.md](HOROSCOPE_EDITORIAL_RULES.md) | Required horoscope writing and validation rules |
| [THIRD_PARTY.md](THIRD_PARTY.md) | Resource provenance, rights and licenses |
| [parsers/README.md](parsers/README.md) | Short collector index |
| [AGENTS.md](AGENTS.md) | Contributor constraints |

Maintain this guide when introducing a module, changing an entry point, moving ownership between layers or adding a resource family. Keep detailed source cadence in UPDATES.md and name-day coverage in generated JSON/NAMEDAYS.md instead of duplicating volatile counts here. All documentation is English; product translations remain multilingual. Never commit credentials, private deployment settings, databases, raw research or archives.
