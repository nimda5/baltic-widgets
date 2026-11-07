# Responsive portal layout

The top section uses a separate login/sidebar column and a shared news area. Categories span the entire news area. On desktop, that area contains a news column, the original advertisement in the centre, and another news column. News cards use the same image, publisher and headline treatment as the lower feed.

| Viewport width | Top section |
| --- | --- |
| Below 768 px | Login followed by categories and one news column. The tall advertisement is hidden. The compact widget tabs follow the top news. |
| 768–1199 px | A 238 px sidebar beside two news columns. The tall advertisement is hidden. Compact widget tabs remain below the top section. |
| 1200–1399 px | Four columns: 238 px sidebar, news, a 300 px banner, news. The banner retains its full image and original aspect ratio; news columns match its 457.5 px height. |
| 1400 px and above | Four columns: 238 px sidebar, news, the original 400 × 610 px banner, news. Both news columns are 610 px high. |

The original container widths still apply: a fluid mobile container, 480 px from 480 px, 768 px from 768 px, 1200 px from 1200 px, 1320 px from 1400 px, and 1852 px from 1900 px. Available viewport width and the scrollbar constrain the container.

All 24 original top stories remain available across six pages, with four stories per page and two cards per desktop news column. Pagination buttons and touch swiping change both news columns together. Inactive pages are hidden from display and keyboard navigation. Higher-resolution copies of the original photos are stored locally; their source URLs are recorded in `public/reference/asset-map.json`. The lower feed is unchanged.

## Widget placement

At 1200 px and above, name days remain in the sidebar and the three other widgets occupy a row below the top section. Below 1200 px, the existing name-day card moves into the compact widget tabs without being duplicated. Below 768 px, those tabs follow the top news and precede the mobile promotional and weather blocks.

`public/portal-local.css` owns the local layout overrides. `public/portal.js` handles pagination, swiping, translation and widget placement. The reference styles remain unchanged. News stories, weather and advertisement creative remain a fixed snapshot; original advertising, analytics and sign-in scripts do not run.
