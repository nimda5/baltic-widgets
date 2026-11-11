import {researchedHistories} from './namedays-history-details.js';
import {balticHistories} from './namedays-history-baltic.js';
// Research round 2 (November 2026): verified family histories, one module per research batch.
import {historiesClassicsM} from './namedays-history-r2-classics-m.js';
import {historiesClassicsF} from './namedays-history-r2-classics-f.js';
import {historiesSlavic} from './namedays-history-r2-slavic.js';
import {historiesLatvianA} from './namedays-history-r2-latvian-a.js';
import {historiesLatvianB} from './namedays-history-r2-latvian-b.js';
import {historiesModern} from './namedays-history-r2-modern.js';
import {historiesEstonian} from './namedays-history-r2-estonian.js';
import {historiesLithuanian} from './namedays-history-r2-lithuanian.js';
import {historiesPriority} from './namedays-history-r3-priority.js';
import {historiesPriorityR4} from './namedays-history-r4-priority.js';
import {historiesPriorityFamilies} from './namedays-history-r5-families.js';
import {historiesEstonianRecords} from './namedays-history-r5-estonian-records.js';
import {historiesPriorityCulture} from './namedays-history-r5-culture.js';
import {historiesLatvianRecords} from './namedays-history-r5-latvian-records.js';
import {historiesEstonianR6} from './namedays-history-r6-estonian.js';
import {historiesBalticR6} from './namedays-history-r6-baltic.js';
import {historiesLatvianR7} from './namedays-history-r7-latvian.js';
import {historiesBalticR7} from './namedays-history-r7-baltic.js';
// Reviewed cultural histories. Literary plots are identified as literature;
// a publication date is never presented as a person's first recorded name.
const epic='https://enciklopedija.lv/skirklis/37565';
const play='https://enciklopedija.lv/skirklis/96065';
const remembrance='https://enciklopedija.lv/skirklis/126064';
const biography='https://www.literatura.lv/personas/rainis';
const entries={
 ...researchedHistories,
 ...balticHistories,
 ...historiesClassicsM,
 ...historiesClassicsF,
 ...historiesSlavic,
 ...historiesLatvianA,
 ...historiesLatvianB,
 ...historiesModern,
 ...historiesEstonian,
 ...historiesLithuanian,
 ...historiesPriority,
 ...historiesPriorityR4,
 ...historiesPriorityFamilies,
 ...historiesEstonianRecords,
 ...historiesPriorityCulture,
 ...historiesLatvianRecords,
 ...historiesEstonianR6,
 ...historiesBalticR6,
 ...historiesLatvianR7,
 ...historiesBalticR7,
 'Lāčplēsis':{
  sources:[epic,remembrance],
  text:{
   ru:['Lāčplēsis означает «разрывающий медведя». В имени соединены латышские lācis («медведь») и plēst («рвать»): оно сразу знакомит читателя с необыкновенной силой героя.','В 1888 году Андрейс Пумпурс опубликовал эпос «Lāčplēsis», опираясь на народные предания. Его необыкновенно сильный герой защищает свой народ; через этот сюжет писатель выразил стремление латышей к самостоятельности.','Позже литературный образ вошёл в историю страны. День Лачплесиса, 11 ноября, напоминает о победе латвийской армии над войсками Бермонта в Риге в 1919 году. Так в одном имени встретились народное предание, авторский эпос и память о борьбе за независимость.'],
   en:['Lāčplēsis means “bear-tearer”. It combines Latvian lācis (“bear”) and plēst (“to tear”), introducing the reader to the hero’s extraordinary strength through the name itself.','In 1888 Andrejs Pumpurs published Lāčplēsis, drawing on folk legends. Its exceptionally strong hero defends his people; through his story, the writer expressed Latvian aspirations to independence.','The literary figure later entered national remembrance. Lāčplēsis Day, 11 November, commemorates the Latvian army’s victory over Bermondt’s forces in Riga in 1919. The name thus brings together folklore, an authored epic and the memory of the struggle for independence.'],
   lv:['Lāčplēsis nozīmē lāča plēsēju. Vārdā savienoti lācis un plēst: tas jau pats par sevi iepazīstina lasītāju ar varoņa neparasto spēku.','Andrejs Pumpurs 1888. gadā publicēja eposu «Lāčplēsis», izmantojot tautas teikas. Neparasti stiprais varonis aizstāv savu tautu; ar viņa gaitām rakstnieks pauda latviešu patstāvības centienus.','Vēlāk literārais tēls ieguva vietu valsts vēsturiskajā atmiņā. Lāčplēša dienā, 11. novembrī, piemin Latvijas armijas uzvaru pār Bermonta karaspēku Rīgā 1919. gadā. Tā vienā vārdā satiekas folklora, autora radīts eposs un neatkarības cīņu piemiņa.'],
   lt:['Lāčplēsis reiškia „lokio plėšėjas“. Varde susijungia latvių lācis („lokys“) ir plēst („plėšti“): pats vardas supažindina skaitytoją su nepaprasta herojaus jėga.','1888 metais Andrejs Pumpurs, remdamasis liaudies padavimais, išleido epą „Lāčplēsis“. Nepaprastai stiprus jo herojus gina savo tautą; šiuo pasakojimu rašytojas išreiškė latvių savarankiškumo siekį.','Vėliau literatūrinis veikėjas tapo istorinės atminties dalimi. Lačplėsio dieną, lapkričio 11-ąją, minima Latvijos kariuomenės pergalė prieš Bermonto pajėgas Rygoje 1919 metais. Šiame varde susitinka tautosaka, autorinis epas ir kovos už nepriklausomybę atminimas.'],
   et:['Lāčplēsis tähendab „karurebijat“. Nimes ühinevad läti lācis („karu“) ja plēst („rebima“): nimi ise tutvustab lugejale kangelase erakordset jõudu.','Andrejs Pumpurs avaldas rahvamuistenditele tugineva eepose „Lāčplēsis“ 1888. aastal. Selle erakordselt tugev kangelane kaitseb oma rahvast; tema loo kaudu väljendas kirjanik lätlaste iseseisvuspüüdlusi.','Hiljem sai kirjanduslikust kujust osa riigi ajaloolisest mälust. Lāčplēsise päeval, 11. novembril, mälestatakse Läti sõjaväe võitu Bermondti vägede üle Riias 1919. aastal. Nimes kohtuvad folkloor, kirjaniku loodud eepos ja iseseisvusvõitluse mälestus.']
  }
 },
 'Spīdola':{
  sources:[play,'https://www.literatura.lv/darbi/408389'],
  text:{
   ru:['Spīdola — имя, знакомое по латышской литературе, прежде всего по драме Райниса «Uguns un nakts» («Огонь и ночь»). Пьеса была опубликована в 1905 году и впервые поставлена в 1911-м. Эти даты относятся к произведению, а не к появлению личного имени.','У Райниса Спидола проходит путь от связи с тёмными силами к стремлению изменить себя и других. Она побуждает Лачплесиса не останавливаться на достигнутом. Поэтому культурная история этого имени связана с темами искусства, внутреннего роста и постоянного поиска — с ролью героини в пьесе, а не с характером всех носительниц имени.'],
   en:['Spīdola is familiar from Latvian literature, especially Rainis’s play Uguns un nakts (Fire and Night). The play was published in 1905 and first staged in 1911. These are dates in the work’s history, not the first use of the personal name.','Rainis’s Spīdola moves from an association with dark forces towards changing herself and others. She urges Lāčplēsis to keep developing. The name’s cultural story therefore involves art, inner growth and restless searching: themes of the character’s role, not personality traits shared by everyone with the name.'],
   lv:['Spīdola ir latviešu literatūrā pazīstams vārds, īpaši Raiņa lugā «Uguns un nakts». Luga publicēta 1905. gadā un pirmoreiz iestudēta 1911. gadā. Tie ir darba vēstures datumi, nevis personvārda pirmā lietojuma laiks.','Raiņa Spīdola no sākotnējās saistības ar tumsas spēkiem nonāk līdz vēlmei mainīties pašai un mainīt citus. Viņa mudina Lāčplēsi neapstāties pie sasniegtā. Tāpēc šā vārda kultūras vēsture saistās ar mākslu, iekšēju izaugsmi un nemitīgiem meklējumiem — ar tēla lomu lugā, nevis visu vārda nesēju raksturu.'],
   lt:['Spīdola — latvių literatūroje pažįstamas vardas, ypač iš Rainio dramos „Uguns un nakts“ („Ugnis ir naktis“). Pjesė išleista 1905 metais, pirmą kartą pastatyta 1911-aisiais. Šios datos priklauso kūrinio istorijai, o ne žymi pirmą asmenvardžio pavartojimą.','Rainio Spīdola nuo pradinio ryšio su tamsos jėgomis pereina prie siekio keistis pačiai ir keisti kitus. Ji ragina Lačplėsį nesustoti ties pasiektais laimėjimais. Todėl šio vardo kultūrinė istorija siejasi su menu, vidiniu augimu ir nuolatinėmis paieškomis — veikėjos vaidmeniu, o ne visų šio vardo turėtojų būdu.'],
   et:['Spīdola on Läti kirjandusest tuttav nimi, eeskätt Rainise näidendist „Uguns un nakts“ („Tuli ja öö“). Näidend ilmus 1905. aastal ja jõudis esimest korda lavale 1911. aastal. Need on teose ajaloo kuupäevad, mitte isikunime esimese kasutuse aeg.','Rainise Spīdola liigub esialgsest seosest pimeduse jõududega soovini muuta iseennast ja teisi. Ta innustab Lāčplēsist saavutatu juures mitte peatuma. Seetõttu seostub nime kultuurilugu kunsti, sisemise kasvu ja lakkamatu otsimisega — tegelase rolliga näidendis, mitte kõigi nimekandjate iseloomuga.']
  }
 },
 'Laimdota':{
  sources:[epic,play],
  text:{
   ru:['Культурная история имени Laimdota связана с эпосом Андрейса Пумпурса «Lāčplēsis». В нём Лаймдота — возлюбленная главного героя. Её похищение и возвращение становятся частью его пути: за большим рассказом о народе стоит и личная история разлуки и поисков.','Позднее Райнис вернулся к этому образу в «Uguns un nakts» («Огонь и ночь»). В пьесе Лаймдота становится символом Латвии и хранительницей традиционных духовных ценностей. Это помогает понять место имени в культуре, но не определяет судьбу или характер реальной женщины по имени Laimdota.'],
   en:['Laimdota’s cultural history is connected with Andrejs Pumpurs’s epic Lāčplēsis. She is the hero’s beloved. Her abduction and return become part of his journey: within the larger story of a people lies a personal story of separation and searching.','Rainis later revisited the character in Uguns un nakts (Fire and Night). In the play, Laimdota becomes a symbol of Latvia and a keeper of traditional spiritual values. This explains the name’s place in culture without prescribing the destiny or personality of a real woman named Laimdota.'],
   lv:['Vārda Laimdota kultūras vēsture saistīta ar Andreja Pumpura eposu «Lāčplēsis». Tajā Laimdota ir galvenā varoņa mīļotā. Viņas nolaupīšana un atgūšana kļūst par daļu no viņa gaitām: plašajā stāstā par tautu ir arī personisks šķiršanās un meklējumu stāsts.','Vēlāk Rainis pie šā tēla atgriezās lugā «Uguns un nakts». Tajā Laimdota kļūst par Latvijas simbolu un tradicionālo garīgo vērtību glabātāju. Tas palīdz izprast vārda vietu kultūrā, taču nenosaka īstas sievietes, vārdā Laimdota, likteni vai raksturu.'],
   lt:['Vardo Laimdota kultūrinė istorija siejasi su Andrejo Pumpuro epu „Lāčplēsis“. Jame Laimdota yra pagrindinio herojaus mylimoji. Jos pagrobimas ir susigrąžinimas tampa jo kelio dalimi: didžiajame pasakojime apie tautą glūdi ir asmeninė išsiskyrimo bei paieškų istorija.','Vėliau Rainis grįžo prie šio veikėjo dramoje „Uguns un nakts“ („Ugnis ir naktis“). Joje Laimdota tampa Latvijos simboliu ir tradicinių dvasinių vertybių saugotoja. Tai paaiškina vardo vietą kultūroje, bet nenulemia tikros moters, vardu Laimdota, likimo ar būdo.'],
   et:['Nime Laimdota kultuurilugu seostub Andrejs Pumpursi eeposega „Lāčplēsis“. Seal on Laimdota peategelase armastatu. Tema röövimine ja tagasitoomine saavad osaks kangelase teekonnast: suures rahvalikus loos on ka isiklik lahusoleku ja otsimise lugu.','Hiljem pöördus Rainis tegelase juurde tagasi näidendis „Uguns un nakts“ („Tuli ja öö“). Selles saab Laimdotast Läti sümbol ja traditsiooniliste vaimsete väärtuste hoidja. See selgitab nime kohta kultuuris, kuid ei määra päris Laimdota-nimelise naise saatust ega iseloomu.']
  }
 },
 'Rainis':{
  sources:[biography,'https://memorialiemuzeji.lv/izstade-viens/'],pseudonymPerson:'Q348001',
  text:{
   ru:['У имени Rainis есть важная литературная ассоциация, которую легко принять за запись в паспорте. Поэт и драматург Райнис на самом деле носил имя Jānis Pliekšāns — Янис Плиекшанс. Rainis был его литературным псевдонимом.','За этим псевдонимом стоят не только стихи. В 1898 году латышский перевод гётевского «Фауста» вышел отдельной книгой с именами Райниса и Аспазии: они работали над ним вместе. Так литературное имя связывает читателя и с собственными произведениями писателя, и с его работой переводчика.'],
   en:['Rainis has an important literary association that can easily be mistaken for a birth name. The poet and playwright known as Rainis was actually named Jānis Pliekšāns. Rainis was his literary pseudonym.','Poetry is only part of that pen name’s story. In 1898 a Latvian translation of Goethe’s Faust appeared as a book credited to Rainis and Aspazija, who had worked on it together. The name connects his readers with translation as well as his own writing.'],
   lv:['Vārdam Rainis ir nozīmīga literāra saikne, ko viegli sajaukt ar dzimšanas vārdu. Dzejnieka un dramaturga Raiņa īstais vārds bija Jānis Pliekšāns. Rainis bija viņa literārais pseidonīms.','Ar šo pseidonīmu saistās ne tikai dzeja. Gētes «Fausta» tulkojums latviešu valodā 1898. gadā iznāca atsevišķā grāmatā, kurā kā atdzejotāji minēti Rainis un Aspazija: viņi pie tā strādāja kopā. Tā literārais vārds lasītāju saista gan ar paša rakstnieka darbiem, gan viņa veikumu tulkošanā.'],
   lt:['Vardas Rainis turi svarbią literatūrinę sąsają, kurią lengva palaikyti gimimo vardu. Poeto ir dramaturgo, žinomo kaip Rainis, tikrasis vardas buvo Jānis Pliekšāns. Rainis buvo jo literatūrinis slapyvardis.','Su šiuo slapyvardžiu siejasi ne vien eilėraščiai. 1898 metais latviškas Goethe’s „Fausto“ vertimas išėjo atskira knyga, kurioje kaip vertėjai nurodyti Rainis ir Aspazija: jie dirbo kartu. Tad literatūrinis vardas skaitytoją sieja ir su paties rašytojo kūryba, ir su jo vertimais.'],
   et:['Nimel Rainis on oluline kirjanduslik seos, mida võib kergesti sünninimeks pidada. Rainisena tuntud luuletaja ja näitekirjaniku tegelik nimi oli Jānis Pliekšāns. Rainis oli tema kirjanikunimi.','Selle kirjanikunimega seostub enamat kui luule. Goethe „Fausti“ lätikeelne tõlge ilmus 1898. aastal eraldi raamatuna, mille tõlkijatena olid märgitud Rainis ja Aspazija: nad töötasid selle kallal koos. Nimi seob lugeja nii kirjaniku enda loomingu kui ka tema tõlketööga.']
  }
 }
};
export function reviewedHistory(name){return entries[name.normalize('NFC').replace(/\.$/,'')]||null;}
