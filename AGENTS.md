# Contributor instructions

- All documentation must be written and maintained in English only: READMEs, setup guides, API documentation, changelogs, and code documentation.
- Keep UI translations, generated horoscope texts, and locale-specific data multilingual. The English-only documentation rule does not apply to product content.
- Do not commit SQLite databases, raw archives, credentials, or private Home Assistant configuration. Publish generated public JSON through `data/`.
- Name-day source URLs belong in research files, documentation and provenance metadata only. Do not display source URLs, clickable citations or source lists in the widget interface. When reporting research progress, say that sources were recorded in working files; do not imply that links were added to the interface.
- Continue name-day priority research in the single shared branch `codex/namedays-round4`. Reuse this branch for subsequent rounds; do not create a branch per batch.
- Research name-day histories in calendar order. The widget shows only yesterday, today and tomorrow, so start with the nearest upcoming day in Priority 0 of `NAMEDAYS_BACKLOG.md` (regenerate it with `npm run backlog:namedays` before each round) and finish that day's names in the LV, LT and EE calendars before moving to the next day. Use the bearer-count priority lists only after the upcoming days are covered.

- Before writing or modifying horoscope content, read `HOROSCOPE_EDITORIAL_RULES.md`. Apply its Do/Avoid grammar, distinct-topic and non-mirroring rules in all languages and both moods. Validate future provider output before caching; bump the writer version and regenerate JSON after copy changes.
