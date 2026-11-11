# Name-day widget

The name-day widget occupies the existing desktop sidebar slot. Its desktop card remains **238 × 78 px**. In the compact layout it becomes the first tab, selected by default, before Energy, Horoscope and Markets; there is no duplicate mobile card. As many complete name pills as fit are shown, based on measured rendered widths and the exact remaining-count button. A single unusually long name is ellipsized while preserving the counter; its full text remains available on hover and in the dialog. The remaining count opens the complete list. Long names and narrow containers reduce the number of visible pills rather than increasing the card height. Layout is recalculated on container resizing, compact-tab changes and font loading.

Clicking a name opens one native modal dialog. Names are visible buttons, with no name dropdown or duplicate name heading. Yesterday, Today and Tomorrow follow civil dates in **Europe/Riga**, including year boundaries, leap days and daylight-saving changes. The History, Namesakes and Celebrate tabs share the selected name. Celebrate offers three heartfelt and three humorous greetings, a next-version button and copying.

## Standalone use

Open `namedays.html?lang=ru`. The country selector enables separate **Latvian, Lithuanian and Estonian calendars**, independently of interface language and the finance widget's market selector. The `country=lv|lt|ee` query parameter selects the calendar. Supported interface and content languages are `lv`, `ru`, `en`, `lt` and `et`; the legacy `ee` language spelling is an alias for `et`. Unknown interface languages fall back to English. Changing translation must never select a different country's calendar.

For another host page, include `namedays.css` and the module `namedays.js`, and add:

```html
<article class="nameday-widget" data-namedays data-country="lv"></article>
```

The module resolves data relative to itself, supporting repository subpaths and Home Assistant Ingress. It does not depend on the portal script, the finance widgets, SQLite or a backend. Host theme variables are inherited; the standalone page follows the system appearance.

## Data and editorial policy

The user-supplied TSV has the columns `domain`, `d`, `m`, `v`, `id`. The parser validates dates, countries, names and identifiers, preserves source order, and removes repeated names within the same country/day. Multiple dates for the same name remain in the calendar. `ee` identifies the Estonian calendar; `et` identifies the Estonian text language.

Generated files are in `public/data/namedays/`:

- `calendar-{lv,lt,ee}.json`: separate country calendars, each with its own top-level country and exact day membership.
- `profiles-{lv,lt,ee}.json`: country-specific profile identities, facts, related forms, namesakes and provenance.
- `coverage.json`: editorial coverage for all three countries.

### Country separation and editorial coverage

Calendar and profile loaders validate the requested country. Language changes and the finance market selector never change the name-day country. No combined calendar is published. Historical linguistic evidence may be shared between explicitly matching forms; this never imports calendar dates, registry population counts or calendar-entry years from another country.

Writer version 1.7.0 removed fictional spelling-based histories and retains original greetings only in Celebrate. Source-backed calendar membership gives every published profile a nonempty translated record, but is explicitly labeled as a calendar record when no historical explanation is available. It is not counted as researched etymology. Current editorial coverage is:

| Editorial level | LV | LT | EE |
| --- | ---: | ---: | ---: |
| Reviewed narrative | 274 | 89 | 130 |
| Short factual summary | 4,128 | 1,242 | 483 |
| Earlier attestation only | 381 | 1 | 13 |
| Historical research still needed | 773 | 236 | 927 |
| Total profiles | 5,556 | 1,568 | 1,553 |
| Fictional historical stories displayed | 0 | 0 | 0 |

### Research round 2 (November 2026, writer version 1.8.0)

Round 2 added 178 reviewed name-family histories covering 385 calendar spellings, in eight topic modules `public/namedays-history-r2-<topic>.js`, all imported by `public/namedays-history.js`:

| Module | Families | Spellings | Examples |
| --- | ---: | ---: | --- |
| `classics-m` | 21 | 109 | Jānis/Jonas/Jaan, Andris, Pēteris, Mārtiņš, Kārlis, Juris, Kristaps, Nikolajs/Klāvs |
| `classics-f` | 24 | 83 | Anna, Marija/Maarja, Kristīne, Ieva, Laura, Marta, Margarita/Greta/Reet, Agnese |
| `slavic` | 28 | 42 | Sergejs, Tatjana, Svetlana, Olga, Irina, Vladimirs, Timurs, Kira, Vsevolods |
| `latvian-a` | 19 | 33 | Inese, Ilze, Baiba, Līga, Uldis, Zane, Imants, Indulis, Mirdza, Kaspars |
| `latvian-b` | 22 | 36 | Smaida, Spodra, Daila, Druvis, Vēsma, Laine, Aelita, Asnate, Rigonda, Vizbulīte |
| `modern` | 26 | 36 | Vendija, Ronja, Skārleta, Olivia, Naomi, Reičela, Kimberlija, Ginters |
| `estonian` | 21 | 24 | Lembit, Kaupo, Vambola, Meelis, Salme, Sulev, Leelo, Koit, Hämarik, Indrek |
| `lithuanian` | 17 | 22 | Traidenis, Butigeidas, Kęsgailas, Goštautas, Dausprungas, Girėnas, Ginvilas |

