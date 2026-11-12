import {hypothesesLatvianR30,hypothesesLithuanianR30,hypothesesEstonianR30} from './namedays-hypotheses-r30.js';
import {hypothesesLatvianR29,hypothesesLithuanianR29,hypothesesEstonianR29} from './namedays-hypotheses-r29.js';
import {hypothesesLatvianR28,hypothesesLithuanianR28,hypothesesEstonianR28} from './namedays-hypotheses-r28.js';
import {hypothesesLatvianR27,hypothesesLithuanianR27,hypothesesEstonianR27} from './namedays-hypotheses-r27.js';
import {hypothesesLatvianR26,hypothesesLithuanianR26,hypothesesEstonianR26} from './namedays-hypotheses-r26.js';
import {hypothesesLatvianR25,hypothesesLithuanianR25,hypothesesEstonianR25} from './namedays-hypotheses-r25.js';
import {hypothesesLatvianR24,hypothesesLithuanianR24,hypothesesEstonianR24} from './namedays-hypotheses-r24.js';
import {hypothesesLatvianR23,hypothesesLithuanianR23,hypothesesEstonianR23} from './namedays-hypotheses-r23.js';
import {hypothesesLatvianR22,hypothesesLithuanianR22,hypothesesEstonianR22} from './namedays-hypotheses-r22.js';
import {hypothesesLatvianR21,hypothesesLithuanianR21,hypothesesEstonianR21} from './namedays-hypotheses-r21.js';
import {hypothesesLatvianR20,hypothesesLithuanianR20,hypothesesEstonianR20} from './namedays-hypotheses-r20.js';
import {hypothesesLatvianR19,hypothesesLithuanianR19,hypothesesEstonianR19} from './namedays-hypotheses-r19.js';
import {hypothesesLatvianR18,hypothesesLithuanianR18,hypothesesEstonianR18} from './namedays-hypotheses-r18.js';
import {hypothesesLatvianR17,hypothesesLithuanianR17,hypothesesEstonianR17} from './namedays-hypotheses-r17.js';
import {hypothesesLatvianR16,hypothesesLithuanianR16} from './namedays-hypotheses-r16.js';
// Provisional editorial comparisons. These never count as reviewed histories or root evidence.
import {hypothesesLatvianR12} from './namedays-hypotheses-r12.js';
import {hypothesesLatvianR14,hypothesesEstonianR14} from './namedays-hypotheses-r14.js';
import {hypothesesLatvianR15,hypothesesEstonianR15} from './namedays-hypotheses-r15.js';
const vianSources=['https://www.izpetnieks.lv/en/name/Vianita','https://www.izpetnieks.lv/en/name/Vianta'];
const langs=['lv','ru','en','lt','et'];
const vianText=[
 '{name} varētu būt patstāvīgs darinājums pēc skanējuma, līdzīgi Vianita un Vianta. Abām pēdējām formām vārdnīca norāda fonētisku darināšanu, taču tieši {name} gadījumā šāda cilme nav dokumentēta. Tā ir darba hipotēze, nevis pierādīta vārdu radniecība.',
 '{name} может быть самостоятельным образованием по звучанию, подобно Vianita и Vianta. Для двух последних форм словарь указывает фонетическое образование, но для {name} такое происхождение не документировано. Это рабочая гипотеза, а не доказанное родство имён.',
 '{name} might be an independent sound-based formation, like Vianita and Vianta. The dictionary calls those two forms phonetic formations, but does not document that origin for {name}. This is a working hypothesis, not an established relationship between the names.',
 '{name} galėtų būti savarankiškas garsinis darinys, panašiai kaip Vianita ir Vianta. Pastarąsias žodynas vadina fonetiniais dariniais, bet būtent {name} tokios kilmės nedokumentuoja. Tai darbo hipotezė, o ne įrodyta vardų giminystė.',
 '{name} võib olla iseseisev kõlapõhine moodustis nagu Vianita ja Vianta. Sõnaraamat nimetab neid kaht foneetilisteks moodustisteks, kuid ei dokumenteeri sellist päritolu nimele {name}. See on tööhüpotees, mitte tõestatud nimesugulus.'
];
const vidText=[
 '{name} rakstība ļauj apsvērt iespējamu saikni ar Vidars. Tā ir tikai darba versija pēc formu līdzības: nav atrasta dokumentēta pāreja no Vidars uz {name}. Vidars cilmes skaidrojumu tādēļ nevar uzskatīt par pierādītu arī šim vārdam.',
 'Написание {name} позволяет рассмотреть возможную связь с Vidars. Это лишь рабочая версия по сходству форм: документального перехода от Vidars к {name} не найдено. Поэтому этимологию Vidars нельзя считать доказанной и для этого имени.',
 'The spelling {name} suggests a possible comparison with Vidars. This is only a working proposal based on similar forms: no documented transition from Vidars to {name} has been found. The origin of Vidars therefore cannot be treated as established for this name.',
 '{name} rašyba leidžia svarstyti galimą ryšį su Vidars. Tai tik darbo versija pagal formų panašumą: dokumentuoto perėjimo iš Vidars į {name} nerasta. Todėl Vidars kilmė negali būti laikoma įrodyta ir šiam vardui.',
 'Kirjapilt {name} lubab kaaluda võimalikku võrdlust Vidarsiga. See on üksnes sarnastel vormidel põhinev tööversioon: dokumenteeritud üleminekut Vidarsist nimeks {name} pole leitud. Vidarsi päritolu ei saa seega pidada selle nime puhul tõestatuks.'
];
const entries={lv:{...hypothesesLatvianR12,...hypothesesLatvianR14,...hypothesesLatvianR15,...hypothesesLatvianR16,...hypothesesLatvianR17,...hypothesesLatvianR18,...hypothesesLatvianR19,...hypothesesLatvianR20,...hypothesesLatvianR21,...hypothesesLatvianR22,...hypothesesLatvianR23,...hypothesesLatvianR24,...hypothesesLatvianR25,...hypothesesLatvianR26,...hypothesesLatvianR27,...hypothesesLatvianR28,...hypothesesLatvianR29,...hypothesesLatvianR30},lt:{...hypothesesLithuanianR16,...hypothesesLithuanianR17,...hypothesesLithuanianR18,...hypothesesLithuanianR19,...hypothesesLithuanianR20,...hypothesesLithuanianR21,...hypothesesLithuanianR22,...hypothesesLithuanianR23,...hypothesesLithuanianR24,...hypothesesLithuanianR25,...hypothesesLithuanianR26,...hypothesesLithuanianR27,...hypothesesLithuanianR28,...hypothesesLithuanianR29,...hypothesesLithuanianR30},ee:{...hypothesesEstonianR14,...hypothesesEstonianR15,...hypothesesEstonianR17,...hypothesesEstonianR18,...hypothesesEstonianR19,...hypothesesEstonianR20,...hypothesesEstonianR21,...hypothesesEstonianR22,...hypothesesEstonianR23,...hypothesesEstonianR24,...hypothesesEstonianR25,...hypothesesEstonianR26,...hypothesesEstonianR27,...hypothesesEstonianR28,...hypothesesEstonianR29,...hypothesesEstonianR30}};
for(const name of ['Vianda','Viāna'])entries.lv[name]={sources:vianSources,text:Object.fromEntries(langs.map((l,i)=>[l,[vianText[i]]]))};
for(const name of ['Vidards','Vidarts','Vidavs'])entries.lv[name]={sources:['https://www.izpetnieks.lv/en/name/Vidars'],text:Object.fromEntries(langs.map((l,i)=>[l,[vidText[i]]]))};
entries.lt.Juozapotas={sources:['https://www.vle.lt/Straipsnis/juozapatas-kuncevicius/'],text:{
 lv:['Juozapotas varētu būt saistīts ar Juozapatas rakstību. Šī ir pagaidām nepārbaudīta formu salīdzināšana: avots dokumentē Juozapatas, bet ne abu rakstību savstarpēju atbilsmi. No šīs līdzības vien nevar droši pārņemt ne cilmi, ne konkrēta vēsturiska cilvēka dzīvesstāstu.'],
 ru:['Juozapotas может быть связано с написанием Juozapatas. Пока это непроверенное сравнение форм: источник документирует Juozapatas, но не соответствие двух написаний. Одного сходства недостаточно, чтобы перенести этимологию или биографию конкретного исторического человека.'],
 en:['Juozapotas may be connected with the spelling Juozapatas. This remains an unverified comparison: the source documents Juozapatas, not a correspondence between the two forms. Similarity alone does not establish a shared etymology or justify transferring a historical person’s biography.'],
 lt:['Juozapotas galėtų būti susijęs su Juozapatas rašyba. Kol kas tai nepatikrintas formų palyginimas: šaltinis dokumentuoja Juozapatas, bet ne abiejų rašybų atitiktį. Vien panašumas neįrodo bendros etimologijos ir neleidžia perkelti istorinio asmens biografijos.'],
 et:['Juozapotas võib olla seotud kirjapildiga Juozapatas. See on seni kontrollimata vormivõrdlus: allikas dokumenteerib Juozapatast, mitte kahe kirjapildi vastavust. Sarnasus üksi ei tõesta ühist etümoloogiat ega õigusta ajaloolise isiku eluloo ülekandmist.']
}};
// Exact historical usage is established; the proposed etymological bridge remains open.
entries.lt.Juozapotas.sources.push('https://tautosmenta.lt/wp-content/uploads/lituanistika/Salys_1983_LT.pdf#page=317');
const juozapotasRecord=[
 'Droši dokumentēta ir pati Juozapotas forma: 1964. gada «Tikiu Dievą» vārdu kalendārā tā dota ar īsformām Juozas un Potas. Saraksts pārpublicēts Saļa rakstos 1983. gadā. Tur norādīts 14. novembris, nevis šajā kalendārā izmantotais 12. novembris; šī atšķirība nepierāda vārda cilmi.',
 'Сама форма Juozapotas документирована: календарь имён «Tikiu Dievą» 1964 года даёт её с краткими формами Juozas и Potas. Список перепечатан в трудах Салиса в 1983 году. Там указано 14 ноября, тогда как в нашем календаре — 12 ноября; это различие не объясняет происхождение имени.',
 'The spelling Juozapotas itself is documented: the 1964 Tikiu Dievą name calendar lists it with short forms Juozas and Potas, reprinted in Salys’s writings in 1983. That list uses 14 November, whereas this calendar uses 12 November. This difference does not establish the name’s etymology.',
 'Pati Juozapotas forma dokumentuota: 1964 metų „Tikiu Dievą“ vardų kalendorius ją pateikia su trumpiniais Juozas ir Potas. Sąrašas perspausdintas Salio raštuose 1983 metais. Ten nurodyta lapkričio 14 diena, o šiame kalendoriuje — lapkričio 12 diena; šis skirtumas nepaaiškina vardo kilmės.',
 'Kirjapilt Juozapotas ise on dokumenteeritud: 1964. aasta Tikiu Dievą nimekalender annab selle koos lühivormidega Juozas ja Potas. Loend avaldati uuesti Salyse kirjutistes 1983. aastal. Seal on 14. november, selles kalendris aga 12. november. Erinevus ei tõesta nime etümoloogiat.'
];
for(const [i,l] of langs.entries())entries.lt.Juozapotas.text[l].push(juozapotasRecord[i]);
export const HYPOTHESIS_LABELS={lv:'Pieņēmums',ru:'Предположение',en:'Hypothesis',lt:'Prielaida',et:'Oletus'};
export function unverifiedHistory(name,country){return entries[country]?.[name.normalize('NFC').replace(/\.$/,'')]||null;}
