# Baltic Widgets

A portable portal with widgets for Baltic fuel prices (LV/LT/EE), electricity, natural gas, currencies, gold, Bitcoin, daily horoscopes, and name days. The static site runs on GitHub Pages without Home Assistant or a backend API.

## Code navigation

Start with **[ARCHITECTURE.md](ARCHITECTURE.md)** for the module map, data flow, external resources, CSS ownership, configuration and task-to-file change guide. Use [UPDATES.md](UPDATES.md) for operational commands and [NAMEDAYS.md](NAMEDAYS.md) for name-day research and content contracts.

## Project layout and storage

| Directory | Contents | Published |
|---|---|---|
| `public/` | HTML, CSS, JavaScript, images, fonts, and translations | Yes |
| `data/` | Generated JSON, including chart history | Yes |
| `parsers/`, `services/`, `scripts/` | Portable collectors and tools | Source code only |
| `var/widgets.sqlite` | Local SQLite database with the full observation history | No |
| `var/archives/` | Raw source archives and responses | No |
| `var/collector/` | Fuel collector working files | No |
| `dist/`, `artifacts/` | Local builds and reports | No |

The repository contains no private Home Assistant connection settings, SSH keys, or local network addresses. The website reads published files only. GitHub Actions builds it from `public/` and `data/`; it needs neither SQLite nor access to the local computer.

## Local preview

Install Node.js **24+**, Git, and GitHub CLI. Run these commands from the project directory:

```powershell
npm ci
npm run build
npm run preview
```

Open `http://127.0.0.1:8080/`. Use `http://127.0.0.1:8080/?lang=ru` to preview Russian. Supported languages are `lv`, `ru`, `en`, `lt`, and `et`, with English as the fallback. Horoscope content is available in LV/RU/EN; LT/ET use English content with localized interface labels.

## Updates and publication

Use the shared Auto profile. It refreshes only due tasks: fuel every 6 hours, the next-day electricity schedule once daily after 15:00 Riga time, gas/markets/horoscopes daily, Euribor 6M daily after 16:00 Riga time, station catalogues and EC averages weekly, commodity archives and name counts monthly.

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "FULL_PATH\scripts\update-widgets.ps1"
```

The existing `daily-prices.ps1` and `daily-update.ps1` commands remain aliases. Add `-Plan` to inspect due work without source requests or publication, `-NoPublish` for a local run, or `-Profile Prices|Daily|Weekly|Monthly` to select a group. `-Force` intentionally overrides the selected group's cadence. Historical initialization is explicit: `-Profile Full`.

See **[UPDATES.md](UPDATES.md)** for the complete source/cadence table, commands, logs, failure handling, server behaviour and optional Task Scheduler configuration. No local scheduled task is installed automatically. The separate monthly GitHub workflow continues to maintain name counts.

`npm run update` uses the same Auto plan and exports JSON. `npm run publish:data` commits only `data/` and pushes to `main`; Pages then deploys automatically. Staged unrelated files stop publication. If an upstream source fails, previously valid data is retained with its original timestamps and errors are recorded in `artifacts/update-report.json`. Source freshness is independent of the time the updater ran. Do not run multiple collectors against the same private database directory.

## Local database and migration

The default database is `var/widgets.sqlite`. Set an environment variable to use another data directory. `.env.example` is a reference template; `.env` files are not loaded automatically.

```powershell
$env:DATA_DIR = 'D:\baltic-widgets-data'
npm run update
```

To migrate, stop the collector and copy the **entire data directory**. SQLite uses WAL mode: do not copy only the main database file while writes are in progress. Use the SQLite backup API for an online backup. Git stores neither the database nor the raw archives. A fresh clone already includes published snapshots in `data/`; the first local collection creates its database.

To export an existing database without contacting external sources, while generating current horoscopes:

```powershell
npm run update:offline
```

Do not run an offline export against an empty database if you want to retain the published financial history.

## GitHub Pages

In Settings → Pages, set Source to **GitHub Actions**. The workflow in `.github/workflows/pages.yml` runs tests, builds `dist/`, and deploys it after a push to `main`. The build requires no database or custom secrets. The project is published at `https://nimda5.github.io/baltic-widgets/`. Local resources support the repository path prefix.

## JSON for individual widgets

- `data/en/fuel-LV.json`, `fuel-LT.json`, `fuel-EE.json`: fuel networks.
- `data/en/electricity.json`: electricity prices and history.
- `data/en/gas.json`: natural gas prices and history.
- `data/en/exchange.json`: currencies, gold, and Bitcoin.
- `data/en/horoscope.json`: horoscopes and all text variants.
- `data/fuel-stations.geojson`: station coordinates, when available.

