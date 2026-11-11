// 15 November: exact spellings and combined dictionary entries retain their scope.
export const historiesLatvianR15={};
const langs=['lv','ru','en','lt','et'],cat=n=>'https://www.izpetnieks.lv/en/name/'+encodeURIComponent(n);
function add(name,origin,story,year){historiesLatvianR15[name]={sources:[cat(name)],text:Object.fromEntries(langs.map((l,i)=>[l,[origin[i].replaceAll('{name}',name),story[i].replaceAll('{name}',name)]])),...(year?{calendar_entry_year:year}:{})};}
add('Leopolds',[
 'Leopolds pamatā ir senaugšvācu liut, «tauta, ļaudis», un bald, «drosmīgs». Vārds pieder tai pašai vēsturiskajai saimei kā vācu Leopold. Saistījums ar latīņu leo, «lauva», ietekmējis starptautisko rakstību, taču tas nav sākotnējais pirmās daļas skaidrojums.',
 'В основе Leopolds лежат древневерхненемецкие liut, «народ, люди», и bald, «смелый». Имя принадлежит той же исторической семье, что немецкое Leopold. Ассоциация с латинским leo, «лев», повлияла на международное написание, но не объясняет первоначальную первую часть.',
 'Leopolds combines Old High German liut, people, and bald, bold or brave, belonging to the same historical family as German Leopold. Association with Latin leo, lion, influenced the international spelling, but lion is not the original explanation of its first element.',
 'Leopolds pagrindas yra senosios vokiečių aukštaičių kalbos liut „tauta, žmonės“ ir bald „drąsus“. Jis priklauso tai pačiai istorinei šeimai kaip vokiečių Leopold. Sąsaja su lotynų leo „liūtas“ paveikė tarptautinę rašybą, bet nėra pirminis pirmojo dėmens aiškinimas.',
 'Leopoldsi aluseks on vanaülemsaksa liut, rahvas või inimesed, ja bald, julge. Nimi kuulub saksa Leopoldiga samasse ajaloolisse nimeperre. Seostamine ladina sõnaga leo, lõvi, mõjutas rahvusvahelist kirjapilti, kuid ei seleta esimese osa algset päritolu.'
],[
 'Siliņa vārdnīcas katalogs Leopolds lietojumu Mazsalacā attiecina uz 19. gadsimta pēdējo ceturksni. Atsevišķi norādīts 1767. gads kā kalendāra ieraksta gads. Agrākais kalendāra datums un vēlākā personvārda liecība ir dažādu avotu ziņas; tās nedod vienu vārda rašanās datumu.',
 'Каталог словаря Силиньша относит запись Leopolds в Мазсалаце к последней четверти XIX века. Отдельно указан 1767 год включения в календарь. Ранняя календарная запись и более позднее свидетельство личного употребления относятся к разным источникам и не образуют единую дату возникновения имени.',
 'The Siliņš dictionary catalogue places a Leopolds record in Mazsalaca in the last quarter of the nineteenth century. It separately gives 1767 for calendar inclusion. The earlier calendar record and later evidence of personal use concern different kinds of sources, rather than a single date of invention.',
 'Siliņšo žodyno katalogas Leopolds įrašą Mazsalacoje datuoja paskutiniu XIX amžiaus ketvirčiu. Atskirai nurodyti įtraukimo į kalendorių 1767 metai. Ankstesnis kalendoriaus įrašas ir vėlesnis asmenvardžio vartojimo liudijimas priklauso skirtingiems šaltiniams, o ne nusako vieną sukūrimo datą.',
 'Siliņši sõnaraamatu kataloog dateerib Leopoldsi kirje Mazsalacas 19. sajandi viimasesse veerandisse. Eraldi antakse kalendrisse kandmise aastaks 1767. Varasem kalendrikirje ja hilisem isikunime kasutusnäide pärinevad eri liiki allikatest ega anna üht nime loomise kuupäeva.'
],1767);
historiesLatvianR15.Leopolds.sources.push('https://www.behindthename.com/name/leopold');
const wave=[
 '{name} vārdnīca saista ar latīņu unda, «vilnis». Šis skaidrojums ved pie ūdens tēla, nevis pie cilvēka rakstura īpašībām. Latīņu pamatvārds un no tā skaidrotais personvārds pieder dažādiem laikmetiem: senā vārda pastāvēšana pati par sevi nedatē latviešu vārda rašanos.',
 'Словарь связывает {name} с латинским unda, «волна». Это объяснение отсылает к образу воды, а не к чертам характера человека. Латинское слово и объясняемое через него личное имя относятся к разным эпохам: древность слова сама по себе не датирует появление латышского имени.',
 'The dictionary connects {name} with Latin unda, wave. This explanation concerns water imagery rather than personal character. The Latin word and the personal name explained through it belong to different periods: the age of the ancient word does not itself date the Latvian name’s formation.',
 'Žodynas {name} sieja su lotynų unda „banga“. Šis aiškinimas nurodo vandens įvaizdį, o ne žmogaus būdo bruožus. Lotyniškas žodis ir juo aiškinamas asmenvardis priklauso skirtingiems laikotarpiams: žodžio senumas savaime nenusako latviško vardo atsiradimo datos.',
 'Sõnaraamat seob nime {name} ladina sõnaga unda, laine. Seletus osutab veekujundile, mitte inimese iseloomule. Ladina sõna ja selle kaudu seletatud isikunimi kuuluvad eri ajastutesse: vana sõna olemasolu ei dateeri iseenesest läti nime kujunemist.'
];
add('Unda',wave,[
 'Katalogā minēta Unda personvārda liecība Rīgā 1969. gadā. Tā dod konkrētu vietu un laiku šai īsajai formai. Šķirklis nenorāda kalendārā iekļaušanas gadu; Undīna/-e šķirkļa 1908. gadu nevar pārnest uz Unda, un 1969. gads nav pierādījums, ka agrāk vārds nebūtu lietots.',
 'Каталог приводит свидетельство имени Unda в Риге в 1969 году. Оно задаёт конкретное место и время употребления этой краткой формы. Год включения в календарь статья не указывает: 1908 год из статьи Undīna/-e нельзя переносить на Unda, а запись 1969 года не доказывает отсутствие более раннего употребления.',
 'The catalogue records the personal name Unda in Riga in 1969, providing a specific place and time for this short form. Its entry supplies no calendar-inclusion year. The 1908 date in the Undīna/-e entry cannot be transferred to Unda, and the 1969 record does not prove there was no earlier use.',
 'Katalogas pateikia Unda asmenvardžio liudijimą Rygoje 1969 metais. Tai konkreti šios trumpos formos vartojimo vieta ir laikas. Straipsnis nenurodo įtraukimo į kalendorių metų: Undīna/-e įrašo 1908 metų negalima perkelti Undai, o 1969 metų liudijimas nepaneigia ankstesnio vartojimo.',
 'Kataloog nimetab isikunime Unda kasutust Riias 1969. aastal, andes sellele lühikesele vormile konkreetse koha ja aja. Kirje ei anna kalendrisse lisamise aastat. Undīna/-e kirje 1908. aastat ei saa Undale üle kanda ning 1969. aasta näide ei tõesta varasema kasutuse puudumist.'
]);
const combined=[
 'Siliņa vārdnīcas katalogā {name} ietilpst kopīgajā šķirklī Undīna/-e. Tam dota Rīgas 1922. gada personvārda liecība un atsevišķi 1908. gads kalendārā. Šie dati raksturo kopīgo šķirkli; tie nepierāda, ka abas galotnes neatkarīgi pirmoreiz reģistrētas vienā un tajā pašā gadā.',
 'В каталоге словаря Силиньша {name} входит в общую статью Undīna/-e. Для неё приведены личная запись в Риге в 1922 году и отдельно календарный 1908 год. Эти сведения относятся к общей статье и не доказывают, что обе формы с разными окончаниями впервые независимо зарегистрированы в один год.',
 'The Siliņš dictionary catalogue includes {name} in the combined entry Undīna/-e. It gives a Riga personal-name record in 1922 and, separately, calendar inclusion in 1908. These dates belong to the combined entry; they do not establish independent first registrations of both endings in the same year.',
 'Siliņšo žodyno kataloge {name} priklauso bendram Undīna/-e straipsniui. Jame pateiktas asmenvardžio įrašas Rygoje 1922 metais ir atskirai kalendoriaus 1908 metai. Šios datos apibūdina bendrą straipsnį, o ne įrodo abiejų galūnių pirmuosius nepriklausomus įrašus tais pačiais metais.',
 'Siliņši sõnaraamatu kataloogis kuulub {name} ühiskirjesse Undīna/-e. Sellele antakse Riia isikunimekirje aastast 1922 ja eraldi kalendrisse lisamise aasta 1908. Need andmed käivad ühiskirje kohta ega tõesta mõlema lõpu iseseisvat esmaregistreerimist samal aastal.'
];
for(const name of ['Undīna','Undīne'])add(name,wave,combined,1908);
