# Circle K Latvia directory audit — 23 November 2026

The live official [station search](https://www.circlek.lv/station-search) returned 84 locations. Its visible result count and all 84 embedded `ck_sim_search.station_results` entries agree. Every entry is Active and belongs to LV; the parser retains all entries. All have addresses and coordinates. This is a location count, not a claim that every location sells fuel: Kaļķu is a convenience shop, and Botānika 2 currently has no fuel availability in the directory.

## Comparison with saved project data

- The initial saved official search response had 85 locations.
- Public data at `88cfc36` had 85 directory locations. The only directory ID absent from the current response is `63208`, CIRCLE K LIELVĀRDE, `"Priežkalni 2", Jumpravas pag., Ogres nov.`
- Data from 6–9 November contained 85 directory locations and up to 87 total locations, including unmatched address-specific price rows. Later matching reduced the total to 85. The data history inspected for this audit did not contain more than 100 Circle K Latvia locations; the user's remembered higher count remains unconfirmed.
- The total became 84 in the saved 16 November evening response (`3bcecac`). It was already 84 on published main before this price-parser fix.

## Other address sources and limits

The [Competition Council decision of 5 November, published 17 November](https://www.vestnesis.lv/op/2026/222.4), approves Petrol Property's acquisition and Viada's use of the Lielvārde station. It describes its former Circle K franchise relationship. The old [Circle K detail URL](https://www.circlek.lv/station/circle-k-lielvarde) now returns HTTP 404. The disappearance is consistent with that transfer; this is not evidence that the physical station closed. Its address remains preserved in historical project data and this audit, but must not receive a current Circle K network price.

The Circle K [network overview](https://www.circlek.lv/uznemumiem/klienta-ieguvumi/tikls) advertises 86 stations, while other corporate pages say 85. These summary counts do not supply additional current station identities and should not override the live search response.

The official [autogas page](https://www.circlek.lv/degviela-miles/autogaze) is unsuitable as a replacement current directory. It still lists Lielvārde, Preiļi and Krāslava. Circle K's [24 March 2023 announcement](https://www.circlek.lv/media-assets/uploads/2023-04/06_24032023_Circle_K_partrauc_ligumu_VegaP.pdf?VersionId=X1mUdjdK2EV4cdZjZ4i0DWqDVcQG5rtd) confirms the Preiļi and Krāslava franchises left the network in May/June 2023. Adding those entries would inflate the count with outdated affiliations.

The secondary `degalukaina.lt` list advertises 86 Circle K locations but its saved prices are dated 2 November 2026 and it includes Lielvārde. It is not used to restore current Circle K identities or prices.

## Price and address behavior

The [price page](https://www.circlek.lv/degviela-miles/degvielas-cenas) dated 23 November publishes network-wide prices, including the LPG-specific statement `Autogāzes cena visos DUS ir vienāda`. The parser accepts that wording only for LPG. It keeps all 84 directory addresses and coordinates, and expands a common quote only to locations whose directory record confirms that fuel. The current directory confirms LPG at 39 locations.

Raw audit responses are private working files under `var/circle-audit/`; they are not committed. Sources and claims are documented here, not added to the widget interface.
