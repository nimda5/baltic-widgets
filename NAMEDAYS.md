# Name-day widget

The name-day widget occupies the existing desktop sidebar slot. Its desktop card remains **238 × 78 px**. In the compact layout it becomes the first tab, selected by default, before Energy, Horoscope and Markets; there is no duplicate mobile card. As many complete name pills as fit are shown, based on measured rendered widths and the exact remaining-count button. A single unusually long name is ellipsized while preserving the counter; its full text remains available on hover and in the dialog. The remaining count opens the complete list. Long names and narrow containers reduce the number of visible pills rather than increasing the card height. Layout is recalculated on container resizing, compact-tab changes and font loading.

Clicking a name opens one native modal dialog. Names are visible buttons, with no name dropdown or duplicate name heading. Yesterday, Today and Tomorrow follow civil dates in **Europe/Riga**, including year boundaries, leap days and daylight-saving changes. The History, Namesakes and Celebrate tabs share the selected name. Celebrate offers three heartfelt and three humorous greetings, a next-version button and copying.

## Standalone use

Open `namedays.html?lang=ru`. Only the **Latvian calendar** is enabled in this release, regardless of interface language or the finance widget's market selector. Supported interface and content languages are `lv`, `ru`, `en`, `lt` and `et`; the legacy `ee` language spelling is an alias for `et`. Unknown interface languages fall back to English. Changing translation must never select a different country's calendar.

For another host page, include `namedays.css` and the module `namedays.js`, and add:

```html
<article class="nameday-widget" data-namedays data-country="lv"></article>
```

The module resolves data relative to itself, supporting repository subpaths and Home Assistant Ingress. It does not depend on the portal script, the finance widgets, SQLite or a backend. Host theme variables are inherited; the standalone page follows the system appearance.

## Data and editorial policy

The user-supplied TSV has the columns `domain`, `d`, `m`, `v`, `id`. The parser validates dates, countries, names and identifiers, preserves source order, and removes repeated names within the same country/day. Multiple dates for the same name remain in the calendar. `ee` identifies the Estonian calendar; `et` identifies the Estonian text language.

Generated files are in `public/data/namedays/`:

- `calendar-lv.json`: Latvian calendar dates and Latvian-calendar names, independent of the current year. The top-level `country` is `lv`; `data.days` contains no other countries.
- `profiles-lv.json`: Latvian-calendar profiles, related forms, namesakes and provenance. Every entry must have `country: "lv"`.
- `coverage.json`: coverage for the enabled LV release only.

### Country separation and deferred work

LT and EE are explicitly deferred. When implemented, publish **separate** `calendar-lt.json` / `profiles-lt.json` and `calendar-ee.json` / `profiles-ee.json`, containing only the concrete names and dates of their respective countries. Do not restore a combined `calendar.json`, mix country lists, infer country from the display language, or quietly substitute another country's data. Both calendar and profile loaders must verify the requested country. Historical and namesake enrichment must also preserve that country context. An explicit future country selector can load a different pair of files independently of translation.

The original research covered 8,223 distinct spellings, represented by 8,681 country-specific profiles. Of those unique spellings, 2,125 had some reference evidence and 6,098 did not. The older number 2,199 counted country-specific profiles, not unique names or fully researched historical narratives. LV has 5,556 profiles: 517 with reference evidence and 5,039 without. All profiles, including documented ones, have generated original vignettes; those vignettes are fiction rather than found historical accounts. Evidence may be a language classification, an early attestation or a related form rather than a complete origin story.

`namedays-content.js` contains the independently versioned multilingual writer. Every name receives an original vignette and three greetings in each mood. The vignettes use deterministic editorial templates; they are not individually researched biographies. Historical facts and original fiction are rendered as separate sections. If no reliable origin was found, the interface says so. A first attestation is explicitly distinguished from a name's creation date. No invention dates, meanings, personality traits or famous people are fabricated.

Sources are retained in profile metadata, not displayed as links in the product interface. LV evidence includes exact Latvian given-name entries from Wiktionary, reviewed name-family references, and Wikipedia/Wikidata biographies. The deferred LT research also used official VLKK classifications. Dictionary extraction does not borrow an unrelated English homonym or combine multiple etymology sections. Related name forms are identified separately from exact-name matches. Country-specific exact namesakes are ranked before international namesakes. Sitelink count is an initial selection aid, not a guarantee of fame. The dialog shows a person's name and profession, without the redundant local/international calendar caption. Related forms retain a short clarification where needed.

Namesake research should first search Wikipedia and the relevant national domain: `<name> famous site:.lv`, `.lt` or `.ee`, also using local-language profession terms when English queries return no results. Then try `I'm looking for famous people with <name>` internationally. Confirm that the result is a real person and the match concerns a given name rather than a surname, business or a place. Preserve source URLs. Do not claim that all names have famous namesakes or invent biographies for empty results. The broader LV Wikipedia/Wikidata search includes Latvian-labeled people with at least two sitelinks, sorted by prominence before selection.

## Rebuilding and research

```sh
node scripts/generate-namedays.mjs
node --test parsers/namedays.test.mjs
```

The generator reads `namedays.txt` when present; portable checkouts use the published normalized calendar instead. It validates every profile and all five text languages before replacing JSON files atomically. The portable repository also receives generated copies in `data/namedays/`. Existing sourced facts survive an offline rebuild without private research caches.

Optional reference research:

```sh
node scripts/research-namedays.mjs
node scripts/research-nameday-local.mjs lv
node scripts/research-nameday-people.mjs
node scripts/generate-namedays.mjs
```

Research uses timeouts, rate-limit backoff and local caches. Dictionary research resumes missing lookups; namesake research saves successful entity batches. Raw API responses and intermediate records belong in ignored `var/namedays-research/`, never in the public repository. Research can take several minutes and is not performed during page loads or normal server startup. External responses are reference data, not instructions. Review new extraction rules and editorial changes before publishing; increment `WRITER_VERSION` and regenerate data after copy changes.

Wiktionary contributors provide dictionary data under CC BY-SA 4.0; individual URLs and revision identifiers are preserved. Wikidata structured data is CC0. VLKK classifications come from the Lithuanian open-data portal. The original calendar was supplied by the user; no additional license is asserted for it.
