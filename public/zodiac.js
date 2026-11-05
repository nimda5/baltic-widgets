// Calendar boundaries use the portal market's local date, not UTC.
export function currentZodiac(date = new Date(), timeZone = 'Europe/Riga') {
  const parts = new Intl.DateTimeFormat('en', { timeZone, month: 'numeric', day: 'numeric' }).formatToParts(date);
  const month = Number(parts.find(part => part.type === 'month').value);
  const day = Number(parts.find(part => part.type === 'day').value);
  const today = month * 100 + day;
  const boundaries = [
    [120, 'aquarius'], [219, 'pisces'], [321, 'aries'],
    [420, 'taurus'], [521, 'gemini'], [621, 'cancer'],
    [723, 'leo'], [823, 'virgo'], [923, 'libra'],
    [1023, 'scorpio'], [1122, 'sagittarius'], [1222, 'capricorn']
  ];
  let sign = 'capricorn';
  for (const [start, id] of boundaries) {
    if (today < start) break;
    sign = id;
  }
  return sign;
}
