# Collectors

Run once with `npm run update` from the project root. SQLite: `var/widgets.sqlite`; raw archives: `var/archives/`. See [README](../README.md).

- fuel.mjs: operator prices, LEA, FuelEst; last good results preserved on failure.
- oil-history.mjs: EC weekly national averages since 2005.
- electricity.mjs: Elering/Nord Pool history and current intervals.
- gas.mjs: EEX NGP regional natural gas.
- markets.mjs: ECB, NBP, Coin Metrics, World Bank and EUR conversion.
- horoscope.mjs: astronomy and cached local editorial generation.

`npm test` does not call live upstream services.