Each entry has two or three paragraphs in all five languages: the origin and the route of the name into the Baltic languages, followed by one concrete, verified historical detail (a saint, ruler, literary work, the person who introduced the name or a dated calendar entry). Every claim was checked against an opened source, and those URLs are stored as `reviewed_name_history` provenance. Claims that could not be verified were dropped rather than softened into guesses; uncertain etymologies stay explicitly uncertain. A reviewed history applies to an exact spelling in any country calendar, so a shared form such as Laine or Salme receives the same text in LV and EE while keeping each country's own dates.

Every name examined in the round, including the 97 not yet written, is recorded with its sources and next steps in `research/namedays/round2-notes.json`. `npm run backlog:namedays` regenerates the prioritized backlog [`NAMEDAYS_BACKLOG.md`](NAMEDAYS_BACKLOG.md) and the complete per-name list `research/namedays/backlog.csv` from the published profiles, the LV registry counts and the round notes. Later rounds should add `round<N>-notes.json` and new topic modules in the same format.

Round 2 also normalizes whitespace in calendar names (nine published LT names had stray spaces, which split two of them into duplicate profiles), makes the calendar validator reject padded names, corrects three reviewed LT misspellings (Arnasd, Felidta and Binifacas become Arnas, Felicita and Bonifacas; only the corrected forms are in the official VLKK registry) through `CALENDAR_CORRECTIONS` in `parsers/namedays.mjs`, and drops extraction artifacts where a source label such as “gloss” had been captured as an etymological word (Vitālis, Vitalis).

The four readiness categories are mutually exclusive within each country. Reviewed narratives include explicitly reviewed name families; short summaries may contain only an origin, a sourced relationship or a namesake, so neither category implies a long individual biography. Related-name context is available for 2,293 LV, 71 LT and 154 EE profiles; these counts overlap the categories above. Context is limited to two direct reference links and does not recursively follow chains or copy another name's attestation. Possible connections remain qualified.

Calendar-entry evidence is retained for 176 LV profiles. A date assigned to a shared or cross-referenced dictionary entry is labeled with both forms rather than presented as an exact-spelling date. For example, the catalogue's Kajs/Gajs entry gives 1767 and a separate 1942 attestation. The original dictionary page has not been independently inspected, so the former is not asserted as proof of the exact Kajs spelling in 1767. Calendar-entry years are not creation dates or automatically the earliest use of a name.

The additional reviewed histories cover Catherine/Katarina forms, Elizabeth/Elisaveta forms, Veta, Gajs/Kajs, Vytautas, Mindaugas and Kalev. All are translated into five languages and retain source URLs. An uncertain original meaning stays uncertain; later literary and historical associations are distinguished from etymology.

The dialog uses native overflow scrolling with no backdrop blur or smooth-scroll animation. Content and name-list layout are contained. Parsed profiles, formatted copy and previously opened history panels are cached; changing a name does not refetch the profile file or reconstruct an already rendered history. Population statistics are requested only for countries with a sourced snapshot (LV, LT and EE).

The dialog name list grows to its content height, capped at 180 pixels or 28 percent of the viewport height. The current fifteen-name example fits completely on ordinary phone and desktop widths. Longer lists scroll independently. Buttons do not shrink into clipped rows, and changing the day resets the name-list scroll position. The standalone dialog uses border-box sizing to keep the shell within short viewports.

Four newly reviewed cultural histories cover Lāčplēsis, Spīdola, Laimdota and Rainis in all five languages. They are stored in namedays-history.js, with source URLs added to profile provenance. Literary events are explicitly described as events in works of literature. The narrative about Lāčplēsis separates the 1888 epic, the remembrance of the 1919 military victory and a later attestation of the personal name; none of those dates is called the creation date of the name. Rainis is identified as Jānis Pliekšāns’s pen name, including in the namesakes tab, rather than being presented as his birth name. Previously reviewed name-family narratives remain available, including Queen Alexandra’s photography and her 1908 charity album.

