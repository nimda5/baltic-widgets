// Preserve the precision of a source: a century, quarter or decade is not a year.
export function attestationPeriod(value){
 const s=String(value||'').replace(/\b(\d{1,2})\.\s*gs\./g,'$1th century').replace(/\b(IV|III|II|I)\s*(?:ceturksnis|c\.)/g,(_,roman)=>({I:1,II:2,III:3,IV:4}[roman])+'th quarter').replace(/\b(\d{1,2})(?:st|nd|rd|th),\s*\d{1,2}(?:st|nd|rd|th) centuries\b/gi,'$1th century').replace(/^R(?=\d{4})/,'');
 const bc=/\b(?:BC|BCE)\b/i.test(s),era=bc?'bc':'ad';
 const range=/\b(\d{3,4})\s*[–-]\s*(\d{3,4})\b/.exec(s);if(range)return{kind:'range',from:+range[1],to:+range[2],era};
 const c=/\b(\d{1,2})(?:st|nd|rd|th)[ -]+century\b/i.exec(s);
 if(c){const n=+c[1],q=/\b(first|second|third|fourth|[1-4](?:st|nd|rd|th)) quarter\b/i.exec(s),half=/\b(first|second|[12](?:st|nd)) half\b/i.exec(s),part=/\b(early|mid|middle|late|beginning|end)\b/i.exec(s);
  if(q)return{kind:'quarter',century:n,quarter:({first:1,second:2,third:3,fourth:4}[q[1].toLowerCase()]||parseInt(q[1])),era};
  if(half)return{kind:'half',century:n,half:/first|1st/i.test(half[1])?1:2,era};
  if(part)return{kind:'part',century:n,part:/early|beginning/i.test(part[1])?'early':/mid|middle/i.test(part[1])?'middle':'late',era};
  return{kind:'century',century:n,era};
 }
 const decade=/\b(\d{3}0)s\b/.exec(s);if(decade)return{kind:'decade',year:+decade[1],era};
 const year=/\b(\d{3,4})\b/.exec(s)||/^\s*(\d{1,2})\s*(?:BC|BCE|AD|CE)?\s*$/i.exec(s);
 if(year){const qualifier=/\b(before|after|around|circa|c\.)\b/i.exec(s)?.[1]?.toLowerCase();return{kind:'year',year:+year[1],qualifier:qualifier||null,era};}
 return null;
}
export function attestationRange(value){
 const p=attestationPeriod(value);if(!p)return[Infinity,Infinity];let start,end;
 if(p.century){start=(p.century-1)*100+1;end=p.century*100;if(p.quarter){start+=(p.quarter-1)*25;end=start+24;}if(p.half){start+=(p.half-1)*50;end=start+49;}if(p.part){const offset={early:0,middle:33,late:66}[p.part];start+=offset;end=Math.min(p.century*100,start+33);}}
 else if(p.kind==='range'){start=p.from;end=p.to;}
 else{start=p.year;end=p.kind==='decade'?p.year+9:p.year;if(p.qualifier==='around'||p.qualifier==='circa'){start-=5;end+=5;}}
 return p.era==='bc'?[-Math.max(start,end),-Math.min(start,end)]:[Math.min(start,end),Math.max(start,end)];
}
const ordinal=n=>n+((n%100>=11&&n%100<=13)?'th':({1:'st',2:'nd',3:'rd'}[n%10]||'th'));
const roman=n=>{let result='';for(const [number,letters] of [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']])while(n>=number){result+=letters;n-=number;}return result;};
export function formatAttestation(value,lang='en'){
 const p=attestationPeriod(value);if(!p)return null;let text;
 if(p.century){const n=p.century,q=p.quarter,h=p.half,part=p.part;
  const centuries={lv:n+'. gadsimts',ru:n+' век',en:ordinal(n)+' century',lt:roman(n)+' a.',et:n+'. sajand'};
  text=centuries[lang]||centuries.en;
  if(q)text=({lv:n+'. gadsimta '+q+'. ceturksnis',ru:roman(n)+' век, '+roman(q)+' четверть',en:['first','second','third','fourth'][q-1]+' quarter of the '+ordinal(n)+' century',lt:roman(n)+' a. '+roman(q)+' ketvirtis',et:n+'. sajandi '+q+'. veerand'})[lang]||text;
  if(h)text=({lv:n+'. gadsimta '+h+'. puse',ru:roman(n)+' век, '+(h===1?'первая':'вторая')+' половина',en:(h===1?'first':'second')+' half of the '+ordinal(n)+' century',lt:roman(n)+' a. '+(h===1?'pirmoji':'antroji')+' pusė',et:n+'. sajandi '+(h===1?'esimene':'teine')+' pool'})[lang]||text;
  if(part)text=({lv:n+'. gadsimta '+{early:'sākums',middle:'vidus',late:'beigas'}[part],ru:{early:'начало',middle:'середина',late:'конец'}[part]+' '+roman(n)+' века',en:{early:'early ',middle:'mid-',late:'late '}[part]+ordinal(n)+' century',lt:roman(n)+' a. '+{early:'pradžia',middle:'vidurys',late:'pabaiga'}[part],et:n+'. sajandi '+{early:'algus',middle:'keskpaik',late:'lõpp'}[part]})[lang]||text;
 }else if(p.kind==='decade'){text=({lv:p.year+'. gadi',ru:p.year+'-е годы',en:p.year+'s',lt:p.year+'-ieji',et:p.year+'. aastad'})[lang]||p.year+'s';}
 else if(p.kind==='range')text=p.from+'–'+p.to;
 else{text=({lv:p.year+'. gads',ru:p.year+' год',en:String(p.year),lt:p.year+' m.',et:p.year+'. aasta'})[lang]||String(p.year);if(p.qualifier){const prefixes={before:['pirms','до','before','iki','enne'],after:['pēc','после','after','po','pärast'],around:['ap','около','around','apie','umbes'],circa:['ap','около','around','apie','umbes']},i=({lv:0,ru:1,en:2,lt:3,et:4})[lang]??2;text=(prefixes[p.qualifier]?.[i]||prefixes.around[i])+' '+p.year;}}
 if(p.era==='bc')text+=' '+({lv:'p. m. ē.',ru:'до н. э.',en:'BC',lt:'pr. Kr.',et:'eKr'})[lang];
 return text;
}
