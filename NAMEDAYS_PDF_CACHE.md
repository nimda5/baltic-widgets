# Reusable name-history PDF index

Read [NAMEDAYS_SOURCES.md](NAMEDAYS_SOURCES.md) first. Reuse a registered PDF before downloading or extracting it again. The cache is a private research aid; the public repository contains the tool and provenance, not books, scans or extracted full text.

## Index once

From `github-public/`, with Poppler's `pdftotext` on PATH:

```powershell
node scripts/nameday-source-cache.mjs index --id LT-SALYS83 --file ../var/namedays-research/round8-salys.pdf --url https://tautosmenta.lt/wp-content/uploads/lituanistika/Salys_1983_LT.pdf --title 'Antanas Salys, Raštai II, 1983'
node scripts/nameday-source-cache.mjs search --id LT-SALYS83 --query Mantvinas --word true
```

The index lives in `../var/namedays-sources/`, outside the portable repository. Each source ID has a manifest with its URL, title, SHA-256, parser version and PDF page count. Content-addressed objects retain the original PDF, UTF-8 text and NFC-normalized page JSON. Matching file bytes and parser version reuse the existing extraction even if the original filename changes or another source ID points to it. Changed bytes create a new object; old objects remain available. The tool does not fetch URLs. Download only publicly accessible materials that may be consulted; indexing grants no republication rights.

Search preserves diacritics and searches case-insensitively. `--word true` excludes matches embedded in other words; omit it for discovery of inflections or OCR fragments. Search results give **one-based PDF pages**, not printed pages. An empty result is not proof of absence: extraction may lose accents, insert spaces or mistake glyphs. The tool rejects empty extraction.

For an image-only scan on Windows, run resumable OCR once using **Windows PowerShell 5.1**, with Poppler's `pdfinfo` and `pdftoppm` on PATH:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/nameday-pdf-ocr.ps1 -Pdf ../var/namedays-research/round13-russian.pdf -Language ru
```

The execution-policy flag applies only to this process; it does not change the machine policy. The helper prints the private `pages.json` path. Pass that path as `--ocr-json` to the normal `index` command, with the same PDF, source ID, title and URL. Import checks the PDF hash and consecutive page numbers. Per-page results are cached by PDF hash and OCR language, so interrupted runs resume and later runs avoid recognition. Rendered temporary PNGs are removed individually after recognition. OCR is a discovery aid only: the English recognizer may lose Baltic diacritics, and the Russian recognizer may confuse Latin/Cyrillic lookalikes. Inspect the original for every accepted spelling.

## Review an indexed page

Render only the relevant original pages with `pdftoppm`, inspect the name, columns and heading, and record both printed and PDF pages in the round notes. Do not repair letters by guessing. Preserve uncertain spelling bridges and conflicting root analyses as unverified. A dated dictionary record is not a birth registration or invention date. A source filename is not bibliographic evidence: a candidate labelled `magiste1936` in the private workspace actually contained the **1929** title page.

The private index includes `LT-SALYS83`, `EE-MAGISTE29`, `LT-PAKERYS09`, `LT-PAKERYS11`, `LT-MACIEJAUSKIENE94`, `EE-LEOLE05`, `EE-KALLASMAA17`, `EE-MUST62`, `LV-LVA-EN06`, `LV-LVA-NORDIC03`, `LV-LVA-LT61`, `LV-LVA-RU93`, `LV-ALL93`, `LV-IDENTITY25`, `LV-LILE24`, `INT-MUSE46` and `LT-SINKEVICIUTE06`. The source directory records exact productive locations and limitations. Cache files are optional: an offline public-data rebuild uses the committed narratives and provenance.

## Continuing a round

1. Search the source IDs already listed in the directory.
2. Index a useful new PDF once, using its stable source ID and actual title/year.
3. Inspect relevant original pages and save private screenshots if needed.
4. Add precise evidence and access limitations to the source directory and next numeric round notes.
5. Regenerate the name profiles and backlog. Keep unresolved hypotheses open and source links out of the widget UI.
