export function chartWindow(points, days, now = Date.now(), intraday = false) {
  if (!days) return points;
  const last = points.at(-1)?.at;
  // Published future electricity intervals extend the view rather than displace
  // the preceding 24 hours / seven days.
  const end = intraday ? Math.min(now, last) : last;
  return points.filter(p => p.at > end - days * 86400000);
}

export function priceChange(from, to) {
  const delta = to - from;
  return {delta, percent: from === 0 ? null : delta / Math.abs(from) * 100};
}

export function nearestPoint(points, at) {
  let low = 0, high = points.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (points[mid].at < at) low = mid + 1;
    else high = mid;
  }
  return low > 0 && at - points[low - 1].at <= points[low].at - at ? low - 1 : low;
}