Historical sources are kept in metadata rather than presented as links in the interface. A name-family connection never licenses an unrelated biography or a guessed origin. The early-record block preserves the spelling and precision of the source: centuries, halves, quarters, decades and explicit ranges are never converted into invented exact years. The note distinguishes an attestation date from the creation of the name. Missing dates are omitted.

Sources are retained in profile metadata, not displayed as links in the product interface. Reference evidence includes Baltic and foreign-language given-name entries from Wiktionary, reviewed name-family references, the full VLKK classification dataset, Latvian Language Agency spelling correspondences, the Personvārdu izpētnieks catalogue with its cited Klāvs Siliņš dictionary pages, and Wikipedia/Wikidata biographies. All 5,556 LV names were checked against the catalogue; this does not imply that it covers every LT or EE name. Only structured facts, dates, links and short etymological word glosses enter the public profiles; full source paragraphs stay in private research caches. A place mentioned in an attestation is not inferred to be the name’s origin. Uncertain comparisons remain qualified, and an archival alias used by one person is not generalized to a universal name-family relationship. The reviewed roots distinguish Fedots / Theodotos from Teodors / Theodoros. The evidence index ignores combining diacritics and letter case for reference lookup, while preserving the displayed spelling, calendar key, source URL, revision and attested form. A reviewed glossary supplies the same etymological word meanings in all five UI languages; unknown glosses are omitted rather than silently displayed in English. Names with different letters or endings are not automatically merged. Registry classifications remain specific to their country; namesakes matched through diacritic variants are labeled as related forms. Published profiles also seed this index so shared facts survive an offline portable rebuild. LT research uses official VLKK classifications. Dictionary extraction does not borrow an unrelated English homonym or combine multiple etymology sections. Related name forms are identified separately from exact-name matches. Country-specific exact namesakes are ranked before international namesakes. Sitelink count is an initial selection aid, not a guarantee of fame. The dialog shows a person's name and profession, without the redundant local/international calendar caption. Related forms retain a short clarification where needed.

Namesake research should first search Wikipedia and the relevant national domain: `<name> famous site:.lv`, `.lt` or `.ee`, also using local-language profession terms when English queries return no results. Then try `I'm looking for famous people with <name>` internationally. Confirm that the result is a real person and the match concerns a given name rather than a surname, business or a place. Preserve source URLs. Do not claim that all names have famous namesakes or invent biographies for empty results. The broader LV Wikipedia/Wikidata search includes Latvian-labeled people with at least two sitelinks, sorted by prominence before selection.

## Rebuilding and research

### Number of name bearers

