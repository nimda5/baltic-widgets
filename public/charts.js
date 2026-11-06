import {t,locale} from './i18n.js';
import {seriesForPeriod} from './chart-periods.js';
import {chartWindow,priceChange,nearestPoint} from './chart-math.js';
const dialog = document.querySelector('.price-dialog');
const canvas = document.querySelector('#chart-canvas');
const cursor = document.querySelector('.chart-cursor');
const readout = document.querySelector('.chart-readout');
let active, opener, selectedPoints = [], plot, drag = null, comparison = null;
const format = (value, digits) => new Intl.NumberFormat(locale, {minimumFractionDigits:digits,maximumFractionDigits:digits}).format(value);
const dateFormat = (value, intraday = false) => new Intl.DateTimeFormat(locale, {timeZone:'Europe/Riga',day:'2-digit',month:'2-digit',...(intraday ? {hour:'2-digit',minute:'2-digit'} : {year:'numeric'})}).format(new Date(value));
function node(tag, className, text) {
  const n = document.createElement(tag);
  if (className) n.className = className;
  if (text !== undefined) n.textContent = text;
  return n;
}
function svgNode(tag, attrs = {}, text) {
  const n = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key,value] of Object.entries(attrs)) n.setAttribute(key, String(value));
  if (text !== undefined) n.textContent = text;
  return n;
}

export function priceButton(quote, {label, unit, digits = 3, className = 'price-value', intraday = false, text}) {
  const button = node('button', 'price-trigger');
  button.type = 'button';
  button.setAttribute('aria-label', `${label}: ${format(quote.price,digits)} ${unit}. ${t('view_price_history','View price history')}`);
  button.title=t('view_price_history','View price history');
  button.append(node('span', className, text ?? format(quote.price,digits)));
  button.addEventListener('click', () => {
    opener = button;
    const series=[{...quote,label,unit,digits,intraday},...(quote.chart_series || [])];
    dialog.querySelector('.chart-series')?.remove();
    let select;
    const requestPeriod=days=>{const index=seriesForPeriod(series,days);if(select)select.value=String(index);showSeries(series[index],days);};
    const showSeries=(selection,requestedDays)=>{
      const quote=selection,{label,unit,digits=3,intraday=false}=selection;
    const ownHistory = Array.isArray(quote.history) ? quote.history : [];
    const reference = ownHistory.length < 2 && Array.isArray(quote.reference_history) && quote.reference_history.length > 1;
    const history = reference ? quote.reference_history : ownHistory;
    const points = history.filter(p=>Number.isFinite(p.value) && Number.isFinite(Date.parse(p.at))).map(p=>({at:Date.parse(p.at),value:p.value})).sort((a,b)=>a.at-b.at);
    const dailyPoints=(quote.daily_history || []).filter(p=>Number.isFinite(p.value)&&Number.isFinite(Date.parse(p.at))).map(p=>({at:Date.parse(p.at),value:p.value})).sort((a,b)=>a.at-b.at);
    const chartLabel = reference ? quote.reference_label : label;
    const source = reference ? quote.reference_source : quote.history_source;
    active = {label:chartLabel,unit,digits,intraday,dailyPoints,price:reference ? points.at(-1).value : (quote.price ?? points.at(-1)?.value),points};
    document.querySelector('#chart-title').textContent = chartLabel;
    document.querySelector('#chart-current').textContent = `${format(active.price,digits)} ${unit}${source ? ` · ${source}` : ''}`;
    const periods=intraday?[1,7,...(dailyPoints.length?[30,90,365,1825,0]:[])]:[7,30,90,365,1825,0];
    const periodKeys={1:['period_24h','24 h'],7:['period_7d','7 d'],30:['period_30d','30 d'],90:['period_90d','90 d'],365:['period_1y','1 y'],1825:['period_5y','5 y'],0:['period_all','All']};
    const buttons=periods.map(days=>{
      const period=t(...periodKeys[days]);
      const label=intraday && days<=7 && days>0?t('period_with_future','{period} + ahead',{period}):period;
      const b = node('button','',label); b.type = 'button'; b.dataset.days = days;
      b.addEventListener('click',()=>requestPeriod(days)); return b;
    });
    document.querySelector('.chart-periods').replaceChildren(...buttons);
    draw(requestedDays ?? (intraday ? 1 : quote.frequency==='monthly' ? 0 : 30));
    };
    if(series.length>1){
      select=node('select','chart-series');select.setAttribute('aria-label',t('price_series','Price series'));
      series.forEach((item,i)=>{const option=node('option','',item.label);option.value=String(i);select.append(option);});
      select.addEventListener('change',()=>showSeries(series[Number(select.value)]));document.querySelector('.chart-periods').before(select);
    }
    showSeries(series[0]);
    dialog.showModal();
  });
  return button;
}

