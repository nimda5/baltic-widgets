// One cadence policy for manual commands, PowerShell and the optional API server.
// Daily/monthly boundaries use Riga time; interval tasks use elapsed time.
const hour=3600000;
export const updateTasks=[
 {id:'directories',group:'weekly',interval:7*24*hour,label:'Station addresses, coordinates and available fuels'},
 {id:'fuel',group:'prices',interval:6*hour,label:'Current fuel quotes (cached station locations)'},
 {id:'electricity',group:'prices',period:'day',notBeforeHour:15,retryInterval:hour,label:'Daily day-ahead electricity schedule after 15:00 Riga'},
 {id:'gas',group:'daily',period:'day',label:'Recent EEX gas prices'},
 {id:'markets',group:'daily',period:'day',label:'Recent ECB, NBP gold and Bitcoin prices'},
 {id:'horoscope',group:'daily',period:'day',label:'Local validated horoscope cache'},
 {id:'fuel_archive',group:'weekly',interval:7*24*hour,label:'European Commission weekly fuel averages'},
 {id:'commodity_archive',group:'monthly',period:'month',label:'World Bank monthly gas/gold history'},
 {id:'nameday_statistics',group:'monthly',period:'month',label:'Official name bearer counts'}
];
export const updateProfiles=['auto','prices','current','daily','weekly','monthly','full'];
export function rigaDay(value){return new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Riga',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date(value));}
export function rigaHour(value){return Number(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Riga',hour:'2-digit',hourCycle:'h23'}).format(new Date(value)));}
export function planUpdates(state={}, {profile='auto',force=false,now=new Date()}={}){
 if(!updateProfiles.includes(profile))throw Error('Unknown update profile: '+profile);
 return updateTasks.filter(t=>profile==='auto'||profile==='full'||t.group===profile||(profile==='current'&&['fuel','electricity','gas','markets'].includes(t.id))).map(task=>{
  const saved=state[task.id]||{},at=saved.last_success,attempt=saved.last_attempt;
  let due=force||profile==='full'||!at;
  if(!due){due=task.interval?+new Date(now)-Date.parse(at)>=task.interval:rigaDay(now).slice(0,task.period==='month'?7:10)!==rigaDay(at).slice(0,task.period==='month'?7:10);}
  if(task.notBeforeHour&&at&&!force&&profile!=='full')due=rigaHour(now)>=task.notBeforeHour&&(rigaDay(now)!==rigaDay(at)||rigaHour(at)<task.notBeforeHour);
  // A failed request has a cooldown too. Repeated launches must not hammer a 403.
  const retry=task.retryInterval||task.interval||24*hour;
  const coolingDown=!force&&profile!=='full'&&attempt&&(!at||attempt>at)&&+new Date(now)-Date.parse(attempt)<retry;
  if(coolingDown)due=false;
  const nextCheck=coolingDown?new Date(Date.parse(attempt)+retry).toISOString():task.interval&&at?new Date(Date.parse(at)+task.interval).toISOString():null;
  return{...task,due,reason:due?(force||profile==='full'?'forced':at?'due':'first_run'):coolingDown?'retry_cooldown':'not_due',last_success:at||null,next_check_at:nextCheck};
 });
}
