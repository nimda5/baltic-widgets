# Update operations

All manual commands, PowerShell entry points and the optional API server use one cadence policy in `services/update-plan.mjs`. A successful download is not proof of a newly published price: source publication dates and the 48-hour fuel freshness rule remain unchanged.

## Cadence and sources

| Task | Normal cadence | Data fetched | What is deliberately excluded |
| --- | --- | --- | --- |
| `fuel` | Every 6 hours | Operator price pages, LEA latest prices, FuelEst prices, eligible community fallback | Separate station lists/maps; Neste has no price collector |
| `electricity` | Once daily after 15:00 Europe/Riga | Elering LV/LT/EE day-ahead schedule | Repeated downloads of the same published delivery slots; historical backfill |
| `gas` | Once per Riga calendar day | EEX recent gas files | World Bank monthly history |
| `markets` | Once per Riga calendar day | Recent ECB exchange rates, NBP gold, Coin Metrics Bitcoin | Full historical downloads |
| `horoscope` | Once per Riga calendar day | Local validated cache for the current day and tomorrow | No external model request; no editorial changes |
| `directories` | Every 7 days | Circle K, Virši, Viada, Straujupīte, KOOL and Neste station addresses, coordinates and fuel types | Price pages; successful location refreshes never re-date a price |
| `fuel_archive` | Every 7 days | European Commission Weekly Oil Bulletin national averages | Individual station prices |
| `commodity_archive` | Once per Riga calendar month | World Bank monthly gas/gold history | Live quotes |
| `nameday_statistics` | Once per Riga calendar month | Latest PMLP name-count snapshot | Name-history research and calendar edits |

LEA and FuelEst include station addresses/coordinates in their price responses. Those fields are reused; no additional station-catalogue request is needed. KOOL requires its homepage to discover the price-page URL, but frequent refreshes do not fetch its station list or Google map. Rietumu publishes its single station together with its diesel quote. Cached station lists can be re-exported locally without downloading them again.

These are collection cadences, not guarantees about publisher activity. For example, ECB/NBP generally have no new weekend observations, and PMLP currently publishes snapshots twice a year. Monthly checks simply discover a new official snapshot when one becomes available.

