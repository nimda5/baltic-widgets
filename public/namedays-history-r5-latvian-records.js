// Exact-spelling catalogue evidence; dates retain the precision and scope of the source.
export const historiesLatvianRecords={};
const languages=['lv','ru','en','lt','et'];
function add(name,origin,record,extra=[]){historiesLatvianRecords[name]={sources:['https://www.izpetnieks.lv/en/name/'+encodeURIComponent(name),...extra],text:Object.fromEntries(languages.map((l,i)=>[l,[origin[i],record[i]]]))};}
add('Teiksma',[
 'Teiksma saistīta ar latviešu sugasvārdu teiksma — teika, leģenda. Tas ļauj vārdā sadzirdēt stāstīšanas un iztēles tēlu; avots tomēr nedod atsevišķu, viennozīmīgu personvārda tulkojumu vai droši nosauktu tā radītāju.',
 'Teiksma связано с латышским нарицательным teiksma — сказание, легенда. В имени слышен образ рассказывания и воображения; при этом источник не даёт отдельного однозначного перевода личного имени и не называет достоверно его создателя.',
 'Teiksma is associated with the Latvian common noun teiksma, a tale or legend. It brings an image of storytelling and imagination into the name, although the source gives neither a separate fixed translation of the personal name nor a securely identified creator.',
 'Teiksma siejama su latvių bendriniu žodžiu teiksma — padavimas, legenda. Varde girdimas pasakojimo ir vaizduotės įvaizdis, tačiau šaltinis nepateikia atskiro vienareikšmio asmenvardžio vertimo ar patikimai įvardyto jo kūrėjo.',
 'Teiksma seostub läti üldnimega teiksma, muistend või legend. Nimes kõlab jutustamise ja kujutluse kujund, kuigi allikas ei anna eesnimele eraldi kindlat tõlget ega nimeta selle tõendatud loojat.'
],[
 'Siliņa vārdnīcas kataloga šķirklis min vārda lietojumu Raunā 20. gadsimta otrajā ceturksnī un kalendāra ierakstu 1928. gadā. Rauna šeit ir liecības vieta. Ceturkšņa datējums saglabā avota aptuvenību un nenozīmē konkrētu dzimšanas vai vārda radīšanas gadu.',
 'Каталожная запись по словарю Силиньша указывает употребление в Рауне во второй четверти XX века и календарную запись 1928 года. Рауна здесь — место свидетельства. Четверть века сохраняет приблизительность источника и не превращается в точный год рождения или создания имени.',
 'The catalogue entry citing Siliņš records use in Rauna in the second quarter of the twentieth century and a calendar entry in 1928. Rauna is the location of the record. The quarter-century dating retains the source’s precision rather than supplying an invented birth or creation year.',
 'Siliņšo žodyną cituojantis katalogas nurodo vartoseną Raunoje XX amžiaus antrąjį ketvirtį ir 1928 metų kalendoriaus įrašą. Rauna yra liudijimo vieta. Ketvirčio datavimas išsaugo šaltinio apytikslumą ir netampa išgalvotais gimimo ar vardo sukūrimo metais.',
 'Siliņši sõnaraamatut vahendav kataloog märgib kasutust Raunas 20. sajandi teisel veerandil ja kalendrikannet 1928. aastal. Rauna on kirjapaneku koht. Veerandsajandi täpsus säilitab allika määramatuse ega muutu oletuslikuks sünni- või loomisaastaks.'
]);
add('Daile',[
 'Daile ir latviešu pašu valodas vārds, kas saistīts ar daile — skaistums, daiļums. Šī forma ir dokumentēta atsevišķi no Daila un Dailis. Kopīgais valodiskais tēls ļauj tās salīdzināt, saglabājot katras formas atsevišķās liecības.',
 'Daile — имя на основе собственного латышского слова daile, красота, прекрасное. Эта форма документирована отдельно от Daila и Dailis. Общий языковой образ позволяет их сопоставлять, сохраняя отдельные свидетельства каждого написания.',
 'Daile comes from the Latvian word daile, beauty or loveliness. This form is documented separately from Daila and Dailis. Their shared linguistic image permits comparison while each spelling retains its own recorded evidence.',
 'Daile remiasi latvių žodžiu daile — grožis, dailumas. Ši forma dokumentuota atskirai nuo Daila ir Dailis. Bendras kalbinis įvaizdis leidžia jas lyginti, išsaugant kiekvienos rašybos atskirus liudijimus.',
 'Daile lähtub läti sõnast daile, ilu või kaunidus. Seda vormi on dokumenteeritud eraldi Dailast ja Dailisest. Ühine keeleline kujund lubab neid võrrelda, säilitades iga kirjapildi oma tõendid.'
],[
 'Siliņa vārdnīcas kataloga šķirklis Dailei dod 1877. gada kalendāra ierakstu un 1922. gada lietojuma liecību Rīgā. Kalendāra ieteikums šajā apkopojumā ir agrāks par minēto personas lietojumu. Neviens no šiem diviem gadiem nav dots kā vārda radīšanas gads.',
 'Каталог по словарю Силиньша даёт для Daile календарную запись 1877 года и свидетельство употребления в Риге в 1922-м. Календарная рекомендация в этом собрании предшествует приведённому личному употреблению. Ни один из годов не назван годом создания имени.',
 'The catalogue citing Siliņš gives Daile a calendar entry in 1877 and a record of use in Riga in 1922. In this collection, the calendar recommendation precedes the cited personal use. Neither date is identified as the year the name was created.',
 'Siliņšo žodyną cituojantis katalogas Dailei pateikia 1877 metų kalendoriaus įrašą ir vartosenos Rygoje 1922 metais liudijimą. Šiame rinkinyje kalendoriaus rekomendacija ankstesnė už nurodytą asmens vartoseną. Nė viena data neįvardyta vardo sukūrimo metais.',
 'Siliņši sõnaraamatut vahendav kataloog annab Dailele 1877. aasta kalendrikande ja 1922. aasta kasutusteate Riiast. Selles kogus on kalendrisoovitus varasem kui viidatud isikukasutus. Kumbagi aastat ei esitata nime loomise ajana.'
]);
add('Marga',[
 'Marga Siliņa vārdnīcas katalogā norādīta uz Margaritu un salīdzināta ar latviešu darbības vārdu margot — mirdzēt. Tās ir divas dažāda rakstura saiknes: norāde uz citu personvārdu un valodisks salīdzinājums. Margot nav apstiprināts kā droša Marga sakne.',
 'Marga в каталоге по словарю Силиньша отсылает к Margarita и сопоставляется с латышским глаголом margot — сиять. Это связи разного рода: отсылка к другому личному имени и языковое сравнение. Margot не подтверждено как достоверный корень Marga.',
 'The catalogue citing Siliņš refers Marga to Margarita and compares it with Latvian margot, to shine. These are different kinds of connection: a personal-name cross-reference and a linguistic comparison. Margot is not established as the secure root of Marga.',
 'Siliņšo žodyną cituojantis katalogas Marga nukreipia į Margarita ir lygina su latvių veiksmažodžiu margot — spindėti. Tai skirtingos sąsajos: nuoroda į kitą asmenvardį ir kalbinis palyginimas. Margot nėra patvirtinta kaip patikima Marga šaknis.',
 'Siliņši sõnaraamatut vahendav kataloog viitab Marga juures Margaritale ning võrdleb nime läti tegusõnaga margot, särama. Need on eri liiki seosed: viide teisele eesnimele ja keeleline võrdlus. Margot ei ole kinnitatud Marga kindla tüvena.'
],[
 'Katalogs pieļauj agrīnu liecību 18. gadsimtā un norāda 1899. gada kalendāra ierakstu. Gadsimta norāde paliek aptuvena: tajā nav konkrēta gada vai droši nosauktas pirmās Margas. Kalendāra datums rāda vārda publicēšanu, nevis tā izdomāšanu.',
 'Каталог допускает раннее свидетельство XVIII века и указывает календарную запись 1899 года. Век остаётся приблизительной датировкой: здесь нет конкретного года или достоверно названной первой Марги. Календарная дата свидетельствует о публикации имени, а не о его изобретении.',
 'The catalogue allows a possible early record in the eighteenth century and gives a calendar entry in 1899. The century remains an approximate date, with no specific year or securely identified first Marga. The calendar date records publication of the name rather than its invention.',
 'Kataloge numanomas ankstyvas XVIII amžiaus liudijimas ir nurodomas 1899 metų kalendoriaus įrašas. Amžius lieka apytiksliu datavimu: konkrečių metų ar patikimai įvardytos pirmosios Margos čia nėra. Kalendoriaus data liudija vardo paskelbimą, o ne išradimą.',
 'Kataloog lubab võimalikku varast teadet 18. sajandist ja annab kalendrikande aastast 1899. Sajand jääb ligikaudseks dateeringuks: täpset aastat ega kindlalt tuvastatud esimest Margat siin pole. Kalendriaasta tõendab nime avaldamist, mitte väljamõtlemist.'
]);
add('Anfija',[
 'Anfija Siliņa vārdnīcas kataloga skaidrojumā balstās grieķu vārdā anthos — zieds. Zieda tēls ir valodiska asociācija, kas nepiedēvē visām vārda nesējām vienādas īpašības.',
 'Anfija в каталоге по словарю Силиньша объясняется через греческое anthos — цветок. Цветочный образ — языковая ассоциация, которая не приписывает всем носительницам одинаковые качества.',
 'The catalogue citing Siliņš explains Anfija through Greek anthos, flower. The flower image is a linguistic association, without assigning identical qualities to all its bearers.',
 'Siliņšo žodyną cituojantis katalogas Anfija aiškina per graikų anthos — žiedas. Žiedo įvaizdis yra kalbinė asociacija, nepriskirianti visoms vardo turėtojoms vienodų savybių.',
 'Siliņši sõnaraamatut vahendav kataloog seletab Anfijat kreeka sõnaga anthos, õis. Õie kujund on keeleline seos, mis ei omista kõigile nimekandjatele ühesuguseid omadusi.'
],[
 'Šķirklis dod kalendāra ierakstu 1899. gadā un lietojuma liecību 20. gadsimta otrajā ceturksnī. Šīs ziņas attiecas uz Anfiju katalogā; ceturkšņa norāde netiek pārvērsta precīzā gadā. Tās rāda vārda apriti, nedatējot tā radīšanu.',
 'Запись даёт календарное упоминание 1899 года и свидетельство употребления во второй четверти XX века. Данные относятся к Anfija в каталоге; четверть века не превращается в выдуманный точный год. Они показывают обращение имени, не датируя его создание.',
 'The entry gives a calendar record in 1899 and evidence of use in the second quarter of the twentieth century. These details concern Anfija in the catalogue; the quarter-century date is retained. They document circulation of the name without dating its creation.',
 'Straipsnyje pateikiamas 1899 metų kalendoriaus įrašas ir vartosenos XX amžiaus antrąjį ketvirtį liudijimas. Duomenys skirti katalogo Anfija; ketvirčio datavimas išlaikomas. Jie rodo vardo apyvartą, nenustatydami jo sukūrimo datos.',
 'Kirje annab kalendriteate aastast 1899 ning kasutustõendi 20. sajandi teisest veerandist. Need andmed käivad kataloogi Anfija kohta; veerandsajandi dateering säilib. Need näitavad nime käibimist, määramata selle loomisaega.'
]);
add('Zīle',[
 'Zīle avotā iespējams saistīta ar latviešu sugasvārdu zīle — ozola auglis. Šī vārda saikne ir pieļauta, taču konkrētais vārda izvēles motīvs nav dots. Tāpēc ozola tēls paliek iespējams skaidrojums, nevis zināma katras Zīles ģimenes vēsture.',
 'Zīle в источнике предположительно связано с латышским zīle — жёлудь. Такая связь допускается, но конкретный мотив выбора имени не указан. Поэтому образ дуба остаётся возможным объяснением, а не установленной историей каждой семьи, выбравшей Zīle.',
 'The source tentatively connects Zīle with Latvian zīle, an acorn. The word connection is suggested, but the actual naming motivation is not supplied. The oak image therefore remains a possible explanation rather than the known history of every family choosing Zīle.',
 'Šaltinyje Zīle galbūt siejama su latvių zīle — gilė. Toks žodžio ryšys numanomas, tačiau konkretus vardo pasirinkimo motyvas nepateiktas. Ąžuolo įvaizdis lieka galimu paaiškinimu, o ne nustatyta kiekvienos Zīle pasirinkusios šeimos istorija.',
 'Allikas seob Zīlet oletuslikult läti sõnaga zīle, tammetõru. Sõnaseos on pakutud, kuid tegelikku nimevaliku motiivi pole antud. Tamme kujund jääb seega võimalikuks seletuseks, mitte iga Zīle valinud pere teadaolevaks looks.'
],[
 'Siliņa vārdnīcas katalogā dots vēsturisks datējums — 1544. gads — un vēlāk kalendāra ieraksts 1882. gadā. Tie ir divi atšķirīgi pierādījumi: agrīna vārda liecība un tā vieta drukātajā kalendārā. Senākais minētais datums nav vārda radīšanas apliecinājums.',
 'Каталог по словарю Силиньша приводит историческую дату — 1544 год — и более позднюю календарную запись 1882 года. Это разные свидетельства: ранняя фиксация имени и его место в печатном календаре. Самая ранняя приведённая дата не подтверждает создание имени.',
 'The catalogue citing Siliņš gives a historical date of 1544 and a later calendar entry in 1882. These are distinct pieces of evidence: an early record of the name and its place in a printed calendar. The earliest cited date is not evidence of its invention.',
 'Siliņšo žodyną cituojantis katalogas pateikia istorinę datą — 1544 metus — ir vėlesnį 1882 metų kalendoriaus įrašą. Tai skirtingi liudijimai: ankstyvas vardo užrašymas ir jo vieta spausdintame kalendoriuje. Ankstyviausia nurodyta data nepatvirtina vardo sukūrimo.',
 'Siliņši sõnaraamatut vahendav kataloog annab ajalooliseks daatumiks 1544 ning hilisemaks kalendrikandeks 1882. Need on eri tõendid: varane nimeteade ja koht trükikalendris. Varaseim viidatud aasta ei tõenda nime loomist.'
]);
add('Laimdots',[
 'Laimdots Siliņa vārdnīcas katalogā dots saimē ar Laimdotu, kuras skaidrojums ir «Laimas dota». Vīriešu formas salīdzinājums ar šo saimi ir dokumentēts. Sieviešu literārā tēla Laimdotas notikumi tomēr nav vīrieša Laimdota biogrāfija.',
 'Laimdots в каталоге по словарю Силиньша включён в семью Laimdota с объяснением «данная Лаймой». Связь мужской формы с этой семьёй документирована. При этом события литературной героини Лаймдоты не являются биографией мужчины Laimdots.',
 'The catalogue citing Siliņš places Laimdots in the family of Laimdota, explained as “given by Laima”. The masculine form’s comparison with this family is documented. Events belonging to the female literary character Laimdota remain her own story.',
 'Siliņšo žodyną cituojantis katalogas Laimdots įtraukia į Laimdota šeimą, aiškinamą „Laimos duota“. Vyriškos formos sąsaja su šia šeima dokumentuota. Literatūrinės veikėjos Laimdotos įvykiai lieka jos pačios istorija.',
 'Siliņši sõnaraamatut vahendav kataloog paigutab Laimdotsi Laimdota nimeperre, mille seletus on „Laima antud“. Meessoovormi seos nimeperega on dokumenteeritud. Kirjandusliku naistegelase Laimdota sündmused jäävad tema enda looks.'
],[
 'Katalogā šai formu grupai dots 1908. gada kalendāra ieraksts un 1922. gada lietojuma liecība. Tie ir grupas datējumi: tie nedod drošu pamatu apgalvot, ka tieši rakstījums Laimdots pirmoreiz parādījās vienā no šiem gadiem.',
 'Для группы форм каталог приводит календарную запись 1908 года и свидетельство употребления 1922 года. Это групповые датировки: они не позволяют достоверно утверждать, что именно написание Laimdots впервые появилось в одном из этих годов.',
 'For the group of forms, the catalogue gives a calendar entry in 1908 and a record of use in 1922. These are group dates: they do not establish that the exact spelling Laimdots first appeared in either year.',
 'Formų grupei katalogas pateikia 1908 metų kalendoriaus įrašą ir 1922 metų vartosenos liudijimą. Tai grupės datos: jos neįrodo, kad būtent Laimdots rašyba pirmą kartą pasirodė vienais iš šių metų.',
 'Vormirühmale annab kataloog 1908. aasta kalendrikande ja 1922. aasta kasutusteate. Need on rühma daatumid: need ei kinnita, et just kirjapilt Laimdots ilmus esimest korda kummalgi neist aastatest.'
]);
