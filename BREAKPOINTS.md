# Responsive portal layout

The top section restores the saved Inbox.lv markup and responsive rules from `public/reference/portal-1.css`. The login/sidebar, news panel and advertisement are siblings. The banner is not inserted between news columns.

| Viewport width | Top section |
| --- | --- |
| Below 768 px | Login followed by a large leading story and compact thumbnail rows. The tall advertisement is hidden. Compact widget tabs follow the news. |
| 768–1199 px | Sidebar and the 400 × 610 px advertisement share the first row. The news list occupies the next row, followed by compact widget tabs. |
| 1200–1399 px | Sidebar, compact news list (up to 470 px) and the 400 × 610 px advertisement share one row. |
| 1400–1899 px | The news list expands to 600 px between the sidebar and advertisement. |
| 1900 px and above | The news panel expands to 1130 px, with a featured story on the left and thumbnail rows on the right. |

Original container widths apply: fluid below 480 px, then 480, 768, 1200, 1320 and 1852 px at the 480, 768, 1200, 1400 and 1900 px breakpoints. Local flex sizing allows for scrollbar width at exact boundaries so the advertisement does not wrap onto an extra row.

All 24 original stories remain across three pages of eight stories. Reference CSS determines which items are visible at each width, including the final thumbnail row on wide screens. Pagination and touch swiping change the active page. Inactive pages are hidden from display and keyboard navigation. Original picture sources choose featured or thumbnail images according to the viewport.

Lower feed cards inherit the portal surface, text, border and hover-shadow palette, including the text truncation gradient in light and dark themes.

## Widget placement

At 1200 px and above, name days remain in the sidebar and the other three widgets occupy a row below the top section. Below 1200 px, the existing name-day card moves into the compact widget tabs without duplication. Below 768 px, those tabs follow the top news and precede the mobile promotional and weather blocks.

`public/portal-local.css` contains local integration overrides. `public/portal.js` handles pagination, swiping, translation and widget placement. Reference styles remain unchanged. News stories, weather and advertisement creative remain a fixed snapshot; original advertising, analytics and sign-in scripts do not run.
