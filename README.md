# Baltic Widgets

A portable portal with widgets for Baltic fuel prices (LV/LT/EE), electricity, natural gas, currencies, gold, Bitcoin, daily horoscopes, and name days. The static site runs on GitHub Pages without Home Assistant or a backend API.

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

## Daily updates and publication

```powershell
git pull --ff-only
npm ci
npm run update
npm run build
npm run publish:data
```

`update` collects data once, updates the local SQLite database, prepares today's and tomorrow's horoscopes, and exports JSON to `data/`. The command exits when finished. On an empty database, the first run downloads the available historical archives and can take considerably longer. Later runs reuse the database and incrementally collect new observations.

Before a production release, run `npm run update`, inspect `artifacts/update-report.json`, then run `npm test` and `npm run build`. Include the refreshed `data/` snapshots in the release commit. A successful fetch does not imply that an operator publishes prices: Neste LV currently supplies locations only; keep absent prices null rather than estimating them.

`publish:data` creates a commit **only for `data/`** and pushes it to `main`. It creates no commit if the data has not changed. If other files are already staged, the script stops. GitHub Pages deploys the new version automatically after the push.

Do not run the API server and the standalone collector against the same data directory at the same time. If a source partially fails, the last successful data is retained and the report receives `degraded` status. Read `artifacts/update-report.json` for details. After a crash, remove a lock file only after confirming that its owning process has stopped.

With one update per day, electricity, gas, and market prices are daily snapshots rather than continuously refreshed quotes. Source publication times are stored separately from collection times. Collection can run more often when needed; do not collect fuel more frequently than once every six hours.

No schedule is installed automatically. To schedule it later on Windows, create a task in **Task Scheduler** with program `powershell.exe`, arguments `-NoProfile -File "FULL_PATH\scripts\daily-update.ps1"`, and the project root as its working directory. The script runs update/build/publish sequentially and stops if a command fails. Run it as the Windows user who completed `gh auth login`.

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

Currencies use ECB history from 1999; gold uses NBP from 2013 and a separate monthly World Bank series; Bitcoin uses Coin Metrics from 2010. Actual coverage depends on the source and the retained database.

Horoscopes use a **Do / Avoid** format: three suggestions in each group, with one per group shown in the compact widget and full lists available through Read more. Horoscopes use editorial templates informed by Astronomy Engine calculations, with two moods (normal and funny) and three variants per sign and day. Dates follow Europe/Riga. Six areas cover work/business, money, relationships, personal plans, home/family, and balance/rest, using practical, topic-specific advice. Adjacent days change the topic and every sentence; a fixed description of the sign is not repeated. These are everyday prompts, not promises of specific events.

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

Neste uses its public station-search feed, restricted to Latvian locations with `hasFuels=true`. Standalone charging sites and foreign stations are excluded. No Neste fuel price is inferred. Rietumu Nafta includes the operator-published Kuldīga location and regular diesel quote; reduced-excise agricultural diesel is excluded. KOOL and Rietumu Nafta do not provide a quote publication timestamp: `observed_at`/`observed_date` remain null and freshness remains unknown; collection time is kept separately.

When Latvia has more than five networks, the main widget shows the five largest known networks with published prices. Other networks, including address-only Neste, remain under Other networks. Network minima, unknown publication dates, and individual station coverage are explicit in the JSON and UI tooltips. Latvijas Nafta remains excluded.

## Name days

The compact name-day card stays in the desktop sidebar and appears as the first, initially selected tab before the other three widgets in the compact layout. Only the Latvian calendar is currently enabled; changing interface language or the finance market never changes that calendar. Its standalone version is `namedays.html?lang=ru&country=lv`. Yesterday/today/tomorrow, visible name buttons, historical facts, clearly labeled original vignettes, country-specific namesakes, and heartfelt/funny greetings are available in all five supported languages. Source URLs remain in JSON metadata and are not displayed in the dialog.

Run `npm run generate:namedays` to rebuild the calendar and profiles, and `npm run test:namedays` to validate them. Published files are `data/namedays/calendar-lv.json`, `profiles-lv.json`, and `coverage.json`. LT/EE are deferred and must each get a separate country-specific calendar and profile pair. See [NAMEDAYS.md](NAMEDAYS.md) for embedding, editorial rules, provenance, coverage limitations and research commands.

## Fuel freshness policy

Every fuel source uses the same 48-hour publication-age limit. Older, missing, invalid-date and undated prices are shown as `?`, with a localized explanation on hover. The check uses the price publication timestamp, never collection time; date-only observations are conservatively measured from 00:00 UTC. The browser rechecks on page load, every minute and after returning to a background tab, so an old static snapshot cannot remain fresh indefinitely. Recent station quotes determine a network minimum. If none are fresh, the latest available station quote is retained only as historical data with `last_available_station` scope, not as a current minimum. Historical prices and station directories remain available. There are no brand-specific age exceptions, and networks are not automatically disabled.

### Alternative-source audit (7 November 2026, Europe/Riga)

[EnergijasCenas Riga](https://energijascenas.lv/lv/degvielas-cenas/riga) exposes price provenance in its public page API. The inspected Straujupīte rows point to the official operator page and an original observation on 2 November, despite a newer `scraped_at`. Neste LV rows cite Waze community data observed on 8 October. These rows do not satisfy the 48-hour policy. [XYdata Straujupīte](https://xydata.lv/degviela/straujupite) showed a 6 November update and different prices, but no precise source station or verifiable original observation timestamp was found. Its page explicitly carries the last available price forward to days without new data. These remain research candidates, not active fallback collectors. A future fallback must preserve original observation time, source type, geographic scope and provenance; page refresh or carry-forward dates must not reset freshness.