Electricity collection and display are separate. Nord Pool publishes the next day’s auction schedule once daily; the normal collector waits until 15:00 Riga time. If tomorrow’s complete schedule is delayed or the request fails, it retries after one hour when the updater is invoked again. First-run bootstrap and explicit forced runs can fetch today’s available data earlier. The browser selects the current interval from cached future slots and updates the display locally every minute; it does not re-download the source every half hour. See [Nord Pool’s current publication timing](https://www.nordpoolgroup.com/en/trading/transition-to-15-minute-market-time-unit-mtu/faq/faq-premium-container/will-the-publication-time-of-results-change-after-the-sdac-15-minute-mtu-go-live/).

## Recommended command

Run the same command from any directory. `Auto` checks every task and runs only work that is due:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "FULL_PATH\scripts\update-widgets.ps1"
```

The process-scoped execution-policy argument allows this local script to run without changing the machine's policy. The script collects due tasks, displays source errors, runs tests, builds the site, and publishes `data/` to `main`. GitHub Pages then deploys automatically. The existing `daily-prices.ps1` and `daily-update.ps1` commands remain compatibility aliases for this same `Auto` operation.

To inspect the plan without making source requests, exporting data, committing or publishing:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "FULL_PATH\scripts\update-widgets.ps1" -Plan
```

Use `-NoPublish` to collect and build locally. Use `-Profile Prices`, `Daily`, `Weekly` or `Monthly` to select only that group. Selected groups still respect their cadence. For example, `-Profile Weekly` does not force another station download if last week's update is still recent.

```powershell
# Prices only: fuel and electricity, when due.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "FULL_PATH\scripts\update-widgets.ps1" -Profile Prices

# Explicit one-time refresh of weekly work, ignoring its cadence.
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "FULL_PATH\scripts\update-widgets.ps1" -Profile Weekly -Force
```

`-Force` overrides the selected tasks' cadence and failed-request cooldown. It should be used intentionally, not in a recurring task. `-Profile Full` is the explicit initialization/recovery operation: it runs all tasks and permits electricity/market historical backfill when the database lacks it. Routine profiles never start a historical backfill implicitly. Full history initialization can take much longer.

## Equivalent npm commands

Run these from the repository root. They collect/export only; they do not commit, build or deploy by themselves.

| Command | Selected work |
| --- | --- |
| `npm run update` | Auto: all due tasks |
| `npm run update:plan` | Auto plan only; no source requests or publication |
| `npm run update:prices` | Fuel and electricity, when due |
| `npm run update:current` | Fuel, electricity, gas and markets, when due; compatibility command |
| `npm run update:daily` | Daily gas, markets and horoscope cache |
| `npm run update:weekly` | Station catalogues and EC weekly fuel averages |
| `npm run update:monthly` | Monthly commodity archive and name statistics |
| `npm run update:full` | Explicit full initialization/recovery |
| `npm run update:offline` | Export the local database without source requests |

Append `-- --force` to an npm update command for an intentional forced run. The local ignored `var/update-current-prices.mjs` was an earlier operational helper; use the tracked commands above instead.

## State, reports and failures

Task attempts and successful completions live in SQLite metadata under `update_schedule_v1`. The first run adopts available successful timestamps from the existing collector/database/name-count snapshot so migration does not redownload every source. `DATA_DIR` selects a different private database and state directory. Never publish that directory.

`-Plan` prints a compact table of cadence, last success and next check in Europe/Riga time. For machine-readable plan output, run `npm run update:plan -- --json`.

Console output uses `[run]`, `[skip]` and `[error]`, with a task name. `artifacts/update-report.json` records the selected profile, each task's reason/status, last success, result and errors. The underlying station collector also stores source-specific price and catalogue statuses separately in `var/collector/fuel-stations.json`.

An upstream HTTP 403 means the source refused the request. The collector does not bypass access controls. A failed price request retains the previous valid quotes and their original publication/fetch times; it cannot make them fresh again. A failed station-catalogue request retains cached locations and does not invalidate a separately successful price request. Once the source recovers, its next due attempt can update it normally.

The HTTP client uses a stable, truthful `BalticWidgets` User-Agent, normal HTML/JSON Accept headers and a Latvian/English language preference. Within each client process, request starts to the same origin are spaced by at least one second. HTTP 403 is not automatically retried. HTTP 429/5xx gets at most one retry, respecting a short `Retry-After`; longer requested waits are deferred to the normal task cooldown. Error diagnostics include the URL without query parameters, status, response server, request ID and Retry-After when provided. They never contain cookies, authorization headers or raw response bodies. Price and directory HTTP diagnostics are stored separately in source metadata.

To investigate an intermittent refusal from the same computer/network without refreshing or publishing widget data:

```powershell
npm.cmd run diagnose:fuel
```

This makes a bounded check of the Circle K price page, Circle K station catalogue, Virši catalogue page and its observed official JSON endpoint. The result includes HTTP status and parser record counts, saved privately in `artifacts/fuel-http-diagnostics.json`. `npm run diagnose:fuel -- --legacy` repeats the check using the earlier client header values for comparison. Run comparisons intentionally rather than in a frequent loop. A browser success alone cannot distinguish an IP rule from cookies, request identity, request timing, transport differences or a transient refusal. A successful check cannot retrospectively establish why an earlier request failed.

Failures do not count as success. Repeated launches still apply a cooldown: the task's normal interval for interval tasks, or 24 hours for daily/monthly tasks; delayed electricity publication retries after one hour. Other independent due tasks continue. A degraded report is shown before publication, and valid/cached data can still be deployed. Tests, build or publication command failures stop the PowerShell script.

The `.update.lock` and collector lock prevent overlapping work against the same directory. If a process crashes, first confirm it has stopped before removing its leftover lock. The server never blindly deletes another process's lock.

## Scheduling

No Windows task is installed automatically. For unattended local updates, create one Task Scheduler entry repeating every 30 minutes under the Windows user with working Git credentials:

- Program: `powershell.exe`
- Arguments: `-NoProfile -ExecutionPolicy Bypass -File "FULL_PATH\scripts\update-widgets.ps1"`
- Start in: the repository root
- Overlapping-instance setting: do not start a new instance

The frequent trigger is only a scheduler check: fuel remains six-hourly, directories weekly and archives monthly. An occasional manual invocation runs only due work and does not create a background schedule. A scheduled task can run only while its host is available.

The optional API server checks this same task plan every 30 minutes. `COLLECT_INTERVAL_HOURS` can slow fuel collection (6–168 hours); it does not make catalogue downloads follow fuel frequency. Do not run a separate collector and the server concurrently against the same directory.

The repository's `nameday-statistics.yml` workflow remains a separate monthly cloud check for name counts and uses the existing Pages deployment workflow. GitHub Pages itself serves static files and does not run the local collectors.
