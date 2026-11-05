function coverage(series,days){
  const history=series.intraday && (days===0 || days>7) ? series.daily_history || series.history : series.history;
  const times=(history || []).map(p=>Date.parse(p.at)).filter(Number.isFinite);
  if(times.length<2)return 0;
  const cadence=series.frequency==='monthly'?31:series.intraday&&days===1?0:1;
  return (Math.max(...times)-Math.min(...times))/86400000+cadence;
}
export function seriesForPeriod(series,days){
  const spans=series.map(s=>coverage(s,days));
  if(days>0){const index=spans.findIndex(span=>span>=days);if(index>=0)return index;}
  return spans.indexOf(Math.max(...spans));
}
