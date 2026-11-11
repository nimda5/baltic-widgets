// 13 November: country-scoped Lithuanian and Estonian histories.
export const historiesLithuanianR12={},historiesEstonianR12={};
const langs=['lv','ru','en','lt','et'];
function add(target,name,sources,origin,story){target[name]={sources,text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i],story[i]]]))};}
const guide=n=>'https://www.tevu-darzelis.lt/vaiku-vardai/'+n+'/';
const salys='https://tautosmenta.lt/wp-content/uploads/lituanistika/Salys_1983_LT.pdf#page=317';
add(historiesLithuanianR12,'Arkadijus',[guide('arkadijus'),'https://www.lnb.lt/renginiai/14670-aktorius-be-kaukes-susitikimas-su-arkadijumi-vinokuru-kulturos-naktis-2026'],[
 'Arkadijus saistīts ar grieķu Arkadios, «no Arkādijas». Arkādija ir vēsturisks Grieķijas novads, tādēļ pamatā ir norāde uz vietu. Šī nozīme nepierāda, ka katra vārda nesēja dzimta nāktu tieši no šā novada.',
 'Arkadijus связано с греческим Arkadios, «из Аркадии». Аркадия — историческая область Греции, поэтому в основе имени лежит указание на место. Значение не доказывает, что семья каждого носителя происходит из этой области.',
 'Arkadijus is connected with Greek Arkadios, from Arcadia. Arcadia is a historical region of Greece, so the name’s basis is geographical. That meaning does not establish an Arcadian ancestry for every person who bears the name.',
 'Arkadijus siejamas su graikų Arkadios „iš Arkadijos“. Arkadija yra istorinis Graikijos kraštas, tad vardo pagrindas — vietovės nuoroda. Ši reikšmė nereiškia, kad kiekvieno vardo turėtojo šeima kilusi būtent iš to krašto.',
 'Arkadijus on seotud kreeka nimega Arkadios, Arkaadiast pärit. Arkaadia on ajalooline Kreeka piirkond, seega on nime alus kohamääratlus. See tähendus ei tõesta iga nimekandja perekonna päritolu Arkaadiast.'
],[
 'Lietuvas Nacionālā bibliotēka 2026. gada 12. jūnijā izziņoja vakaru «Aktorius be kaukės» ar Arkadijus Vinokuras. Programma viņu iepazīstināja kā aktieri un pantomīmas meistaru ar pieredzi Zviedrijas Karaliskajā dramatiskajā teātrī un Eiropas cirkos.',
 'Национальная библиотека Литвы анонсировала на 12 июня 2026 года вечер «Aktorius be kaukės» с Arkadijus Vinokuras. Программа представляла его как актёра и мастера пантомимы, работавшего в Королевском драматическом театре Швеции и европейских цирках.',
 'Lithuania’s National Library announced the evening Aktorius be kaukės with Arkadijus Vinokuras for 12 June 2026. Its programme presented him as an actor and mime artist whose experience included Sweden’s Royal Dramatic Theatre and European circuses.',
 'Lietuvos nacionalinė biblioteka 2026 metų birželio 12 dienai paskelbė vakarą „Aktorius be kaukės“ su Arkadijumi Vinokuru. Programa pristatė jį kaip aktorių ir pantomimos meistrą, dirbusį Švedijos karališkajame dramos teatre ir Europos cirkuose.',
 'Leedu Rahvusraamatukogu kuulutas 12. juuniks 2026 välja õhtu Aktorius be kaukės Arkadijus Vinokurasega. Kavas tutvustati teda näitleja ja pantomiimikunstnikuna, kelle kogemuste hulka kuulusid Rootsi Kuninglik Draamateater ja Euroopa tsirkused.'
]);
add(historiesLithuanianR12,'Eirimė',[guide('eirime'),salys],[
 'Eirimė lietuviešu vārdu ceļvedī skaidrota kā divcelmu vārds: ei- salīdzināts ar eiti, «iet», bet rim- ar rimti un ramintis, «rimties, nomierināties». Tie ir atsevišķu daļu salīdzinājumi; no tiem nav jāveido viens izdomāts teikums kā precīza vārda nozīme.',
 'Eirimė литовский справочник объясняет как двухосновное имя: ei- сопоставляет с eiti, «идти», а rim- с rimti и ramintis, «утихать, успокаиваться». Это сравнения отдельных частей; они не требуют придумывать единственную фразу как точный перевод всего имени.',
 'The Lithuanian guide explains Eirimė as a two-stem name: ei- is compared with eiti, to go, and rim- with rimti and ramintis, to grow calm. These are comparisons for individual elements, rather than a reason to invent one exact sentence translating the whole name.',
 'Vardų žinynas Eirimę aiškina kaip lietuvių dvikamienį vardą: ei- sieja su eiti, o rim- su rimti ir ramintis. Tai atskirų dėmenų palyginimai; iš jų nereikia kurti vieno išgalvoto sakinio kaip tikslaus viso vardo vertimo.',
 'Leedu nimejuhend seletab Eirimėt kahe tüvega nimena: ei- seotakse sõnaga eiti, minema, ning rim- sõnadega rimti ja ramintis, rahunema. Need on üksikosade võrdlused, mitte alus kogu nime üheks täpseks väljamõeldud lauseks tõlkimisele.'
],[
 '1964. gada Čikāgas izdevuma «Tikiu Dievą» vārdu kalendārā Eirimė dota 13. novembrī kopā ar īsformu Eira. A. Saļa un priestera Stasys Yla veidoto sarakstu pārpublicēja Saļa rakstu otrajā sējumā 1983. gadā. Šī liecība datē publikāciju, nevis vārda radīšanu.',
 'Календарь имён в чикагском издании «Tikiu Dievą» 1964 года помещает Eirimė на 13 ноября вместе с краткой формой Eira. Список А. Салиса и священника Stasys Yla перепечатан во втором томе трудов Салиса в 1983 году. Это дата публикации, а не создания имени.',
 'The name calendar in the 1964 Chicago publication Tikiu Dievą places Eirimė on 13 November with short form Eira. The list by A. Salys and priest Stasys Yla was reprinted in the second volume of Salys’s writings in 1983. This dates a publication, not the name’s invention.',
 '1964 metų Čikagos leidinio „Tikiu Dievą“ vardų kalendoriuje Eirimė įrašyta lapkričio 13 dieną su trumpiniu Eira. A. Salio ir kunigo Stasio Ylos sudarytas sąrašas perspausdintas antrame Salio raštų tome 1983 metais. Ši data liudija publikaciją, o ne vardo sukūrimą.',
 '1964. aasta Chicago väljaande Tikiu Dievą nimekalender annab Eirimė 13. novembrile koos lühivormiga Eira. A. Salyse ja preester Stasys Yla koostatud loend avaldati uuesti Salyse kirjutiste teises köites 1983. aastal. See dateerib väljaannet, mitte nime loomist.'
]);
add(historiesLithuanianR12,'Norvydas',[guide('norvydas'),salys],[
 'Norvydas ir lietuviešu divcelmu vārds. Vārdu ceļvedis nor- salīdzina ar noras un norėti, «vēlēšanās, gribēt», bet vyd- ar vydo, «redzēja». Šādas seno vārdu daļas var aplūkot atsevišķi, nepārvēršot tās par solījumu vai rakstura aprakstu.',
 'Norvydas — литовское двухосновное имя. Справочник сопоставляет nor- с noras и norėti, «желание, хотеть», а vyd- с vydo, «увидел». Части старых имён можно рассматривать отдельно, не превращая их в обещание или характеристику человека.',
 'Norvydas is a Lithuanian two-stem name. The guide compares nor- with noras and norėti, wish and to want, and vyd- with vydo, saw. These old name elements can be discussed separately without turning them into a promise or a description of someone’s character.',
 'Norvydas — lietuvių dvikamienis vardas. Žinynas nor- sieja su noras ir norėti, o vyd- su vydo, „pamatė“. Senųjų vardų dėmenis galima aptarti atskirai, nepaverčiant jų pažadu ar žmogaus būdo apibūdinimu.',
 'Norvydas on leedu kahe tüvega nimi. Nimejuhend võrdleb nor-osa sõnadega noras ja norėti, soov ja tahtma, ning vyd-osa sõnaga vydo, nägi. Vanu nimeosi saab vaadelda eraldi, tegemata neist lubadust või inimese iseloomustust.'
],[
 'Norvydas ar īsformu Noras ierakstīts 13. novembrī 1964. gada «Tikiu Dievą» vārdu kalendārā. Šo A. Saļa un Stasys Yla sarakstu 1983. gadā pārpublicēja Saļa rakstos. Tas ir konkrēts drukāts vārda un tā īsformas lietojuma piemērs, nevis pierādījums par radīšanas gadu.',
 'Norvydas с краткой формой Noras записан на 13 ноября в календаре имён «Tikiu Dievą» 1964 года. Список А. Салиса и Stasys Yla перепечатали в трудах Салиса в 1983 году. Это конкретный печатный пример имени и его краткой формы, а не доказательство года их создания.',
 'Norvydas, with short form Noras, appears on 13 November in the 1964 Tikiu Dievą name calendar. This list by A. Salys and Stasys Yla was reprinted in Salys’s writings in 1983. It is a specific printed example of the name and its short form, rather than evidence of their year of creation.',
 'Norvydas su trumpiniu Noras įrašytas lapkričio 13 dieną 1964 metų „Tikiu Dievą“ vardų kalendoriuje. A. Salio ir Stasio Ylos sąrašas perspausdintas Salio raštuose 1983 metais. Tai konkretus spausdintas vardo ir jo trumpinio vartojimo pavyzdys, o ne jų sukūrimo metų įrodymas.',
 'Norvydas koos lühivormiga Noras on 13. novembril 1964. aasta Tikiu Dievą nimekalendris. A. Salyse ja Stasys Yla loend avaldati uuesti Salyse kirjutistes 1983. aastal. See on nime ja lühivormi konkreetne trükinäide, mitte nende loomisaasta tõend.'
]);
add(historiesLithuanianR12,'Eugenijus',[guide('eugenijus'),'https://www.behindthename.com/name/eugene','https://rasytojai.lt/rasytojai/alisanka-eugenijus/'],[
 'Eugenijus ir grieķu cilmes vārdu saimes lietuviešu forma. Ceļvedis norāda grieķu eugenios, bet plašākā saimes vēsture saistīta ar eugenēs, «labi dzimis, dižciltīgs». Dažādu valodu rakstības saglabā kopīgo pamatu, iegūstot savas galotnes.',
 'Eugenijus — литовская форма семьи имён греческого происхождения. Справочник приводит греческое eugenios; более широкая история семьи связана с eugenēs, «благородного рождения». В разных языках общий корень получил собственные окончания и написания.',
 'Eugenijus is a Lithuanian form in a Greek-derived name family. The guide gives Greek eugenios; the wider family’s history is connected with eugenēs, well-born or noble. Different languages preserve the shared basis while developing their own endings and spellings.',
 'Eugenijus — graikiškos kilmės vardų šeimos lietuviška forma. Žinynas pateikia graikų eugenios; platesnė šeimos istorija siejama su eugenēs „gerai gimęs, kilmingas“. Skirtingose kalbose bendras pagrindas įgijo savitas galūnes ir rašybą.',
 'Eugenijus on kreeka päritolu nimepere leedu vorm. Nimejuhend annab kreeka kuju eugenios; laiema nimepere ajalugu seostub sõnaga eugenēs, hästi sündinud või õilsast soost. Eri keeltes sai ühine alus oma lõpud ja kirjapildid.'
],[
 'Dzejnieks un tulkotājs Eugenijus Ališanka 1983. gadā pabeidza Viļņas Universitātes Matemātikas fakultāti. Lietuvas Rakstnieku savienības bibliogrāfijā viņa dzejas krājums «Lygiadienis» datēts ar 1991. gadu, bet «Peleno miestas» — ar 1995. gadu.',
 'Поэт и переводчик Eugenijus Ališanka в 1983 году окончил математический факультет Вильнюсского университета. Библиография Союза писателей Литвы датирует его сборник стихов «Lygiadienis» 1991 годом, а «Peleno miestas» — 1995 годом.',
 'Poet and translator Eugenijus Ališanka graduated from Vilnius University’s Mathematics Faculty in 1983. The Lithuanian Writers’ Union bibliography dates his poetry collection Lygiadienis to 1991 and Peleno miestas to 1995.',
 'Poetas ir vertėjas Eugenijus Ališanka 1983 metais baigė Vilniaus universiteto Matematikos fakultetą. Lietuvos rašytojų sąjungos bibliografijoje jo eilėraščių rinkinys „Lygiadienis“ datuojamas 1991 metais, o „Peleno miestas“ — 1995 metais.',
 'Luuletaja ja tõlkija Eugenijus Ališanka lõpetas 1983. aastal Vilniuse Ülikooli matemaatikateaduskonna. Leedu Kirjanike Liidu bibliograafia dateerib tema luulekogu Lygiadienis aastaga 1991 ja Peleno miestas aastaga 1995.'
]);
const shortOrigin=n=>[
 `${n} igauņu valodas vārdnīcas šķirklī saistīts gan ar Kristjan, gan ar Kristofer īsformām. Šīs līnijas ir atšķirīgas: Kristjan ved pie Christianus, «kristietis», bet Kristofer pie vārda ar nozīmi «Kristus nesējs». Viena izcelsmes līnija nav jāattiecina uz katru vārda nesēju.`,
 `Эстонская словарная статья связывает ${n} с краткими формами и Kristjan, и Kristofer. Это разные линии: Kristjan ведёт к Christianus, «христианин», а Kristofer — к имени со значением «несущий Христа». Не нужно выбирать один путь для всех носителей имени.`,
 `The Estonian dictionary entry connects ${n} with short forms of both Kristjan and Kristofer. These are distinct lines: Kristjan leads to Christianus, Christian, while Kristofer leads to a name meaning Christ-bearer. One route need not be assigned to every bearer.`,
 `Estų kalbos žodyno straipsnis ${n} sieja ir su Kristjan, ir su Kristofer trumpiniais. Tai skirtingos linijos: Kristjan veda į Christianus „krikščionis“, o Kristofer — į vardą, reiškiantį „Kristaus nešėjas“. Vieno kelio nereikia priskirti visiems vardo turėtojams.`,
 `Eestikeelne sõnaraamatuartikkel seob ${n} nii Kristjani kui ka Kristoferi lühivormidega. Need on eri liinid: Kristjan viib nimele Christianus, kristlane, Kristofer aga nimele tähendusega Kristuse kandja. Üht teed ei pea omistama igale nimekandjale.`
];
add(historiesEstonianR12,'Kristo',['https://en.wiktionary.org/wiki/Kristo#Estonian','https://www.behindthename.com/name/kristo','https://www.behindthename.com/name/christian','https://www.behindthename.com/name/christopher','https://www.tlu.ee/riho-patsi-koolimuusika-fond-tunnustab-2013-aasta-laureaate'],shortOrigin('Kristo'),[
 'Tallinas Universitātes 2013. gada laureātu paziņojums stāsta par ģitāristu un pedagogu Kristo Käo. Viņš 2007. gadā izveidoja interaktīvu ģitārspēles mācību portālu. Paziņojumā viņa darbs saistīts arī ar mūzikas skolotāju tālākizglītību un ģitāras ienākšanu skolas stundās.',
 'Сообщение Таллиннского университета о лауреатах 2013 года рассказывает о гитаристе и педагоге Kristo Käo. В 2007 году он создал интерактивный портал обучения гитаре. Университет также отмечает его работу по подготовке учителей музыки и введению гитары в школьные уроки.',
 'Tallinn University’s announcement of the 2013 laureates describes guitarist and teacher Kristo Käo. In 2007 he created an interactive guitar-learning portal. The announcement also connects his work with music-teacher training and bringing guitar playing into school lessons.',
 'Talino universiteto pranešimas apie 2013 metų laureatus pasakoja apie gitaristą ir pedagogą Kristo Käo. 2007 metais jis sukūrė interaktyvų mokymosi groti gitara portalą. Universitetas taip pat mini jo darbą rengiant muzikos mokytojus ir įtraukiant gitarą į mokyklos pamokas.',
 'Tallinna Ülikooli teade 2013. aasta laureaatidest tutvustab kitarristi ja pedagoogi Kristo Käod. Ta lõi 2007. aastal interaktiivse kitarriõppeportaali. Teade seob tema töö ka muusikaõpetajate täienduskoolituse ja kitarrimängu jõudmisega koolitundidesse.'
]);
add(historiesEstonianR12,'Risto',['https://en.wiktionary.org/wiki/Risto#Estonian','https://www.behindthename.com/name/risto','https://www.behindthename.com/name/christian','https://www.behindthename.com/name/christopher','https://vanemuine.ee/en/people/risto-joost/'],shortOrigin('Risto'),[
 'Diriģents Risto Joost 2008. gadā ieguva maģistra grādu Stokholmas Karaliskajā mūzikas augstskolā, orķestra diriģēšanu studējot pie Jorma Panula. Vanemuines teātris viņa darba sākumu mūzikas direktora un galvenā diriģenta amatā datē ar 2020. gada augustu.',
 'Дирижёр Risto Joost получил степень магистра в Королевской высшей музыкальной школе Стокгольма в 2008 году, изучая оркестровое дирижирование у Jorma Panula. Театр Vanemuine датирует начало его работы музыкальным руководителем и главным дирижёром августом 2020 года.',
 'Conductor Risto Joost earned a master’s degree at Stockholm’s Royal College of Music in 2008, studying orchestral conducting with Jorma Panula. Vanemuine Theatre dates the start of his work as its music director and chief conductor to August 2020.',
 'Dirigentas Risto Joost 2008 metais įgijo magistro laipsnį Stokholmo karališkojoje muzikos aukštojoje mokykloje, orkestriniam dirigavimui vadovaujant Jormai Panulai. Vanemuinės teatras jo darbo muzikos vadovu ir vyriausiuoju dirigentu pradžią datuoja 2020 metų rugpjūčiu.',
 'Dirigent Risto Joost omandas 2008. aastal Stockholmi Kuninglikus Muusikakõrgkoolis magistrikraadi, õppides orkestridirigeerimist Jorma Panula juhendamisel. Vanemuise teater dateerib tema töö alguse muusikajuhi ja peadirigendina 2020. aasta augustisse.'
]);
add(historiesEstonianR12,'Krister',['https://snl.no/Krister_-_mannsnamn','https://www.behindthename.com/name/krister','https://stat.ee/nimed/KRISTER'],[
 'Krister skandināvu vārdu tradīcijā ir Kristian forma; līdzās sastopamas Christer un Crister rakstības. Tālākais pamats ir latīņu Christianus un grieķu Christianos, «kristietis». Šī vārdu saime jāatšķir no Kristofer saimes ar nozīmi «Kristus nesējs».',
 'Krister в скандинавской традиции — форма Kristian; встречаются также написания Christer и Crister. Более дальняя основа — латинское Christianus и греческое Christianos, «христианин». Эту семью следует отличать от Kristofer со значением «несущий Христа».',
 'In Scandinavian naming tradition Krister is a form of Kristian, alongside the spellings Christer and Crister. Its older basis is Latin Christianus and Greek Christianos, Christian. This family is distinct from the Kristofer family meaning Christ-bearer.',
 'Skandinavų vardų tradicijoje Krister yra Kristian forma; vartojamos ir rašybos Christer bei Crister. Tolimesnis pagrindas — lotynų Christianus ir graikų Christianos „krikščionis“. Ši šeima skiriasi nuo Kristofer šeimos, kurios reikšmė „Kristaus nešėjas“.',
 'Skandinaavia nimetraditsioonis on Krister Kristiani vorm, mille kõrval esinevad kirjapildid Christer ja Crister. Vanem alus on ladina Christianus ja kreeka Christianos, kristlane. See nimepere erineb Kristoferi perest, mille tähendus on Kristuse kandja.'
],[
 'Konkrēts literārs lietojums ir Krister tēls Tarjei Vesaas 1946. gada darbā «Bleikeplassen». Tas ir norvēģu literatūras piemērs, nevis pierādījums par vārda ienākšanas laiku Igaunijā. Igaunijas lietojumu atsevišķi dokumentē valsts statistikas personvārdu katalogs.',
 'Конкретный литературный пример — персонаж Krister в произведении Tarjei Vesaas «Bleikeplassen» 1946 года. Это норвежская литература, а не свидетельство даты появления имени в Эстонии. Эстонское употребление отдельно подтверждает государственный каталог статистики имён.',
 'A specific literary use is the character Krister in Tarjei Vesaas’s 1946 work Bleikeplassen. This is an example from Norwegian literature, not evidence for when the name entered Estonia. Estonian use is separately documented by the national name-statistics catalogue.',
 'Konkretus literatūrinis pavyzdys — Krister veikėjas Tarjei Vesaaso 1946 metų kūrinyje „Bleikeplassen“. Tai norvegų literatūra, o ne vardo atsiradimo Estijoje datos liudijimas. Vartojimą Estijoje atskirai dokumentuoja valstybinis vardų statistikos katalogas.',
 'Konkreetne kirjanduslik näide on Kristeri tegelaskuju Tarjei Vesaasi 1946. aasta teoses Bleikeplassen. See on Norra kirjanduse näide, mitte tõend nime Eestisse jõudmise aja kohta. Eesti kasutust dokumenteerib eraldi riiklik nimestatistika kataloog.'
]);
