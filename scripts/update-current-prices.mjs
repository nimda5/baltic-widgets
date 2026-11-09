// Compatibility entry point: recent prices only, with the shared cadence policy.
process.argv.push('--profile=current');
await import('./update-data.mjs');
