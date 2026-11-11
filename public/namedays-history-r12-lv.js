// 13 November: exact dictionary forms and visually checked rendering-manual rows.
export const historiesLatvianR12={};
const langs=['lv','ru','en','lt','et'];
const catalogue=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
const manual='https://www.personvarduatveide.lv/uploads/sources/30/pdf/krievu_ipasvardu_pareizrakstiba_un_pareizruna_latviesu_valoda_1993.pdf';
function add(name,sources,origin,story,year){historiesLatvianR12[name]={sources,text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]])),...(year?{calendar_entry_year:year}:{})};}
const greek=n=>[
 `${n} pieder Eižens vārdu saimei, ko vārdnīca saista ar grieķu eugenēs — «labi dzimis, dižciltīgs». Šis skaidrojums attiecas uz vēsturisko vārda cilmi; tas nav apgalvojums par mūsdienu vārda nesēja izcelsmi vai raksturu.`,
 `${n} относится к семье Eižens, которую словарь связывает с греческим eugenēs — «благородного рождения». Это историческое значение имени: оно не описывает происхождение или характер современного человека, который его носит.`,
 `${n} belongs to the Eižens family, which the dictionary connects with Greek eugenēs, well-born or noble. This describes the historical meaning behind the name, rather than the ancestry or character of a person who bears it today.`,
 `${n} priklauso Eižens vardų šeimai, kurią žodynas sieja su graikų eugenēs „gerai gimęs, kilmingas“. Tai istorinė vardo reikšmė, o ne teiginys apie šiandien jį turinčio žmogaus kilmę ar būdą.`,
 `${n} kuulub Eižensi nimeperre, mida sõnaraamat seob kreeka sõnaga eugenēs, hästi sündinud või õilsast soost. See on nime ajalooline tähendus ega kirjelda tänapäevase nimekandja päritolu või iseloomu.`
];
add('Eižens',[catalogue('Eižens')],greek('Eižens'),[
 'Eižens katalogā dokumentēts Rīgā 1869. gadā, bet kalendārā — 1884. gadā. Tās ir divas atsevišķas liecības: personvārda pieraksts un kalendāra ieraksts. Neviena no šīm ziņām nenozīmē, ka tieši tad radās pati grieķu cilmes vārdu saime.',
 'Для Eižens каталог приводит запись в Риге 1869 года и включение в календарь в 1884 году. Это разные свидетельства: употребление личного имени и календарная традиция. Ни одна дата не означает, что тогда возникла сама семья имён греческого происхождения.',
 'The catalogue records Eižens in Riga in 1869 and gives 1884 for its calendar entry. These are separate records of personal-name use and calendar tradition. Neither date marks the creation of the older Greek-derived name family.',
 'Katalogas Eižens paliudija Rygoje 1869 metais, o kalendoriaus įrašą datuoja 1884 metais. Tai atskiri asmenvardžio vartojimo ir kalendoriaus tradicijos liudijimai. Nė viena data nereiškia, kad tuomet atsirado pati senesnė graikiškos kilmės vardų šeima.',
 'Kataloog dokumenteerib Eižensi Riias 1869. aastal ning annab kalendrikande aastaks 1884. Need on isikunime kasutamise ja kalendritraditsiooni eri tõendid. Kumbki aasta ei tähista vanema kreeka päritolu nimepere loomist.'
],1884);
for(const [name,year,place] of [['Eiženijs',1942,'Riga'],['Eugēnijs',1965,'Vidzeme']])add(name,[catalogue(name),catalogue('Eižens')],greek(name),[
 `Vārdnīcas katalogs tieši formu ${name} datē ar ${year}. gadu (${place==='Riga'?'Rīgā':'Vidzemē'}). Tas parāda šīs rakstības lietojumu Latvijā. Atsevišķs kalendāra ieviešanas gads tai nav dots; Eižens 1884. gada ieraksts tādēļ paliek pie Eižens formas.`,
 `Каталог словаря датирует именно форму ${name} ${year} годом (${place==='Riga'?'Рига':'Видземе'}). Это свидетельство употребления данного написания в Латвии. Отдельный год включения в календарь не указан; запись Eižens за 1884 год остаётся сведением именно об Eižens.`,
 `The dictionary catalogue dates the exact form ${name} to ${year} in ${place}. This documents that spelling’s use in Latvia. No separate calendar-entry year is supplied for it; the 1884 calendar record for Eižens therefore remains attached to Eižens.`,
 `Žodyno katalogas būtent ${name} formą datuoja ${year} metais (${place==='Riga'?'Ryga':'Vidžemė'}). Tai šios rašybos vartojimo Latvijoje liudijimas. Atskiri įtraukimo į kalendorių metai nepateikti; 1884 metų Eižens kalendoriaus įrašas todėl lieka Eižens formos duomenimis.`,
 `Sõnaraamatukataloog dateerib täpse vormi ${name} aastaga ${year} (${place==='Riga'?'Riia':'Vidzeme'}). See dokumenteerib kirjapildi kasutust Lätis. Eraldi kalendrisse võtmise aastat ei anta; Eižensi 1884. aasta kalendrikirje jääb seetõttu Eižensi vormi juurde.`
]);
add('Jevgeņijs',[catalogue('Jevgeņijs'),catalogue('Eižens')],[
 'Jevgeņijs vārdnīcā dots kā Eižens krievu formas atveidojums. Tā vārdu saime ved pie grieķu eugenēs — «labi dzimis, dižciltīgs». Latviešu atveidojums un attālākais grieķu pamats ir dažādi posmi šīs formas vēsturē.',
 'Jevgeņijs словарь объясняет как передачу русской формы имени Eižens. Сама семья восходит к греческому eugenēs — «благородного рождения». Латышская передача и древнегреческая основа представляют разные этапы истории формы.',
 'The dictionary describes Jevgeņijs as a rendering of the Russian form of Eižens. The family goes back to Greek eugenēs, well-born or noble. The Latvian rendering and the older Greek basis represent different stages in this form’s history.',
 'Žodynas Jevgeņijs pateikia kaip Eižens rusiškos formos perteikimą. Vardų šeima siejama su graikų eugenēs „gerai gimęs, kilmingas“. Latviška perteikimo forma ir senesnis graikiškas pagrindas yra skirtingi šio vardo istorijos etapai.',
 'Sõnaraamat kirjeldab Jevgeņijsi kui Eižensi vene vormi läti vastet. Nimepere ulatub kreeka sõnani eugenēs, hästi sündinud või õilsast soost. Läti kirjakuju ja vanem kreeka alus on selle vormi ajaloo eri etapid.'
],[
 'Katalogā Jevgeņijs personvārda liecība ir no Rēzeknes 1876. gadā, bet kalendāra ieraksts — no 1864. gada. Agrākais kalendāra datējums nav pretruna: publicēts vārdu saraksts un atrasts konkrētas personas pieraksts nav viens un tas pats notikums.',
 'Каталог приводит личную запись Jevgeņijs в Резекне 1876 года и календарную запись 1864 года. Более ранняя календарная дата не противоречит поздней личной: опубликованный список имён и найденная запись о человеке — разные виды свидетельств.',
 'The catalogue gives a personal-name record of Jevgeņijs in Rēzekne in 1876 and a calendar entry in 1864. The earlier calendar date is compatible with the later personal record: a published name list and a surviving record of an individual are different kinds of evidence.',
 'Katalogas pateikia Jevgeņijs asmenvardžio įrašą Rėzeknėje 1876 metais ir kalendoriaus įrašą 1864 metais. Ankstesnė kalendoriaus data neprieštarauja vėlesniam asmens įrašui: paskelbtas vardų sąrašas ir išlikęs žmogaus paminėjimas yra skirtingi liudijimai.',
 'Kataloog annab Jevgeņijsi isikunimekirje Rēzeknes 1876. aastast ja kalendrikande 1864. aastast. Varasem kalendriaasta ei ole vastuolu: avaldatud nimeloend ja säilinud üksikisiku kirje on eri liiki tõendid.'
],1864);
add('Jevgeņija',[catalogue('Jevgeņija'),catalogue('Jevgeņijs'),catalogue('Eižens')],[
 'Jevgeņija vārdnīcā ir Jevgeņijs sieviešu forma; tālākā saikne caur Eižens ved pie grieķu eugenēs, «labi dzimis, dižciltīgs». Tātad avots dokumentē konkrētu sieviešu un vīriešu formu pāri, nevis tikai līdzīgu skanējumu.',
 'Jevgeņija словарь называет женской формой Jevgeņijs; дальнейшая связь через Eižens ведёт к греческому eugenēs, «благородного рождения». Здесь источник подтверждает конкретную пару женской и мужской форм, а не только сходство звучания.',
 'The dictionary identifies Jevgeņija as the feminine form of Jevgeņijs; through Eižens the family leads to Greek eugenēs, well-born or noble. The reference thus documents a particular feminine–masculine pair, beyond a resemblance in sound.',
 'Žodynas Jevgeņija nurodo kaip moterišką Jevgeņijs formą; per Eižens vardų šeima siejama su graikų eugenēs „gerai gimęs, kilmingas“. Šaltinis paliudija konkretų moteriškos ir vyriškos formų ryšį, o ne vien skambesio panašumą.',
 'Sõnaraamat nimetab Jevgeņijat Jevgeņijsi naissoovormiks; Eižensi kaudu viib nimepere kreeka sõnani eugenēs, hästi sündinud või õilsast soost. Allikas dokumenteerib kindla nais- ja meesvormi paari, mitte pelgalt kõlalist sarnasust.'
],[
 'Jevgeņija katalogā minēta Rēzeknē 1877. gadā un kalendārā 1899. gadā. Šie datējumi pieder tieši sieviešu formai. Jevgeņijs agrākās kalendāra liecības nepārvēršas par Jevgeņija ieviešanas gadu.',
 'Jevgeņija каталог отмечает в Резекне в 1877 году и в календаре в 1899 году. Обе даты относятся именно к женской форме. Более ранние календарные свидетельства Jevgeņijs не становятся годом введения Jevgeņija.',
 'The catalogue records Jevgeņija in Rēzekne in 1877 and in the calendar in 1899. These dates belong specifically to the feminine form. Earlier calendar evidence for Jevgeņijs does not become an introduction date for Jevgeņija.',
 'Katalogas Jevgeņija mini Rėzeknėje 1877 metais ir kalendoriuje 1899 metais. Šios datos priklauso būtent moteriškai formai. Ankstesni Jevgeņijs kalendoriaus liudijimai netampa Jevgeņija įvedimo metais.',
 'Kataloog märgib Jevgeņija Rēzeknes 1877. aastal ja kalendris 1899. aastal. Need aastad kuuluvad just naissoovormile. Jevgeņijsi varasemad kalendrikirjed ei muutu Jevgeņija kasutuselevõtu aastaks.'
],1899);
add('Augenija',[catalogue('Augenija'),catalogue('Eižens')],[
 'Augenija vārdnīcā tieši saistīta ar Eiženija, kas pieder grieķu eugenēs vārdu saimei. Pamata nozīme ir «labi dzimusi, dižciltīga». Šeit saikni pamato vārdnīcas norāde, nevis pieņēmums, kas balstīts vienīgi sākuma patskaņa līdzībā.',
 'Augenija словарь прямо связывает с Eiženija из семьи греческого eugenēs. Основное значение — «благородного рождения». Основанием для связи служит словарное указание, а не предположение по одному лишь сходству начального гласного.',
 'The dictionary explicitly relates Augenija to Eiženija in the Greek eugenēs family, with the basic sense well-born or noble. The relationship rests on a dictionary cross-reference rather than an inference from the opening vowel alone.',
 'Žodynas Augenija tiesiogiai sieja su Eiženija iš graikų eugenēs vardų šeimos. Pagrindinė reikšmė — „gerai gimusi, kilminga“. Ryšį pagrindžia žodyno nuoroda, o ne vien pradžios balsių panašumu paremta prielaida.',
 'Sõnaraamat seob Augenija otseselt Eiženijaga kreeka eugenēs’e nimeperest, mille põhitähendus on hästi sündinud või õilsast soost. Seos põhineb sõnaraamatu ristviitel, mitte ainult algusvokaali sarnasusest tehtud oletusel.'
],[
 'Šīs saimes vietējo vēsturi ilustrē vīriešu forma Eižens: tā reģistrēta Rīgā 1869. gadā un kalendārā 1884. gadā. Tie ir radniecīgās formas datējumi. Augenija šķirklis tādu datētu agrīnu liecību nedod, tādēļ tos nevar izmantot kā Augenija pirmā pieraksta gadus.',
 'Местную историю этой семьи иллюстрирует мужская форма Eižens: запись в Риге 1869 года и календарь 1884 года. Это даты родственной формы. Статья Augenija не даёт такого раннего датированного свидетельства, поэтому эти годы нельзя объявлять первыми записями Augenija.',
 'The family’s Latvian history is illustrated by masculine Eižens, recorded in Riga in 1869 and in the calendar in 1884. Those are dates for the related form. The Augenija entry supplies no comparable early dated attestation, so these years cannot be presented as its first records.',
 'Šios šeimos istoriją Latvijoje iliustruoja vyriškas Eižens: įrašas Rygoje 1869 metais ir kalendoriuje 1884 metais. Tai giminingos formos datos. Augenija straipsnis panašaus ankstyvo datuoto liudijimo nepateikia, todėl šie metai negali būti vadinami pirmaisiais Augenija įrašais.',
 'Nimepere Läti ajalugu näitlikustab meesvorm Eižens, mis on kirjas Riias 1869. ja kalendris 1884. aastal. Need on sugulasvormi aastad. Augenija artikkel ei anna samalaadset varast dateeritud tõendit, mistõttu need aastad ei ole Augenija esmakirjed.'
]);
for(const [name,peer,page] of [['Jevgēnijs','Jevgeņijs',91],['Jevgēnija','Jevgeņija',78]])add(name,[manual+'#page='+page,catalogue(peer),catalogue('Eižens')],[
 `${name} nav tikai minējums pēc rakstības līdzības: krievu īpašvārdu atveides rokasgrāmata šo formu dod līdzās ${peer} kā viena krievu personvārda atveidojumu. Šādi dokumentētā saikne ved pie Eižens saimes un grieķu eugenēs, «labi dzimis, dižciltīgs».`,
 `${name} подтверждается не одним сходством написаний: справочник передачи русских имён приводит эту форму рядом с ${peer} как варианты одного русского личного имени. Документированная связь ведёт к семье Eižens и греческому eugenēs, «благородного рождения».`,
 `${name} is supported by more than spelling resemblance: the Russian-name rendering manual lists it alongside ${peer} as renderings of the same Russian personal name. That documented link connects it to the Eižens family and Greek eugenēs, well-born or noble.`,
 `${name} ryšys pagrįstas ne vien rašybos panašumu: rusiškų vardų perteikimo vadovas šią formą pateikia greta ${peer} kaip to paties rusiško asmenvardžio variantus. Paliudytas ryšys veda į Eižens šeimą ir graikų eugenēs „gerai gimęs, kilmingas“.`,
 `${name} seos ei põhine ainult sarnasel kirjapildil: vene nimede edasiandmise käsiraamat esitab selle kõrvuti vormiga ${peer} sama vene isikunime vastetena. Dokumenteeritud seos viib Eižensi nimeperre ja kreeka sõnani eugenēs, hästi sündinud või õilsast soost.`
],[
 `1993. gada rokasgrāmatas tabulā ir tieši ${name} rakstība. Tā ir konkrēta liecība par vārda rakstības tradīciju, taču ne dzimšanas reģistrs vai kalendāra ieviešanas dokuments. Agrākus ${peer} datējumus tādēļ nepārceļ uz šo formu.`,
 `В таблице справочника 1993 года стоит именно написание ${name}. Это конкретное свидетельство традиции передачи имени, но не запись о рождении и не документ его введения в календарь. Ранние даты ${peer} поэтому не переносятся на эту форму.`,
 `The 1993 manual’s table contains the exact spelling ${name}. It is a concrete record of a name-rendering tradition, rather than a birth register or a calendar-introduction document. Earlier dates for ${peer} are therefore not transferred to this form.`,
 `1993 metų vadovo lentelėje pateikta būtent ${name} rašyba. Tai konkretus vardo perteikimo tradicijos liudijimas, bet ne gimimo registras ar įtraukimo į kalendorių dokumentas. Ankstesnės ${peer} datos šiai formai neperkeliamos.`,
 `1993. aasta käsiraamatu tabelis on täpne kirjapilt ${name}. See on konkreetne nimede edasiandmise tava tõend, mitte sünniregister ega kalendrisse võtmise dokument. Vormi ${peer} varasemaid aastaarve sellele seetõttu üle ei kanta.`
]);
