# Horoscope editorial rules

These rules apply to local templates, manual edits, and any future model/API writer. Read them before changing horoscope copy. The executable contract is `parsers/horoscope-policy.mjs` (`do-avoid-v1`).

## Required structure

- Keep exactly two moods: `serious` (normal) and `humor` (funny).
- Return three `do` items and three `dont` items. The legacy JSON key `dont` means the **Avoid** group.
- The displayed headings are Do/Avoid in English, with equivalent localized headings elsewhere. Do not repeat the heading inside an item.
- Include `do_topic` and `avoid_topic`, using different life-area IDs: `work`, `money`, `relationships`, `personal`, `home`, or `balance`.
- Keep each item self-contained. Aim for 60–110 characters; the hard limit is 180. The first item must work on its own in the compact preview.

## Meaning and grammar

Do is an affirmative, useful action. Avoid names an undesirable behaviour, situation, or habit. Do not place a negative command beneath Avoid: “Avoid: do not take another task” reverses the intended reading.

Use a natural grammatical complement in each language:

- English: a noun phrase or gerund, such as “An extra task accepted only out of politeness.”
- Russian: a noun phrase in the appropriate case after the localized heading; never an opening negative command.
- Latvian: a natural noun phrase introduced by the preposition required by the localized heading; never a negated imperative.
- LT/ET currently use English body-text fallback and localized interface headings. Keep fallback metadata truthful; apply the same rule if native content is added later.

The two groups must not be inversions, paraphrases, or the same action with negation swapped. This applies to all nine cross-group item pairs, not just matching row numbers. Choosing distinct subject areas helps prevent mirrored advice; review meaning as well as metadata.

Good:

- Do: “Confirm the project scope before quoting.”
- Avoid: “Guessing someone’s feelings from a one-word reply.”

Bad:

- Do: “Skip exercise.” / Avoid: “Exercise.”
- Do: “Take a break.” / Avoid: “Working without a break.”
- Avoid: “Do not promise too much.”

## Tone and realism

Normal mode is specific, clear, and practical. Avoid vague filler, fixed personality descriptions, moral lectures, and guaranteed predictions about money, health, or relationships.

Funny mode must be witty throughout all six items. Use a concrete observation, an unexpected comparison, or a punchline that supports the advice. Do not add one generic joke to otherwise normal copy. Keep humour warm; do not shame the reader or rely on stereotypes. Put the joke early enough to survive a short preview where possible.

Astronomical facts must come from calculations. Editorial variation is a writing rule, not evidence that a particular event will occur.

## Variation and publication

- Maintain three variants per sign, mood, and day.
- Rotate life areas, situations, and wording. Adjacent days must not repeat complete items or sentences for the same sign/mood/variant.
- Keep the normal and funny copies genuinely distinct and preserve variation between signs.
- Produce LV/RU/EN content consistently; use English fallback explicitly for other languages.
- Validate every result with `validateAdvice` before caching or publishing, including future model output. Validation checks structure, topic separation, duplicate text, opening negation, and length. Human/editorial review still checks meaning and whether the humour works.
- Run `node --test parsers/horoscope.test.mjs` after changing copy. Run `npm test` in the public project before publishing.
- Bump the writer/cache version when rules or copy change, regenerate public horoscope JSON, and deploy matching code and data. Retain older cached versions as history.