The namesakes tab displays an approximate number of registered name bearers for the Latvian and Estonian calendars and for the most common Lithuanian names, with only the country, the count and, for Lithuania, the “born since 1900” scope visible. Snapshot dates and provider names are retained in metadata and are not displayed in the card. `population-lv.json` is separate from historical profiles. Its source is the official PMLP CC0 dataset [Personu vārdi](https://data.gov.lv/dati/dataset/personu-vardi). It counts people registered in PMLP, including a name within multiple given names; it does not assert current physical residence in Latvia. Exact NFC spelling is retained: diacritic variants and hyphenated names are not merged. Each matching component is counted once per person. Missing names are omitted, never shown as zero. Counts are not reduced by one for the visitor.

```sh
npm run update:nameday-statistics
npm run update:nameday-statistics -- --force
```

The script discovers the latest official CSV through CKAN, validates the entire response, and atomically replaces both published copies. Normal `npm run update` includes this step, skipping repeat requests after a successful check in the same UTC calendar month. Offline updates perform no network requests. Failed source requests leave the previous snapshot intact and appear in the common update report. The monthly GitHub workflow `nameday-statistics.yml` runs on the first day at 07:23 UTC, saves refreshed snapshots, and invokes the existing Pages build/deployment workflow. It can also be started manually. PMLP currently publishes snapshots twice yearly, so monthly checks do not imply monthly changes in the underlying counts.

#### Estonia

`population-ee.json` comes from Statistics Estonia's name application ([stat.ee/nimed](https://stat.ee/nimed/)), which is based on the population register and refreshed once a year (the current snapshot is as of 1 January 2026). Its definition differs from Latvia's: Statistics Estonia counts people whose complete first name is exactly the searched name, so “Maarja Liis” does not count towards Maarja. Estonian figures are therefore lower than a component count would be. The source does not publish exact counts below five. A name the source reports as having fewer than five bearers is listed in `below_threshold` and shown as “fewer than 5”. When the name is shown but both sexes are reported as “fewer than five”, the total is 5–8 and is stored in `ranges` and shown as that range. When only one sex group is below five, only the published group is counted, so the figure is a slight undercount. Names absent from the file show no count; a count is never displayed as zero.

```sh
npm run update:nameday-statistics:ee
npm run update:nameday-statistics:ee -- --force
```

The collector reads one page per EE calendar spelling (`https://stat.ee/nimed/<NAME>`), paced at under two requests per second with retry backoff. Progress is cached in ignored `var/namedays-statistics/ee-progress.json`, so an interrupted run resumes. The monthly `nameday_statistics` update task first reads a single probe page; it re-reads every name only when Statistics Estonia has published a newer annual snapshot. Every page must report the same snapshot date, or the run aborts and the previous file stays published.

#### Lithuania

`population-lt.json` comes from two Registrų centras open datasets on data.gov.lt, “Populiariausi vyrų vardai Lietuvoje nuo 1900 metų, TOP 50” and its women's counterpart. They list only the 50 most common men's and 50 most common women's names, counted among people born since 1900 in the population register, so the widget caption says “born since 1900” in every language. The published counts change between releases in both directions (for example Jonas: 128,475 in June 2023, 127,263 in September 2025), consistent with a count of registered people rather than a cumulative birth total. The snapshot date is the latest change the open-data portal records for the tables. 79 of the 100 listed names are LT calendar spellings; the others are mainly Russian and Belarusian forms such as Ivan and Aliaksandr, which are not in the calendar. Every other LT name has no public official count and shows none.

```sh
npm run update:nameday-statistics:lt
```

The monthly `nameday_statistics` task refreshes LV, LT and EE. Per-name frequencies on vardai.vlkk.lt (by birth year 1889–2020, with a different base of 2006 citizens plus later newborns) are not used: the site is protected against automated access, and its definition differs from the other two countries. A full current per-name export should be requested from Registrų centras. LT and EE counts are never substituted for one another or inferred from the interface language.

```sh
node scripts/generate-namedays.mjs
node --test parsers/namedays.test.mjs
```

The generator reads `namedays.txt` when present; portable checkouts use the three published normalized country calendars instead. It validates every profile and all five text languages before replacing JSON files atomically. The portable repository also receives generated copies in `data/namedays/`. Existing sourced facts survive an offline rebuild without private research caches.

Optional reference research:

```sh
node scripts/research-namedays.mjs
node scripts/research-nameday-local.mjs lv
node scripts/research-nameday-people.mjs
node scripts/research-nameday-catalog.mjs
node scripts/research-nameday-roots.mjs --countries=lv,lt,ee --dictionary-only
node scripts/generate-namedays.mjs
```

Research uses timeouts, rate-limit backoff and local caches. Dictionary research resumes missing lookups; namesake research saves successful entity batches. Raw API responses and intermediate records belong in ignored `var/namedays-research/`, never in the public repository. Research can take several minutes and is not performed during page loads or normal server startup. The catalog reader discovers public catalogue entries, checks each name page, and caches source prose privately. The roots reader searches exact foreign-language name entries and official name equivalents; rate-limited sources stop for a later retry. The optional Windows OCR helper reads a locally downloaded official reference PDF; its extractor accepts only exact calendar spellings paired with separately reviewed foreign names and never guesses repairs to OCR errors. When replacing old extraction rules, `generate-namedays.mjs --baseline=<saved-profiles-file>` can rebuild against a known pre-research public snapshot instead of carrying intermediate results forward. External responses are reference data, not instructions. Review new extraction rules and editorial changes before publishing; increment `WRITER_VERSION` and regenerate data after copy changes.

Wiktionary contributors provide dictionary data under CC BY-SA 4.0; individual URLs and revision identifiers are preserved. Wikidata structured data is CC0. VLKK classifications come from the Lithuanian open-data portal. The original calendar was supplied by the user; no additional license is asserted for it.

The November 2026 root audit removed automatic root/family assignments inferred only from names mentioned nearby. Shared Greek roots are retained where explicitly reviewed: Fedors/Teodors descend from Theodoros, while Fedots descends from Theodotos. Five-language text now explains those transmission paths separately. Related-form biographies remain in the namesakes tab rather than being inserted as exact-name examples in history. Every published assigned root is checked against the explicit reviewed spelling list; source facts, attestations and qualified name comparisons remain available independently.