function draw(days) {
  drag = null; comparison = null;
  document.querySelectorAll('.chart-periods button').forEach(b=>b.setAttribute('aria-pressed',String(Number(b.dataset.days)===days)));
  const daily=active.intraday && (days===0 || days>7) && active.dailyPoints.length>0;
  const points=daily?active.dailyPoints:active.points;
  active.displayIntraday=active.intraday&&!daily;
  document.querySelector('#chart-current').title=daily?t('daily_weighted','Duration-weighted daily averages (UTC), excluding VAT and supplier fees.'):'';
  selectedPoints = chartWindow(points,days,Date.now(),active.displayIntraday);
  const stats = document.querySelector('.chart-stats');
  const change = document.querySelector('#chart-change');
  if (selectedPoints.length < 2) {
    canvas.replaceChildren(node('p','chart-empty',t('history_empty','No price history is available for this period.')));
    cursor.hidden = true; readout.textContent = ''; stats.replaceChildren(); change.textContent = ''; plot = null; return;
  }
  cursor.hidden = false;
  const first = selectedPoints[0], last = selectedPoints.at(-1);
  const {delta,percent:changePercent} = priceChange(first.value,last.value);
  change.className = `trend ${delta>0?'up':delta<0?'down':'flat'}`;
  const percent = changePercent !== null ? ` (${format(Math.abs(changePercent),2)}%)` : '';
  change.textContent = `${delta>0?'↑':delta<0?'↓':'–'} ${format(Math.abs(delta),active.digits)}${percent}`;
  let min = Math.min(...selectedPoints.map(p=>p.value)), max = Math.max(...selectedPoints.map(p=>p.value));
  const pad = (max-min)*.18 || Math.max(Math.abs(min)*.02,.01);
  const low = min-pad, high = max+pad;
  const svgWidth = Math.min(760, Math.max(300, window.innerWidth-84));
  const left = svgWidth < 500 ? 72 : 82, right = svgWidth-20, top = 16, bottom = 234;
  const x = p=>left+(p.at-first.at)/(last.at-first.at)*(right-left);
  const y = p=>bottom-(p.value-low)/(high-low)*(bottom-top);
  const svg = svgNode('svg',{viewBox:`0 0 ${svgWidth} 276`,role:'img','aria-labelledby':'price-chart-title price-chart-description'});
  const periodTitle=days===0?t('all_days','All history'):t('days_count','{count} days',{count:days});
  svg.append(svgNode('title',{id:'price-chart-title'},`${active.label} — ${periodTitle}`),svgNode('desc',{id:'price-chart-description'},t('chart_description','{from}–{to}. Minimum {min}, maximum {max} {unit}. Use the slider below the chart to explore each price.',{from:dateFormat(first.at),to:dateFormat(last.at),min:format(min,active.digits),max:format(max,active.digits),unit:active.unit})));

  for(let i=0;i<5;i++) {
    const value = low+(high-low)*i/4, yy = y({value});
    svg.append(svgNode('line',{x1:left,x2:right,y1:yy,y2:yy,class:'chart-grid'}));
    svg.append(svgNode('text',{x:left-12,y:yy+4,'text-anchor':'end',class:'chart-axis'},format(value,active.digits)));
  }
  const line = selectedPoints.map((p,i)=>`${i?'L':'M'}${x(p).toFixed(2)},${y(p).toFixed(2)}`).join(' ');
  svg.append(svgNode('path',{d:`${line} L${right},${bottom} L${left},${bottom} Z`,class:'chart-area'}),svgNode('path',{d:line,class:'chart-line'}));
  if (selectedPoints.length <= 20) for (const p of selectedPoints) svg.append(svgNode('circle',{cx:x(p),cy:y(p),r:3,class:'chart-focus-dot'}));
  const longRange = last.at-first.at > 365*86400000;
  const axisDate = at => new Intl.DateTimeFormat(locale, {timeZone:'Europe/Riga',
    ...(active.displayIntraday && days===1 ? {day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'} : longRange ? {year:'numeric'} : {day:'2-digit',month:'2-digit'})}).format(new Date(at));
  for(let i=0;i<4;i++) {
    const p=selectedPoints[Math.round((selectedPoints.length-1)*i/3)];
    svg.append(svgNode('text',{x:x(p),y:262,'text-anchor':i===0?'start':i===3?'end':'middle',class:'chart-axis'},axisDate(p.at)));
  }
  const selection = svgNode('rect',{y:top,height:bottom-top,class:'chart-selection',visibility:'hidden'});
  const anchorLine = svgNode('line',{y1:top,y2:bottom,class:'chart-focus-line',visibility:'hidden'});
  const anchorDot = svgNode('circle',{r:4,class:'chart-focus-dot',visibility:'hidden'});
  const now=Date.now();
  if(active.displayIntraday && first.at<now && last.at>now){
    const xx=x({at:now});
    svg.append(svgNode('rect',{x:xx,y:top,width:right-xx,height:bottom-top,class:'chart-future'}),svgNode('line',{x1:xx,x2:xx,y1:top,y2:bottom,class:'chart-focus-line'}),svgNode('text',{x:xx+5,y:top+12,class:'chart-axis'},t('chart_future','Published ahead')));
  }
  const focusLine = svgNode('line',{y1:top,y2:bottom,class:'chart-focus-line'});
  const dot = svgNode('circle',{r:4,class:'chart-focus-dot'});
  svg.append(selection,anchorLine,anchorDot,focusLine,dot); canvas.replaceChildren(svg);
  plot = {svg,x,y,focusLine,dot,selection,anchorLine,anchorDot,left,right,svgWidth};
  cursor.max = String(selectedPoints.length-1); cursor.value = cursor.max;
  stats.replaceChildren(node('span','',`${t('chart_min','Min.')} ${format(min,active.digits)} ${active.unit}`),node('span','',`${t('chart_max','Max.')} ${format(max,active.digits)} ${active.unit}`),node('span','',`${dateFormat(first.at)}–${dateFormat(last.at)}`));
  if(daily)stats.append(node('span','',t('daily_count','Daily average (UTC) · {count} days',{count:new Intl.NumberFormat(locale).format(selectedPoints.length)})));
  const currentTime=Date.now();
  let initial=active.displayIntraday?nearestPoint(selectedPoints,currentTime):selectedPoints.length-1;
  if(active.displayIntraday && initial>0 && selectedPoints[initial].at>currentTime)initial--;
  cursor.value=String(initial);highlight(initial);
  canvas.title=t('chart_drag_hint','Drag across the chart to compare prices. Press Escape to clear.');
}

function highlight(index) {
  if(!plot) return;
  const p=selectedPoints[index];
  plot.focusLine.setAttribute('x1',plot.x(p)); plot.focusLine.setAttribute('x2',plot.x(p));
  plot.dot.setAttribute('cx',plot.x(p)); plot.dot.setAttribute('cy',plot.y(p));
  const pointText=`${dateFormat(p.at,active.displayIntraday)} · ${format(p.value,active.digits)} ${active.unit}`;
  cursor.setAttribute('aria-valuetext',pointText);
  if(comparison !== null){
    const a=selectedPoints[Math.min(comparison,index)],b=selectedPoints[Math.max(comparison,index)];
    const {delta,percent}=priceChange(a.value,b.value),sign=delta>0?'+':delta<0?'−':'';
    plot.selection.setAttribute('x',plot.x(a));plot.selection.setAttribute('width',plot.x(b)-plot.x(a));
    for(const n of [plot.selection,plot.anchorLine,plot.anchorDot])n.setAttribute('visibility','visible');
    const anchor=selectedPoints[comparison];
    plot.anchorLine.setAttribute('x1',plot.x(anchor));plot.anchorLine.setAttribute('x2',plot.x(anchor));
    plot.anchorDot.setAttribute('cx',plot.x(anchor));plot.anchorDot.setAttribute('cy',plot.y(anchor));
    readout.textContent=`${dateFormat(a.at,active.displayIntraday)} – ${dateFormat(b.at,active.displayIntraday)} · ${format(a.value,active.digits)} → ${format(b.value,active.digits)} ${active.unit} · ${sign}${format(Math.abs(delta),active.digits)} ${active.unit} (${percent===null?'—':sign+format(Math.abs(percent),2)+'%'})`;
  }else{
    for(const n of [plot.selection,plot.anchorLine,plot.anchorDot])n.setAttribute('visibility','hidden');
    readout.textContent=pointText;
  }
}
cursor.addEventListener('input',()=>{comparison=null;highlight(Number(cursor.value));});
function pointAt(event){
  const rect=plot.svg.getBoundingClientRect(),xx=(event.clientX-rect.left)/rect.width*plot.svgWidth;
  const target=selectedPoints[0].at+(Math.max(plot.left,Math.min(plot.right,xx))-plot.left)/(plot.right-plot.left)*(selectedPoints.at(-1).at-selectedPoints[0].at);
  return nearestPoint(selectedPoints,target);
}
canvas.addEventListener('pointerdown',event=>{
  if(!plot || !event.isPrimary || event.button!==0)return;
  event.preventDefault();
  canvas.setPointerCapture(event.pointerId);drag=event.pointerId;comparison=pointAt(event);
  cursor.value=String(comparison);highlight(comparison);
});
canvas.addEventListener('pointermove',event=>{
  if(!plot || (drag!==null && drag!==event.pointerId) || (drag===null && comparison!==null))return;
  const index=pointAt(event);cursor.value=String(index);highlight(index);
});
canvas.addEventListener('pointerup',event=>{
  if(drag!==event.pointerId)return;
  const index=pointAt(event);cursor.value=String(index);highlight(index);drag=null;
  if(canvas.hasPointerCapture(event.pointerId))canvas.releasePointerCapture(event.pointerId);
});
function clearComparison(){drag=null;comparison=null;if(plot)highlight(Number(cursor.value));}
canvas.addEventListener('pointercancel',clearComparison);
canvas.addEventListener('lostpointercapture',()=>{if(drag!==null)clearComparison();});
dialog.addEventListener('keydown',event=>{
  if(event.key==='Escape' && comparison!==null){event.preventDefault();clearComparison();}
});
document.querySelector('.chart-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{
  const r=dialog.getBoundingClientRect();
  if(event.target===dialog && (event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom))dialog.close();
});
dialog.addEventListener('close',()=>{opener?.focus();});
window.addEventListener('resize',()=>{
  if(dialog.open)draw(Number(document.querySelector('.chart-periods [aria-pressed="true"]').dataset.days));
});
