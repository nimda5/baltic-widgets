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

The private index includes `LT-SALYS83`, `EE-MAGISTE29`, `EE-TURK10`, `LT-PAKERYS09`, `LT-PAKERYS10`, `LT-PAKERYS11`, `LT-MACIEJAUSKIENE94`, `EE-LEOLE05`, `EE-LEOLE05-DEC`, `EE-EISEN-TOLL`, `EE-KALLASMAA17`, `EE-MUST62`, `LV-LVA-EN06`, `LV-LVA-NORDIC03`, `LV-LVA-LT61`, `LV-LVA-RU93`, `LV-ALL93`, `LV-IDENTITY25`, `LV-LILE24`, `INT-MUSE46`, `INT-KRAUS13`, `RU-PETROVSKY66` `LT-SINKEVICIUTE06` `LT-BURBA24` and `LV-SILINA15`. The source directory records exact productive locations and limitations. Cache files are optional: an offline public-data rebuild uses the committed narratives and provenance.

## Continuing a round

1. Search the source IDs already listed in the directory.
2. Index a useful new PDF once, using its stable source ID and actual title/year.
3. Inspect relevant original pages and save private screenshots if needed.
4. Add precise evidence and access limitations to the source directory and next numeric round notes.
5. Regenerate the name profiles and backlog. Keep unresolved hypotheses open and source links out of the widget UI.

December research added **Leole, December 2005** (8 pages), **Eisen, Tõll ja ta sugu** (170 pages; edition year not established in this review), and **Pakerys 2010** (15 pages). At the end of round 35, the 20 registered sources contained **2,328 indexed PDF pages**. Reuse the existing objects rather than fetching or extracting them again. Pakerys’s extraction loses accents: search `mintas` or the `Ei-` section if exact `Eimintas` yields nothing, then inspect PDF p. 5 / printed p. 92. The asterisk is defined on PDF p. 2 / printed p. 89: it means twentieth-century name formation, not an ancient attestation. Eisen PDF p. 138 / printed p. 132 qualifies the proposed Leiger derivation; a popular column’s stronger wording must not erase that qualification.

The 6–10 December rounds added `EE-TURK10` (165 pages), `INT-KRAUS13` (23-page publisher preview) and `RU-PETROVSKY66` (385-page scan). At the end of round 40, the cache had **23 sources and 2,901 pages**. Petrovsky was recognized once with Russian Windows OCR and indexed by its original PDF hash; repeated indexing reuses that extraction. Search the Cyrillic stem when accents or OCR errors prevent an exact hit. Relevant Vladilen/Vladlena entries span PDF pp. 79–80 / printed pp. 78–79; Nikandr/Nika/Nikiy are on PDF p. 166 / printed p. 165. Türk’s Niilas/Niilo passage is PDF/printed p. 80; Kraus’s related Russian name list is PDF p. 16 / printed p. 8. These are already saved: do not download or recognize them again. See the source directory for exact claims and limits.


Rounds 41–45 (11–15 December) add **LT-BURBA24**, the publisher’s 2024 Burba article, 23 pages. At the end of round 45, the cache held **24 sources and 2,924 pages**. It was extracted once by content hash; the accepted Kastytis episode was checked against original PDF p. 3 / printed p. 132. Reused originals include Pakerys 2011 PDF pp. 4 and 9, Mägiste 1929 PDF pp. 17–18, 22, 27 and 49, and Salys PDF pp. 229–230, 243 and 318. Exact spellings distinguish Kastantas from Kastautas and Fortūnatas from Fortunatas. Public documentation stores locators and limitations, not the full PDF or extracted text. Rajandi’s restricted DIGAR book is only a catalogue lead and is not part of the cache.


Rounds 46–50 add **LV-SILINA15**, Zane Šiliņa’s 2015 Interlitteraria article, **13 pages**, indexed once by its original PDF hash. The cache now holds **25 sources and 2,937 pages**. Original PDF p. 3 / printed p. 9 supports the Lelde/Tots literary episode; it does not resolve Tots’s proposed lexical origins. Reused Salys pp. 319, 255 and 152–153 distinguish exact spellings, personal names from place names, and modern Urbonas from the cited 1510 Urban spelling. Mägiste pp. 13, 17, 20 and 21 and Pakerys 2011 p. 2 were also checked in the originals. No recurring PDF was downloaded or extracted again.


## 21–25 December reuse (rounds 51–55)

No new PDF was needed: the private cache remains **25 source records / 2,937 indexed pages**. Reused original pages from Salys 1983 (PDF 213, 230, 243, 298, 309, 319), Pakerys 2010 (PDF 7), Pakerys 2011 (PDF 3), Mägiste 1929 (PDF 21, 23, 50) and Leole December 2005 (PDF 6). Page images were rendered privately for exact spelling and column checks; existing indexed full text was not extracted again.

Important corrections: Salys PDF 319 prints **Grožvydas**, whereas Pakerys 2010 PDF 7 / printed 94 independently gives **Graž̃vydas**. Salys PDF 233’s Mina-like text hit is not a Mina personal-name entry. Mägiste’s Toom comparison has a question mark; its running-text senni hit is not a personal-name entry. Leole’s Christmas/Natalie group is on **p. 6**, not p. 1. Record both printed and PDF page numbers as in [NAMEDAYS_SOURCES.md](NAMEDAYS_SOURCES.md). New HTML encyclopaedia/catalogue resources belong in that source directory; they do not require a PDF cache record.

The 12 November–25 December verification recheck (rounds 56–61) added **EE-RAJANDI66**, Edgar Rajandi, *Raamat nimedest* (Tallinn, 1966), **247 PDF pages**, indexed from its text layer. The OCR layer misreads letters and diacritics: always confirm a hit on the rendered page image and record printed as well as PDF page numbers.
