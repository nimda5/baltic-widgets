// Exact spelling bridges and dated records are kept distinct from family history.
export const historiesLatvianR19={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n),btn='https://www.behindthename.com/name/elizabeth';
const origin=[
 '{route} Šīs vārdu saimes pamatā ir senebreju ēlīšeba, ko parasti skaidro kā «mans Dievs ir zvērests». Grieķu Elisabet ir svarīga saimes vēsturiskā forma. Tas ir vārda cilmes skaidrojums, nevis tā nesēja rakstura apraksts.',
 '{route} В основе этой семьи имён — древнееврейское ēlīšeba, обычно объясняемое как «мой Бог — клятва». Греческое Elisabet — важная историческая форма семьи. Это объяснение происхождения имени, а не описание характера носителя.',
 '{route} This name family rests on Hebrew ēlīšeba, usually explained as my God is an oath. Greek Elisabet is an important historical form in the family. This describes the name’s origin rather than the character of its bearer.',
 '{route} Šios vardų šeimos pagrindas yra hebrajų ēlīšeba, paprastai aiškinamas „mano Dievas yra priesaika“. Graikų Elisabet yra svarbi istorinė šeimos forma. Tai vardo kilmės aiškinimas, o ne jo turėtojo būdo aprašymas.',
 '{route} Selle nimepere aluseks on heebrea ēlīšeba, mida seletatakse tavaliselt kui minu Jumal on vanne. Kreeka Elisabet on nimepere oluline ajalooline kuju. See kirjeldab nime päritolu, mitte nimekandja iseloomu.'
];
function add(name,route,story,extra=[],year){historiesLatvianR19[name]={sources:[cat(name),cat('Elizabete'),btn,...extra],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i].replace('{route}',route[i]),story[i]]])),...(year?{calendar_entry_year:year}:{})};}
const familyStory=[
 'Siliņa vārdnīcas 1990. gada izdevuma Elizabete šķirklī minēta 1252. gada liecība un 1892. gada kalendāra ieraksts. Tas dod vēsturisku atskaites punktu pilnajam pamatvārdam. Šie gadi nav automātiski visu tā īsformu vai citu valodu rakstību pirmie datējumi.',
 'В статье Elizabete словаря Силиньша 1990 года указаны свидетельство 1252 года и календарная запись 1892 года. Это историческая точка отсчёта для полного основного имени. Эти годы не становятся автоматически первыми датами всех его кратких форм и иноязычных написаний.',
 'The Elizabete entry in Siliņš’s 1990 dictionary cites a 1252 record and an 1892 calendar entry. This supplies a historical reference point for the full base name. Those years are not automatically the earliest dates of all its short forms or spellings in other languages.',
 '1990 metų Siliņšo žodyno Elizabete straipsnyje nurodyti 1252 metų liudijimas ir 1892 metų kalendoriaus įrašas. Tai istorinis atskaitos taškas pilnajam pamatiniam vardui. Šie metai automatiškai netampa visų jo trumpinių ar kitų kalbų rašybų pirmosiomis datomis.',
 'Siliņši 1990. aasta sõnaraamatu Elizabete kirje viitab 1252. aasta nimekirjele ja 1892. aasta kalendrikirjele. See annab ajaloolise pidepunkti pikale alusnimele. Need aastad ei ole automaatselt kõigi lühivormide või teiste keelte kirjapiltide esmadaatumid.'
];
add('Jeļizaveta',[
 'Jeļizaveta Siliņa vārdnīcā ir krievu un ukraiņu Elizabete saimes forma.',
 'Jeļizaveta у Силиньша — русская и украинская форма семьи Elizabete.',
 'Siliņš places Jeļizaveta in the Russian and Ukrainian branch of the Elizabete family.',
 'Siliņšas Jeļizaveta pateikia kaip rusų ir ukrainiečių Elizabete šeimos formą.',
 'Siliņš paigutab Jeļizaveta Elizabete nimepere vene ja ukraina harusse.'
],[
 'Precīzās formas Jeļizaveta liecību vārdnīca datē ar 1877. gadu Rēzeknē; kalendārā tā atzīmēta 1899. gadā. Abi datējumi pieder rakstībai ar ļ. Tie nav automātiski arī Jelizaveta vai citu līdzīgu formu datumi.',
 'Точная форма Jeļizaveta засвидетельствована у Силиньша в Резекне в 1877 году; календарная запись датирована 1899 годом. Обе даты относятся к написанию с ļ. Они не становятся автоматически датами Jelizaveta и других похожих форм.',
 'The dictionary records the exact form Jeļizaveta in Rēzekne in 1877 and in a calendar in 1899. Both dates belong to the spelling with ļ. They are not automatically dates for Jelizaveta or other similar forms.',
 'Žodynas tikslią Jeļizaveta formą paliudija Rėzeknėje 1877 metais, kalendoriuje — 1899 metais. Abi datos priklauso rašybai su ļ. Jos automatiškai netampa Jelizaveta ar kitų panašių formų datomis.',
 'Sõnaraamat registreerib täpse kuju Jeļizaveta Rēzeknes 1877. aastal ja kalendris 1899. aastal. Mõlemad daatumid käivad ļ-ga kirjapildi kohta. Need ei ole automaatselt Jelizaveta või teiste sarnaste kujude daatumid.'
],[],1899);
add('Jelizaveta',[
 'Jelizaveta LVA atveides datubāzē tieši atbilst ukraiņu Єлизавета, starptautiski Yelyzaveta — Elizabeth saimes formai.',
 'Jelizaveta в базе LVA прямо соответствует украинскому Єлизавета, в международной передаче Yelyzaveta — форме семьи Elizabeth.',
 'The LVA rendering database explicitly pairs Jelizaveta with Ukrainian Єлизавета, internationally Yelyzaveta, a form of Elizabeth.',
 'LVA perteikimo bazė Jelizaveta tiesiogiai sieja su ukrainiečių Єлизавета, tarptautine rašyba Yelyzaveta — Elizabeth šeimos forma.',
 'LVA nimekujuandmebaas seob Jelizaveta otseselt ukraina Єлизавета ehk rahvusvahelise Yelyzavetaga, Elizabethi kujuga.'
],[
 'Datubāzes ieraksts atsaucas uz A. Hansona un M. Poļakovas ukraiņu īpašvārdu atveides izdevuma 156. lappusi, kas izdots 2023. gadā. Tas dokumentē tieši Jelizaveta atveidi. Izdevuma gads nav pirmā nesēja datums, un Jeļizaveta 1877. gada liecība uz šo rakstību netiek pārnesta.',
 'Запись базы ссылается на страницу 156 руководства А. Хансона и М. Поляковой по передаче украинских имён 2023 года. Это документирует именно Jelizaveta. Год издания не датирует первого носителя; свидетельство Jeļizaveta 1877 года на это написание не переносится.',
 'The database cites page 156 of A. Hansons and M. Poļakova’s 2023 Ukrainian-name rendering guide. It documents Jelizaveta specifically. Publication is not a first-bearer date, and Jeļizaveta’s 1877 record is not transferred to this spelling.',
 'Bazės įrašas remiasi A. Hansono ir M. Poļakovos 2023 metų ukrainietiškų tikrinių vardų perteikimo vadovo 156 puslapiu. Tai dokumentuoja būtent Jelizaveta. Leidimo metai nedatuoja pirmojo vardo turėtojo; Jeļizaveta 1877 metų liudijimas šiai rašybai neperkeliamas.',
 'Andmebaas viitab A. Hansonsi ja M. Poļakova 2023. aasta ukraina nimede edasiandmise juhendi leheküljele 156. See dokumenteerib täpselt Jelizaveta kuju. Ilmumisaasta ei ole esimese nimekandja daatum ning Jeļizaveta 1877. aasta kirjet sellele ei kanta.'
],['https://www.personvarduatveide.lv/words/71225.pdf?locale=lv','https://www.behindthename.com/name/yelyzaveta']);
add('Elizabeta',[
 'Elizabeta LVA datubāzē ir tieši dokumentēta angļu Elisabeth atveide latviešu valodā.',
 'Elizabeta прямо документировано базой LVA как латышская передача английского Elisabeth.',
 'The LVA database directly documents Elizabeta as a Latvian rendering of English Elisabeth.',
 'LVA bazė tiesiogiai dokumentuoja Elizabeta kaip angliško Elisabeth perteikimą latviškai.',
 'LVA andmebaas dokumenteerib Elizabeta otseselt inglise Elisabethi läti kujuna.'
],[
 'A. Ahero 2006. gada angļu īpašvārdu atveides rokasgrāmatas 100. lappuses atbilsmes datubāzes izrakstā dotas divās rindās: Elizabete un Elizabeta. Tātad -a formai ir atsevišķa dokumentēta vieta. Izraksts nepierāda tās pirmo lietojumu un neapstiprina formu ar garo ī.',
 'В выписке базы со ссылкой на страницу 100 руководства А. Ахеро 2006 года даны две отдельные строки: Elizabete и Elizabeta. Форма на -a имеет собственное документированное соответствие. Выписка не доказывает её первое употребление и не подтверждает написание с долгим ī.',
 'The database export citing page 100 of A. Ahero’s 2006 English-name guide gives separate Elizabete and Elizabeta rows. The -a form therefore has its own documented correspondence. The export does not establish first use or a spelling with long ī.',
 'Bazės išraše, remiantis A. Ahero 2006 metų angliškų vardų vadovo 100 puslapiu, pateiktos atskiros Elizabete ir Elizabeta eilutės. Taigi -a forma turi savo dokumentuotą atitiktį. Išrašas neįrodo pirmojo vartojimo ar rašybos su ilguoju ī.',
 'A. Ahero 2006. aasta inglise nimede juhendi leheküljele 100 viitav väljavõte annab eraldi read Elizabete ja Elizabeta. Seega on a-lõpul oma dokumenteeritud vaste. Väljavõte ei tõenda esmakasutust ega pika ī-ga kirjapilti.'
],['https://www.personvarduatveide.lv/words/28268.pdf?locale=lv']);
add('Liza',[
 'Liza LVA datubāzē tieši atbilst lietuviešu Liza. Lietuviešu ceļvedis to skaidro kā Elizabet īsformu.',
 'Liza в базе LVA прямо соответствует литовскому Liza. Литовский справочник объясняет его как краткую форму Elizabet.',
 'The LVA database explicitly pairs Latvian Liza with Lithuanian Liza, which the Lithuanian guide explains as a short form of Elizabet.',
 'LVA bazė latvišką Liza tiesiogiai sieja su lietuvių Liza, žinyno aiškinama kaip Elizabet trumpinys.',
 'LVA andmebaas seob läti Liza otseselt leedu Lizaga, mida leedu nimejuhend seletab Elizabeti lühivormina.'
],[
 'Atveides ieraksts atsaucas uz T. Porītes 1961. gada lietuviešu īpašvārdu rokasgrāmatas 53. lappusi un saglabā rakstību Liza abās valodās. Tā ir dokumentēta valodu atbilsme, nevis pirmā dzimšanas reģistra ziņa. Angļu Liza turpretī atveidots Laiza, tādēļ valodu ceļi nav jāsapludina.',
 'Запись ссылается на страницу 53 литовского руководства Т. Порите 1961 года и сохраняет Liza в обоих языках. Это документированное соответствие, а не первая запись о рождении. Английское Liza, напротив, передаётся как Laiza, поэтому языковые пути не следует смешивать.',
 'The rendering record cites page 53 of T. Porīte’s 1961 Lithuanian-name guide and retains Liza in both languages. This is a documented correspondence, not a first birth-register record. English Liza instead becomes Laiza in the database, so the language routes should remain separate.',
 'Perteikimo įrašas remiasi T. Porīte 1961 metų lietuviškų tikrinių vardų vadovo 53 puslapiu ir abiem kalbomis išlaiko Liza. Tai dokumentuota atitiktis, o ne pirmas gimimo registro įrašas. Anglų Liza bazėje perteikiama Laiza, todėl kalbinių kelių nereikia suplakti.',
 'Nimekujukirje viitab T. Porīte 1961. aasta leedu nimede juhendi leheküljele 53 ning säilitab mõlemas keeles Liza. See on dokumenteeritud vaste, mitte esimene sünniregistrikiri. Inglise Liza antakse andmebaasis edasi Laizana, seega tuleb keeleteid eristada.'
],['https://www.personvarduatveide.lv/words/19518.pdf?locale=lv','https://www.tevu-darzelis.lt/vaiku-vardai/liza/']);
for(const [name,route] of [
 ['Betija',['Betija Siliņa vārdnīcā ir Elizabete forma.','Betija у Силиньша — форма Elizabete.','Siliņš identifies Betija as a form of Elizabete.','Siliņšas Betija nurodo kaip Elizabete formą.','Siliņš määratleb Betija Elizabete kujuna.']],
 ['Alžbeta',['Alžbeta Siliņa vārdnīcā uzskaitīts starp Elizabete pamazināmajām formām.','Alžbeta у Силиньша перечислено среди уменьшительных форм Elizabete.','Siliņš lists Alžbeta among the diminutive forms of Elizabete.','Siliņšas Alžbeta pateikia tarp mažybinių Elizabete formų.','Siliņš loetleb Alžbeta Elizabete hellitusvormide seas.']],
 ['Elžbeta',['Elžbeta Siliņa vārdnīcā saistīts ar poļu Elizabete saimes formu.','Elžbeta словарь Силиньша связывает с польской формой семьи Elizabete.','Siliņš connects Elžbeta with the Polish branch of the Elizabete family.','Siliņšas Elžbeta sieja su lenkiška Elizabete šeimos forma.','Siliņš seob Elžbeta Elizabete nimepere poola haruga.']],
 ['Betsija',['Betsija Siliņa vārdnīcā ir angļu Betsy atveide, kas pieder Elizabeth īsformām.','Betsija у Силиньша — передача английского Betsy, краткой формы Elizabeth.','Siliņš explains Betsija as a rendering of English Betsy, a short form of Elizabeth.','Siliņšas Betsija aiškina kaip anglų Betsy, Elizabeth trumpinio, perteikimą.','Siliņš seletab Betsija inglise Betsy, Elizabethi lühivormi, edasiandusena.']]
])add(name,route,familyStory,name==='Betsija'?['https://www.behindthename.com/name/betsy']:[]);
add('Lisa',[
 'Lisa Siliņa vārdnīcā ir Elizabete forma.','Lisa в словаре Силиньша — форма Elizabete.','Siliņš’s dictionary identifies Lisa as a form of Elizabete.','Siliņšo žodynas Lisa pateikia kaip Elizabete formą.','Siliņši sõnaraamat määratleb Lisa Elizabete kujuna.'
],[
 'Precīzās formas Lisa liecību vārdnīca datē ar 1566. gadu Viskaļos. Atsevišķs kalendāra ieraksta gads nav dots. Šis konkrētais vietas un gada pāris pieder Lisa rakstībai, tādēļ tas nav jāaizstāj ar Līza vai Elizabete vēsturiskajiem datiem.',
 'Точная форма Lisa у Силиньша засвидетельствована в Вискали в 1566 году. Отдельный год включения в календарь не указан. Это сочетание места и года относится к написанию Lisa, поэтому его не следует заменять историческими данными Līza или Elizabete.',
 'The dictionary records the exact form Lisa in Viskaļi in 1566. It supplies no separate year of calendar inclusion. This specific place-and-year record belongs to Lisa and should retain its identity alongside the different records for Līza and Elizabete.',
 'Žodynas tikslią Lisa formą paliudija Viskaļi vietovėje 1566 metais. Atskirų įtraukimo į kalendorių metų nepateikia. Ši vietos ir metų pora priklauso Lisa rašybai ir turi likti atskirta nuo kitų Līza ar Elizabete liudijimų.',
 'Sõnaraamat registreerib täpse Lisa kuju Viskaļis 1566. aastal. Eraldi kalendrisse võtmise aastat ei anta. See konkreetne koha ja aasta kirje kuulub Lisa kirjapildile ning jääb eristatuks Līza ja Elizabete teistsugustest kirjetest.'
]);
add('Līza',[
 'Līza Siliņa vārdnīcā kopā ar Līze dots kopīgā šķirklī, kas norāda uz Elizabete.','Līza у Силиньша дано вместе с Līze в общей статье с отсылкой к Elizabete.','Siliņš groups Līza with Līze in a shared entry referring to Elizabete.','Siliņšas Līza ir Līze pateikia bendrame straipsnyje su nuoroda į Elizabete.','Siliņš esitab Līza ja Līze ühises kirjes, mis viitab Elizabetele.'
],[
 'Līza kataloga ierakstā minēta 1695. gada liecība Salas Piņķos. Vārdnīcas šķirkļa kopīgā uzbūve rāda abu formu radniecību, bet atsevišķs Līze datējums nav dots. Tādēļ 1695. gads šeit saglabāts tieši tādā tvērumā, kādā to dod Līza ieraksts.',
 'В каталожной записи Līza указано свидетельство 1695 года в Салас-Пиньки. Общая словарная статья показывает родство форм, но отдельной датировки Līze не даёт. Поэтому 1695 год здесь сохранён именно в пределах записи Līza.',
 'The Līza catalogue entry cites a 1695 record in Salas Piņķi. The shared dictionary entry establishes the relationship of the two forms but gives no separate Līze date. The 1695 record is therefore kept within the scope supplied by the Līza entry.',
 'Līza katalogo įraše minimas 1695 metų liudijimas Salas Piņķi vietovėje. Bendras žodyno straipsnis rodo formų giminystę, tačiau atskiro Līze datavimo nepateikia. Todėl 1695 metai čia palikti būtent Līza įrašo apimtimi.',
 'Līza kataloogikirje viitab 1695. aasta nimekirjele Salas Piņķis. Ühine sõnaraamatukirje kinnitab kahe kuju seost, kuid eraldi Līze daatumit ei anna. Seetõttu säilib 1695. aasta kirje täpselt Līza kirje antud ulatuses.'
]);
add('Līze',[
 'Līze Siliņa vārdnīcas norāžu ķēdē ved uz Līza un tālāk uz Elizabete.','Līze в цепочке словарных отсылок Силиньша ведёт к Līza, затем к Elizabete.','Siliņš’s reference chain takes Līze through Līza to Elizabete.','Siliņšo nuorodų grandinė nuo Līze veda per Līza į Elizabete.','Siliņši viiteahel viib Līze kaudu Līza juurde ja sealt Elizabeteni.'
],[
 '1990. gada vārdnīcas 218. lappuses norāde dokumentē šo saikni, bet atsevišķu Līze lietojuma gadu katalogs nedod. Līza ierakstā minētā 1695. gada Salas Piņķu liecība nav automātiski precīzās Līze rakstības datējums. Tā saglabājas kā radniecīgās formas vēsture.',
 'Отсылка на странице 218 словаря 1990 года документирует эту связь, но отдельного года употребления Līze каталог не даёт. Свидетельство Līza 1695 года из Салас-Пиньки не становится автоматически датировкой точного написания Līze. Оно остаётся историей родственной формы.',
 'The reference on page 218 of the 1990 dictionary documents this link, but the catalogue supplies no separate year of Līze use. Līza’s 1695 Salas Piņķi record is not automatically a date for exact Līze. It remains evidence from the related form’s history.',
 '1990 metų žodyno 218 puslapio nuoroda dokumentuoja šį ryšį, bet atskirų Līze vartojimo metų katalogas nenurodo. Līza 1695 metų Salas Piņķi liudijimas automatiškai nedatuoja tikslios Līze rašybos. Jis lieka giminingos formos istorija.',
 '1990. aasta sõnaraamatu lehekülje 218 viide dokumenteerib seose, kuid kataloog ei anna Līze kasutusele eraldi aastat. Līza 1695. aasta Salas Piņķi kirje ei ole automaatselt täpse Līze kirjapildi daatum. See jääb seotud kuju ajaloo tõendiks.'
],[cat('Līza')]);
add('Lisija',[
 'Lisija Siliņa vārdnīcā tieši saistīts ar Elizabete.','Lisija в словаре Силиньша прямо связано с Elizabete.','Siliņš’s dictionary explicitly connects Lisija with Elizabete.','Siliņšo žodynas Lisija tiesiogiai sieja su Elizabete.','Siliņši sõnaraamat seob Lisija otseselt Elizabetega.'
],[
 'Vārdnīcas 217. lappuses ziņas Lisija lietojumu ievieto Rīgā 20. gadsimta pirmajā ceturksnī. Tas ir konkrēts vietas un laikposma ieraksts. Plašais datējums nav jāpārvērš vienā izdomātā gadā un nepierāda vārda radīšanu tieši Rīgā.',
 'Сведения страницы 217 словаря относят употребление Lisija к Риге первой четверти XX века. Это конкретная запись с местом и периодом. Широкую датировку не следует превращать в один придуманный год; она не доказывает создание имени именно в Риге.',
 'Page 217 of the dictionary places Lisija in Riga in the first quarter of the twentieth century. This is a concrete record with a place and period. Its broad dating should retain that precision and does not establish that the name was created in Riga.',
 'Žodyno 217 puslapio duomenys Lisija vartojimą priskiria Rygai pirmame XX amžiaus ketvirtyje. Tai konkretus vieta ir laikotarpiu apibrėžtas įrašas. Plataus datavimo nereikia paversti vienais išgalvotais metais; jis neįrodo, kad vardas sukurtas būtent Rygoje.',
 'Sõnaraamatu lehekülg 217 paigutab Lisija Riiga 20. sajandi esimesse veerandisse. See on konkreetne koha ja ajavahemikuga kirje. Lai dateering peab säilitama oma täpsuse ega tõenda, et nimi loodi just Riias.'
]);
