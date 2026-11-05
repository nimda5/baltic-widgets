# Baltic Widgets

A portable portal with widgets for Baltic fuel prices (LV/LT/EE), electricity, natural gas, currencies, gold, Bitcoin, and daily horoscopes. The static site runs on GitHub Pages without Home Assistant or a backend API.

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

Fuel uses published LV operator prices, LEA in LT, and FuelEst in EE. Missing 98-octane prices are not inferred. The European Commission provides weekly national averages from 2005, kept separate from individual station prices. Electricity uses Elering/Nord Pool history: LT from 2012 and LV/EE from 2013. Natural gas uses regional EEX NGP prices and a separate monthly European benchmark from the World Bank. Long EUR charts use historical ECB exchange rates from 1999; different indices are not merged.

Currencies use ECB history from 1999; gold uses NBP from 2013 and a separate monthly World Bank series; Bitcoin uses Coin Metrics from 2010. Actual coverage depends on the source and the retained database.

Horoscopes use editorial templates informed by Astronomy Engine calculations, with three moods and three variants per sign and day. Dates follow Europe/Riga. Six areas cover work/business, money, relationships, personal plans, home/family, and balance/rest, using 24 practical situations. Adjacent days change the topic and every sentence; a fixed description of the sign is not repeated. These are everyday prompts, not promises of specific events.

The news, advertisements, and weather in the layout are saved demonstration material. Their collection and refresh have not been implemented. See [THIRD_PARTY.md](THIRD_PARTY.md).

## Validation

```powershell
npm test
```

Tests cover parsers, last-successful-result retention, fresh network selection, historical EUR conversions, chart periods, horoscopes, language fallback, and icon geometry.

## Documentation language

All project documentation is maintained in **English only**. Multilingual interface labels, generated horoscope content, and localized data remain supported. Contributor instructions are recorded in [AGENTS.md](AGENTS.md).