Replace `en` with the desired language. GitHub Pages does not process API query parameters: select the language through the file path and select the mood or random variant in client-side code. The Node server (`npm start`) additionally supports dynamic GET parameters and periodic collection; it is not needed for static hosting.

## Data sources and history

Fuel uses published LV operator prices, LEA in LT, and FuelEst in EE. Widget feeds publish 95-octane petrol and diesel only. The European Commission provides weekly national averages from 2005, kept separate from individual station prices. Electricity uses Elering/Nord Pool history: LT from 2012 and LV/EE from 2013. Natural gas uses regional EEX NGP prices and a separate monthly European benchmark from the World Bank. Long EUR charts use historical ECB exchange rates from 1999; different indices are not merged.

Euribor 6M replaces the inverse USD/EUR row, using official Bank of Finland / EMMI daily act/360 fixings with a 24-hour delay. The initial daily history starts in 2021; rate changes use percentage points. Commercial redistribution is subject to EMMI terms (see THIRD_PARTY.md).

Currencies use ECB history from 1999; gold uses NBP from 2013 and a separate monthly World Bank series; Bitcoin uses Coin Metrics from 2010. Actual coverage depends on the source and the retained database.

Horoscopes use a **Do / Avoid** format: three suggestions in each group, with all three items per group displayed directly at every screen size. Horoscopes use editorial templates informed by Astronomy Engine calculations, with two moods (normal and funny) and three variants per sign and day. Dates follow Europe/Riga. Six areas cover work/business, money, relationships, personal plans, home/family, and balance/rest, using practical, topic-specific advice. Adjacent days change the topic and every sentence; a fixed description of the sign is not repeated. These are everyday prompts, not promises of specific events.

The news, advertisements, and weather in the layout are saved demonstration material. Their collection and refresh have not been implemented. See [THIRD_PARTY.md](THIRD_PARTY.md).

## Validation

```powershell
npm test
```

Tests cover parsers, last-successful-result retention, fresh network selection, historical EUR conversions, chart periods, horoscopes, language fallback, and icon geometry.

## Documentation language

All project documentation is maintained in **English only**. Multilingual interface labels, generated horoscope content, and localized data remain supported. Contributor instructions are recorded in [AGENTS.md](AGENTS.md).

## Horoscope response format

`data.moods` contains `serious` (normal) and `humor` (funny). Each sign exposes structured variants in `advice.today[mood][variant]` and `advice.tomorrow[mood][variant]`. A variant contains `topic`, `do_topic`, `avoid_topic`, `do` (three strings), and `dont` (three strings). The groups use different subject areas. Avoid items name undesirable behaviours rather than negative commands, so they read naturally under the heading. `recommendations` contains the selected variant for each day. Plain-text `today`, `tomorrow`, and `readings` remain available for existing consumers.

The Node API accepts `mood=serious|humor|random` and `variant=0|1|2|random`; the former `playful` mode is no longer supported. The widget migrates an old saved playful preference to funny mode. On GitHub Pages, choose structured variants client-side from the JSON file.

## Horoscope editorial policy

Before authoring or changing horoscope copy, read [HOROSCOPE_EDITORIAL_RULES.md](HOROSCOPE_EDITORIAL_RULES.md). The rules cover grammar in every authored language, separate subjects for Do and Avoid, semantic non-mirroring, humour, and variation. The shared `validateAdvice` gate in `parsers/horoscope-policy.mjs` runs before caching and must also validate any future model/API output. Schema validation does not replace review of meaning.

## Station directory coverage

Latvian Circle K, Virši, Viada and Straujupīte locations come from separate parsers for each operator’s official public directory. Virši partner and foreign locations are excluded. Viada addresses come from its Latvia-specific list; its multinational map is used only for exact coordinate enrichment. Straujupīte includes franchise locations listed by the operator. Published price locations missing from a directory are retained, so known-location counts can exceed directory-only counts. Individual prices are attached only by unambiguous normalized address matches (including postcode and highway abbreviation variants) to the operator’s price page. Other locations retain addresses and coordinates without invented prices. The directory can include retail locations with no fuel availability listed; its count is a location count, not a claim about pump count.

`station_count_scope` distinguishes known directory locations from locations with published prices. `priced_station_count` counts locations with a displayed 95/diesel quote. The expanded directory includes coverage information and address search. A cached directory is retained if a later directory fetch fails. Existing private archives are preserved; 98-octane quotes are excluded from published widget/collector output.


## Additional Latvian networks

KOOL addresses are read from its official published directory; duplicate regional listings are merged. Coordinates are attached only when the linked official map gives an unambiguous station-name match. KOOL 95/diesel prices are published network minima, stored separately in `network_quotes` and SQLite price history. They are never copied onto individual station records or counted as priced stations. The static-page parser pairs fuel labels and prices by their visual columns and rejects an ambiguous layout.

Neste uses its public station-search feed, restricted to Latvian locations with `hasFuels=true`. Standalone charging sites and foreign stations are excluded. No Neste fuel price is inferred. Rietumu Nafta includes the operator-published Kuldīga location and regular diesel quote; reduced-excise agricultural diesel is excluded. KOOL and Rietumu Nafta do not provide a quote publication timestamp: `observed_at`/`observed_date` remain null; these undated quotes use the last successful collection time for the 48-hour freshness limit.

When Latvia has more than five networks, the main widget shows the five largest known networks with published prices. Other networks, including address-only Neste, remain under Other networks. Network minima, unknown publication dates, and individual station coverage are explicit in the JSON and UI tooltips. Latvijas Nafta remains excluded.

## Portal layout

The top section restores the original Inbox.lv news list and responsive featured-story treatment, with the advertisement in its own column. All 24 top stories remain available across three pages through pagination and touch swiping. Lower news cards share the portal theme palette. See [BREAKPOINTS.md](BREAKPOINTS.md) for dimensions and widget placement.

## Name days

The compact name-day card stays in the desktop sidebar and appears as the first, initially selected tab before the other three widgets in the compact layout. Separate Latvian, Lithuanian and Estonian calendars are available through the country selector; changing interface language or the finance market never changes that calendar. Its standalone version is `namedays.html?lang=ru&country=lv`. Yesterday/today/tomorrow, visible name buttons, source-backed historical facts, reviewed cultural narratives, country-specific namesakes, and heartfelt/funny greetings are available in all five supported languages. Source URLs remain in JSON metadata and are not displayed in the dialog.

Run `npm run generate:namedays` to rebuild the calendar and profiles, and `npm run test:namedays` to validate them. Published files are separate `data/namedays/calendar-{lv,lt,ee}.json` and `profiles-{lv,lt,ee}.json` pairs, plus `coverage.json`. Unresearched origins remain explicitly marked; a calendar record is not presented as a complete history. `npm run backlog:namedays` regenerates the prioritized research backlog in [NAMEDAYS_BACKLOG.md](NAMEDAYS_BACKLOG.md). See [NAMEDAYS.md](NAMEDAYS.md) for embedding, editorial rules, provenance, coverage limitations and research commands. Start research with [NAMEDAYS_SOURCES.md](NAMEDAYS_SOURCES.md), the growing LV/LT/EE source directory with exact page references, evidence limits and access notes.

## Fuel freshness policy

Every fuel source uses the same 48-hour age limit. An explicit publication/update date always takes precedence; date-only observations are conservatively measured from 00:00 UTC. If the source supplies no publication date, a successfully fetched published price is assumed current as of `fetched_at` and expires 48 hours after that successful fetch. Failed refreshes do not reset this timestamp. Missing prices, expired prices and explicitly invalid dates are shown as `?`, with a localized explanation on hover. Collection time never overrides an explicit date. The browser rechecks on page load, every minute and after returning to a background tab, so an old static snapshot cannot remain fresh indefinitely. Recent station quotes determine a network minimum. If none are fresh, the latest available station quote is retained only as historical data with `last_available_station` scope, not as a current minimum. Historical prices and station directories remain available. There are no brand-specific age exceptions, and networks are not automatically disabled.

### Alternative-source audit (7 November 2026, Europe/Riga)

[EnergijasCenas Riga](https://energijascenas.lv/lv/degvielas-cenas/riga) exposes price provenance in its public page API. The inspected Straujupīte rows point to the official operator page and an original observation on 2 November, despite a newer `scraped_at`. Neste LV rows cite Waze community data observed on 8 October. These rows do not satisfy the 48-hour policy. [XYdata Straujupīte](https://xydata.lv/degviela/straujupite) showed a 6 November update and different prices, but no precise source station or verifiable original observation timestamp was found. Its page explicitly carries the last available price forward to days without new data. EnergijasCenas is now enabled only for qualifying recent Waze reports as described below. Its expired official copies and XYdata are not used as fresh-price replacements. A future fallback must preserve original observation time, source type, geographic scope and provenance; page refresh or carry-forward dates must not reset freshness.

### EnergijasCenas community reserve

The LV collector reads the same anonymous public `fuel_prices` feed used by EnergijasCenas. Public browser-client access material is discovered at runtime, restricted to the expected API host and anonymous role, kept in memory and never logged or published. Only explicitly identified Waze community reports for LV 95/diesel are eligible. The original `source_observed_at`, not `scraped_at` or `imported_at`, must be within 48 hours; conflicting equal-time quotes are rejected. Unknown, foreign, future and expired reports cannot populate current prices.

A reserve quote fills an unavailable/expired provider price and never replaces an available fresh primary quote. Its scope is `network_community_report`, not a network minimum or a price for every station. Individual directory-station prices stay unchanged. History uses the original observation timestamp, and original/provider URLs remain in JSON metadata. No source link or source name is added to the widget interface. Successful empty results clear the reserve; a failed refresh retains the last successful quotes only until their original 48-hour limit. XYdata is not enabled.

## Responsive widget interface

The horoscope card shows all three Do and three Avoid items without a Read more control. The sign button opens an accessible two-column dialog with all twelve signs and short date ranges; Escape closes it and returns focus to the trigger. The markets header omits the redundant daily caption. Compact layouts retain name days as the default tab inside a shared framed group, with a date and a limited name preview plus access to all names. Wide layouts give horoscope text additional width and keep the three cards at a shared 320-pixel height, with long advice scrolling inside the horoscope card rather than growing the row. Compact layouts use an underlined active tab, 46-pixel tab targets and keyboard navigation. Markets use restrained 13-pixel values and a two-column quote grid on tablet widths.

## Configurable market currency

The markets card has one configurable EUR exchange-rate row between EUR/USD and Euribor. It defaults to SEK; the pencil opens a currency dialog with SEK, NOK, PLN, DKK, GBP and CHF. The selection is stored locally under `baltic-widgets.market-currency` and persists across reloads and interface-language changes on the same origin. Blocked or invalid storage falls back to SEK; a choice still works for the current page when persistence is unavailable. Selecting the displayed rate opens the selected currency's own history. Missing quotes remain unavailable while the currency selector stays usable. The existing daily ECB task collects these currencies from the same XML response; changing the selection makes no additional source request. The desktop card retains its 320-pixel height with five rows.

## Station price comparison

Use Compare stations in the energy card header beside the country selector, or select a network name to open the same dialog with that network selected. A single search field matches city, address, station and network tokens together; accents are optional (for example, Vilnius Viada). This is text matching, not geocoding or a claim about municipal boundaries. The 95 and diesel column headers select the sorting fuel; selecting the active header again reverses the price order. Both station prices are displayed side by side, with missing or expired quotes shown as a dash. A separate network filter can further refine the results.

Rankings include only recent positive prices with station scope and a non-failed source, for the selected fuel. Show 20 more progressively reveals the remaining results. Original observation dates and community attribution remain visible; selecting a price opens its history. Missing, expired or failed prices are kept in a collapsed section and never treated as zero. Explicit network-only quotes remain separate and are not applied to all station addresses. Filtering uses the downloaded public JSON and makes no new source requests.

A single compact Compare stations action opens the complete catalogue, including additional networks. All station and additional-network details open in the dialog instead of expanding the dashboard. The dashboard cards retain equal height without growing when the station list is opened.

Dialog shells keep stable viewport-relative dimensions during filtering, loading and tab/period changes. Station results, name-day details and chart overflow scroll inside their respective dialogs; focus restoration avoids scrolling the page. The markets card labels the rate as Euribor with a localized 6 months subtitle, while chart metadata retains the full 6M benchmark identity.

Name-day previews and dialog name lists use the calendar country’s alphabetical collation (Latvian, Lithuanian or Estonian for the selected calendar), independent of interface language; source arrays and calendar membership are unchanged. Network-only fuel quotes are labeled as prices without a station address, with the published minimum explained per entry rather than implying the same price at every location.

Station search prepares normalized search text once per immutable snapshot, reuses visible row elements and locale formatters, and coalesces typing with a 100 ms delay (including IME composition). Collapsed no-price rows are only built when expanded. The network dropdown uses the selected country’s alphabetical collation independently of the UI language, with All networks first. The redundant current-price count line is omitted.

All native dialogs use a shared opening helper that preserves the document scroll position through autofocus and closing, including nested station-price charts. Scroll areas are discovered once when a dialog opens; wheel and touch handlers do not recalculate ancestor styles for each gesture. Background scrolling is contained without changing the root scroll container’s overflow, and document-level gesture handlers are removed when the last dialog closes. The station comparison uses a dimmed backdrop without live background blur. Price buttons use one text underline on hover without an additional shadow underline. Long horoscope advice remains complete in a keyboard-focusable internal scroll region; mobile advice is capped separately.
